import * as anchor from "@coral-xyz/anchor";
import { Program, web3 } from "@coral-xyz/anchor";
import { MessagefiProgram } from "../types/messagefi_program";
import { BN } from "@coral-xyz/anchor";
import {
  createMint,
  createAssociatedTokenAccount,
  mintTo,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";

describe("messagefi-program", () => {
  // Configure the client to use the local cluster.
  let provider = anchor.AnchorProvider.env();
  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  const program = anchor.workspace
    .MessagefiProgram as Program<MessagefiProgram>;

  // const summaryAccount = anchor.web3.Keypair.generate();
  let [summaryAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("summary")],
    // [],
    program.programId
  );
  console.log("Your counter address", summaryAccount.toBase58());

  const user = provider.wallet.publicKey;
  console.log("Your wallet address", user.toBase58());
  let mint = new web3.Keypair().publicKey;
  const payer = new web3.Keypair();
  let [feeCollectorAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("feecollector")],
    // [],
    program.programId
  );
  const mfcSwapPool = new web3.Keypair();
  let mfcSwapPoolAta: PublicKey;

  let [competitionRoundAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("rounddat"), new BN(2).toBuffer("le", 8)],
    program.programId
  );

  it("payer airdrop", async () => {
    let sig = await program.provider.connection.requestAirdrop(
      payer.publicKey,
      1 * anchor.web3.LAMPORTS_PER_SOL
    );
    await program.provider.connection.confirmTransaction(sig);
    let balance = await program.provider.connection.getBalance(payer.publicKey);
    console.log("payer balance: ", balance);
  });

  it("create MFC token!", async () => {
    const fromKp = provider.wallet.publicKey;
    const toKp = new web3.Keypair();
    // Create a new mint and initialize it
    const mintKp = new web3.Keypair();
    mint = await createMint(
      program.provider.connection,
      payer,
      program.programId,
      null,
      9
    );
    console.log("create MFC token!111111111 ");
    console.log("mint token account: ", mint.toBase58());

    // Create associated token accounts for the new accounts
    mfcSwapPoolAta = await createAssociatedTokenAccount(
      program.provider.connection,
      payer,
      mint,
      mfcSwapPool.publicKey
    );
  });

  it("initialized messagefi program!", async () => {
    // Add your test here.
    const tx = await program.methods
      .initialize()
      .accounts({
        msgSummary: summaryAccount,
        feeCollector: feeCollectorAccount,
        mfcSwapPool: mfcSwapPoolAta,
        user,
        tokenProgram: mint,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
    console.log("Your transaction signature", tx);

    // Fetch the state struct from the network.
    const summaryStatusAccount = await program.account.msgSummaryData.fetch(
      summaryAccount
    );
    console.log("msg summary account state: ", summaryStatusAccount);
  });

  it("create competition round", async () => {
    // Add your test here.
    const tx = await program.methods
      .createCompetitionRound()
      .accounts({
        msgSummary: summaryAccount,
        roundData: competitionRoundAccount,
        user,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
    console.log("Your transaction signature", tx);

    // Fetch the state struct from the network.
    const competitionRoundState = await program.account.roundData.fetch(
      competitionRoundAccount
    );
    console.log(
      "create competition round account state: ",
      competitionRoundState
    );
  });

  it("creat msg!", async () => {
    // seeds = [b"summary"]
    let [summaryAccount] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("summary")],
      program.programId
    );
    const summaryStatusAccountBefore =
      await program.account.msgSummaryData.fetch(summaryAccount);
    let msgIdBuff = summaryStatusAccountBefore["msgId"]
      .add(new BN(1))
      .toBuffer("le", 8);
    console.log('summaryStatusAccountBefore["msgId"]: ', msgIdBuff);
    // seeds = [b"msg", user.key().as_ref(), &(msg_summary.msg_id + 1).to_le_bytes()]
    let [msgAccount] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode("msg"),
        provider.wallet.publicKey.toBuffer(),
        msgIdBuff,
      ],
      program.programId
    );
    const tx = await program.methods
      .createMsg("my first msg")
      .accounts({
        msgData: msgAccount,
        msgSummary: summaryAccount,
        roundData: competitionRoundAccount,
        user: user,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    console.log("creat msg! Your transaction signature", tx);

    // Fetch the state struct from the network.
    let summaryStatusAccount = await program.account.msgSummaryData.fetch(
      summaryAccount
    );
    console.log("msg summary account state: ", summaryStatusAccount);

    let msgInfoAccount = await program.account.msgData.fetch(msgAccount);
    console.log("msg account state: ", msgInfoAccount);

    console.log("\nstart vote 1000000000 lamports for this msg!=============");
    // seeds = [b"votemsg", user.key().as_ref(), &(msg_data.msg_id).to_le_bytes()]
    msgIdBuff = summaryStatusAccount["msgId"].toBuffer("le", 8);
    let [voteAccount] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("votemsg"), provider.wallet.publicKey.toBuffer(), msgIdBuff],
      program.programId
    );
    const voteTx = await program.methods
      .voteMsgWithSol(new BN(1_000_000_000))
      .accounts({
        voteData: voteAccount,
        msgData: msgAccount,
        msgSummary: summaryAccount,
        roundData: competitionRoundAccount,
        user: user,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([])
      .rpc();

    console.log("vote msg! Your transaction signature", voteTx);

    msgInfoAccount = await program.account.msgData.fetch(msgAccount);
    console.log(
      "msg account state after vote: ",
      msgInfoAccount,
      "total vote num: ",
      msgInfoAccount["voteAmount"].toNumber()
    );

    let voteAccountState = await program.account.voteData.fetch(voteAccount);
    console.log(
      "vote account state: ",
      voteAccountState,
      "account: ",
      voteAccount.toBase58(),
      "' vote number: ",
      voteAccountState["amount"].toNumber()
    );

    console.log(
      "\nstart comment for msgId:",
      msgInfoAccount["msgId"].toNumber(),
      "============="
    );
    let [commentAccount] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("comment"), provider.wallet.publicKey.toBuffer(), msgIdBuff],
      program.programId
    );
    const addCommentTx = await program.methods
      .addComments("Good message!")
      .accounts({
        commentData: commentAccount,
        msgData: msgAccount,
        user: user,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([])
      .rpc();

    console.log("comment msg! Your transaction signature", addCommentTx);
    let commentInfoAccount = await program.account.commentData.fetch(
      commentAccount
    );
    console.log("comment account state: ", commentInfoAccount);
  });
});
