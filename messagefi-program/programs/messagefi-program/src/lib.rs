mod errors;
use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_instruction;
use anchor_lang::Key;
use anchor_spl::token_interface::Mint;
use errors::MyError;

declare_id!("DMyQ8keGbLzXNyqhRx8j6X4SDyB3EXG1ea94CfTu6tfR");

#[program]
pub mod messagefi_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Initialize messagefi program");
        if ctx.accounts.msg_summary.is_initialized {
            return Err(MyError::AlreadyInitialized.into());
        }
        ctx.accounts.msg_summary.msg_id = 0;
        ctx.accounts.msg_summary.is_initialized = true;
        ctx.accounts.msg_summary.mfc_coin_id = ctx.accounts.token_program.key();

        Ok(())
    }

    pub fn create_msg(ctx: Context<CreateMsg>, data: String) -> Result<()> {
        ctx.accounts.msg_summary.msg_id += 1;
        ctx.accounts.msg_data.data = data.clone();
        ctx.accounts.msg_data.vote_amount = 0;
        ctx.accounts.msg_data.msg_id = ctx.accounts.msg_summary.msg_id;
        msg!(
            "CREATE_MSG msg_id:{}, msg data:{}, msg public key:{}",
            ctx.accounts.msg_summary.msg_id,
            data,
            ctx.accounts.msg_data.key()
        );
        Ok(())
    }

    pub fn vote_msg_with_sol(ctx: Context<VoteMsg>, amount: u64) -> Result<()> {
        msg!("vote_msg_with_sol 11111111");
        let from_account = &ctx.accounts.user;
        let to: &AccountInfo = ctx.accounts.msg_summary.as_ref();
        // Create the transfer instruction
        let transfer_instruction = system_instruction::transfer(from_account.key, to.key, amount);

        // Invoke the transfer instruction
        anchor_lang::solana_program::program::invoke_signed(
            &transfer_instruction,
            &[
                from_account.to_account_info(),
                to.clone(),
                ctx.accounts.system_program.to_account_info(),
            ],
            &[],
        )?;

        ctx.accounts.msg_data.vote_amount += amount;
        ctx.accounts.vote_data.amount += amount;
        msg!(
            "VOTE_MSG_WITH_SOL msg_id:{}, vote_amount:{}, user_key:{}",
            ctx.accounts.msg_data.msg_id,
            amount,
            ctx.accounts.user.key
        );

        Ok(())
    }

    pub fn add_comments(ctx: Context<CreateComment>, comment_data: String) -> Result<()> {
        ctx.accounts.comment_data.data = comment_data;
        msg!(
            "ADD_COMMENTS msg_id:{}, comment data: {}, user_key:{}",
            ctx.accounts.msg_data.msg_id,
            ctx.accounts.comment_data.data,
            ctx.accounts.user.key
        );
        Ok(())
    }

    // todo:
    pub fn withdraw_msg_profit(ctx: Context<CreateComment>, comment_data: String) -> Result<()> {
        ctx.accounts.comment_data.data = comment_data;
        msg!(
            "ADD_COMMENTS msg_id:{}, comment data: {}, user_key:{}",
            ctx.accounts.msg_data.msg_id,
            ctx.accounts.comment_data.data,
            ctx.accounts.user.key
        );
        Ok(())
    }

    // todo:
    pub fn swap(ctx: Context<CreateComment>, comment_data: String) -> Result<()> {
        ctx.accounts.comment_data.data = comment_data;
        msg!(
            "ADD_COMMENTS msg_id:{}, comment data: {}, user_key:{}",
            ctx.accounts.msg_data.msg_id,
            ctx.accounts.comment_data.data,
            ctx.accounts.user.key
        );
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 1 + 8 + 32, seeds = [b"summary"], bump)]
    pub msg_summary: Account<'info, MsgSummaryData>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub token_program: Box<InterfaceAccount<'info, Mint>>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateMsg<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 1024 + 8, seeds = [b"msg", user.key().as_ref(), &(msg_summary.msg_id + 1).to_le_bytes()], bump
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
    pub is_initialized: bool,
    pub msg_id: u64,
    pub mfc_coin_id: Pubkey,
}

#[account]
pub struct MsgData {
    pub msg_id: u64,
    pub data: String,
    pub vote_amount: u64,
}

#[derive(Accounts)]
pub struct VoteMsg<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 8, seeds = [b"votemsg", user.key().as_ref(), &(msg_data.msg_id).to_le_bytes()], bump
    )]
    pub vote_data: Account<'info, VoteData>,
    #[account(mut, seeds = [b"msg", user.key().as_ref(), &(msg_data.msg_id).to_le_bytes()], bump)]
    pub msg_data: Account<'info, MsgData>,
    #[account(mut, seeds = [b"summary"], bump)]
    pub msg_summary: Account<'info, MsgSummaryData>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct VoteData {
    pub amount: u64,
}

#[account]
pub struct VoteSummary {
    pub amount: u64,
}

#[derive(Accounts)]
pub struct CreateComment<'info> {
    #[account(
    init,
    payer = user,
    space = 8 + 8 + 1024, seeds = [b"comment", user.key().as_ref(), &(msg_data.msg_id).to_le_bytes()], bump
    )]
    pub comment_data: Account<'info, CommentData>,
    #[account(mut)]
    pub msg_data: Account<'info, MsgData>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct CommentData {
    pub data: String,
}
