import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { MessagefiProgram } from "../types/messagefi_program";
import {BN} from "@coral-xyz/anchor";

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
    let [summaryAccount] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("summary")],
      program.programId
    );
    //     #[account(
      //         init,
      //         payer = user,
      //         space = 8 + 1024 + 8, seeds = [b"msg", user.key().as_ref(), &(msg_summary.msg_id + 1).to_le_bytes()], bump
      //     )]
      //     pub msg_data: Account<'info, MsgData>,
      const summaryStatusAccountBefore = await program.account.msgSummaryData.fetch(
          summaryAccount
      );
      let msgIdBuff = summaryStatusAccountBefore["msgId"].add(new BN(1)).toBuffer("le", 8);
      console.log("summaryStatusAccountBefore[\"msgId\"]: ", msgIdBuff);
    let [msgAccount] = anchor.web3.PublicKey.findProgramAddressSync(
      [
          anchor.utils.bytes.utf8.encode('msg'),
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
    const summaryStatusAccount = await program.account.msgSummaryData.fetch(
      summaryAccount
    );
    console.log("msg summary account state: ", summaryStatusAccount);

    const msgInfoAccount = await program.account.msgData.fetch(
      msgAccount
    );
    console.log("msg account state: ", msgInfoAccount);
  });
});
