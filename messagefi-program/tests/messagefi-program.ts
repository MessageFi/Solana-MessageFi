import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { MessagefiProgram } from "../types/messagefi_program";
import { BN } from "@coral-xyz/anchor";

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

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods
      .initialize()
      .accounts({
        msgSummary: summaryAccount,
        user,
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
