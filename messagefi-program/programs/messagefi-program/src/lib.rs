use anchor_lang::prelude::*;
use anchor_lang::Key;

declare_id!("DMyQ8keGbLzXNyqhRx8j6X4SDyB3EXG1ea94CfTu6tfR");

#[program]
pub mod messagefi_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Initialize ping program");
        ctx.accounts.msg_summary.msg_counter = 0;
        Ok(())
    }

    pub fn create_msg(ctx: Context<CreateMsg>, data: String) -> Result<()> {
        ctx.accounts.msg_data.data = data.clone();
        ctx.accounts.msg_summary.msg_counter += 1;
        msg!("create msg id:{}, msg data:{}, public key:{}", ctx.accounts.msg_summary.msg_counter, data, ctx.accounts.msg_data.key());
        Ok(())
    }

    pub fn vote_msg_with_sol(ctx: Context<CreateMsg>, sol_num: u64) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 8, seeds = [b"summary"], bump)]
    // #[account(init, payer = user, space = 8 + 8, seeds = [], bump)]
    pub msg_summary: Account<'info, MsgSummaryData>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateMsg<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 1024, seeds = [b"msg", user.key().as_ref()], bump
    )]
    pub msg_data: Account<'info, MsgData>,
    #[account(mut, seeds = [b"summary"], bump)]
    pub msg_summary: Account<'info, MsgSummaryData>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct MsgSummaryData {
    pub msg_counter: u64,
}

#[account]
pub struct MsgData {
    pub data: String,
}