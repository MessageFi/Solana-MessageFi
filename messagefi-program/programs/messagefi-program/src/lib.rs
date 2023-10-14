mod errors;
use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_instruction;
use anchor_lang::Key;
use anchor_spl::token::{self, mint_to, MintTo, Token, TokenAccount, Transfer as SplTransfer};
use anchor_spl::token_interface::Mint;
use errors::MyError;

declare_id!("DMyQ8keGbLzXNyqhRx8j6X4SDyB3EXG1ea94CfTu6tfR");

#[program]
pub mod messagefi_program {
    use super::*;

    /// init program
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Initialize messagefi program");
        if ctx.accounts.msg_summary.is_initialized {
            return Err(MyError::AlreadyInitialized.into());
        }
        if ctx.accounts.mfc_swap_pool.mint != ctx.accounts.token_program.key() {
            return Err(MyError::MintInconsistent.into());
        }
        ctx.accounts.msg_summary.msg_id = 0;
        ctx.accounts.msg_summary.is_initialized = true;
        ctx.accounts.msg_summary.mfc_coin_id = ctx.accounts.token_program.key();
        ctx.accounts.msg_summary.total_rewards_pool = 9 * 10_u64.pow(8 + 9);
        ctx.accounts.msg_summary.vote_fee_rate = 500;
        ctx.accounts.msg_summary.rewards_fee_rate = 50;
        ctx.accounts.msg_summary.rate_to_creator = 500;
        ctx.accounts.msg_summary.rewards_reduce_rate = 2000;
        ctx.accounts.msg_summary.rewards_reduce_round = 100;
        ctx.accounts.msg_summary.global_competition_id = 1;
        ctx.accounts.msg_summary.competition_period = 86400;
        ctx.accounts.msg_summary.round_start_time = Clock::get().unwrap().unix_timestamp;
        ctx.accounts.msg_summary.mfc_swap_pool_owner = ctx.accounts.mfc_swap_pool.owner;
        ctx.accounts.msg_summary.sol_pool_amount = 0;

        Ok(())
    }

    /// create a new competition after competition_period expired
    pub fn create_competition_round(ctx: Context<CreateCompetitionRound>) -> Result<()> {
        let current_time = Clock::get().unwrap().unix_timestamp;
        if ctx.accounts.msg_summary.round_start_time + ctx.accounts.msg_summary.competition_period
            < current_time
        {
            return Err(MyError::NewCompetitionNotStarted.into());
        }
        ctx.accounts.msg_summary.global_competition_id += 1;
        ctx.accounts.msg_summary.round_start_time = current_time;

        ctx.accounts.round_data.competition_id = ctx.accounts.msg_summary.global_competition_id;
        // 300 w
        let round_mfc_supply = 3 * 10_u64.pow(6 + 9);
        ctx.accounts.round_data.rewards = round_mfc_supply;
        ctx.accounts.msg_summary.mfc_current_supply += round_mfc_supply;
        ctx.accounts.round_data.build_count = 0;
        ctx.accounts.round_data.total_popularity = 0;
        ctx.accounts.round_data.round_start_time = current_time;
        ctx.accounts.round_data.round_end_time =
            current_time + ctx.accounts.msg_summary.competition_period;

        let round_data = &ctx.accounts.round_data;
        msg!("create_competition_round, competition_id:{},rewards:{},round_start_time:{},round_end_time:{}", round_data.competition_id, round_data.rewards, round_data.round_start_time, round_data.round_end_time);
        Ok(())
    }

    /// create a message
    pub fn create_msg(ctx: Context<CreateMsg>, data: String) -> Result<()> {
        let current_time = Clock::get().unwrap().unix_timestamp;
        if current_time - ctx.accounts.msg_summary.round_start_time
            < ctx.accounts.msg_summary.competition_period
        {
            ctx.accounts.msg_data.competition_id = ctx.accounts.msg_summary.global_competition_id;
        } else {
            ctx.accounts.msg_summary.global_competition_id += 1;
            ctx.accounts.msg_summary.round_start_time = current_time;
            ctx.accounts.msg_data.competition_id = ctx.accounts.msg_summary.global_competition_id;
        }
        ctx.accounts.msg_summary.msg_id += 1;
        ctx.accounts.msg_data.data = data.clone();
        ctx.accounts.msg_data.vote_amount = 0;
        ctx.accounts.msg_data.msg_id = ctx.accounts.msg_summary.msg_id;
        ctx.accounts.msg_data.popularity = 0;

        ctx.accounts.round_data.build_count += 1;
        msg!(
            "CREATE_MSG competition_id:{}, msg_id:{}, msg data:{}, msg public key:{}",
            ctx.accounts.msg_data.competition_id,
            ctx.accounts.msg_summary.msg_id,
            data,
            ctx.accounts.msg_data.key()
        );
        Ok(())
    }

    /// vote sol for a message
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
        ctx.accounts.msg_summary.sol_pool_amount += amount;
        ctx.accounts.msg_data.vote_amount += amount;
        // todo: check this formula
        let popularity_old = ctx.accounts.msg_data.popularity;
        ctx.accounts.msg_data.popularity = 100 * amount * (1 + (1 / amount));
        ctx.accounts.vote_data.amount += amount;
        ctx.accounts.vote_data.popularity += ctx.accounts.msg_data.popularity - popularity_old;
        ctx.accounts.round_data.total_popularity +=
            ctx.accounts.msg_data.popularity - popularity_old;
        if ctx.accounts.msg_data.popularity > ctx.accounts.round_data.top_popularity {
            ctx.accounts.round_data.top_popularity_msg_id = ctx.accounts.msg_data.msg_id;
            ctx.accounts.round_data.top_popularity = ctx.accounts.msg_data.popularity;
        }
        msg!(
            "VOTE_MSG_WITH_SOL msg_id:{}, vote_amount:{}, user_key:{}, popularity:{}, top_popularity_msg_id:{}, top_popularity:{}",
            ctx.accounts.msg_data.msg_id,
            amount,
            ctx.accounts.user.key,
            ctx.accounts.msg_data.popularity,
            ctx.accounts.round_data.top_popularity_msg_id,
            ctx.accounts.round_data.top_popularity,
        );

        Ok(())
    }

    /// add comments for a message
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

    // todo: confirm withdraw amount logic
    /// withdraw rewards after a competition finish in the time range
    pub fn withdraw_rewords(ctx: Context<WithdrawRewardData>) -> Result<()> {
        if ctx.accounts.msg_data.competition_id != ctx.accounts.round_data.competition_id {
            return Err(MyError::CompetitionIdNotMatched.into());
        }
        let msg_summary = &ctx.accounts.msg_summary;
        if msg_summary.global_competition_id == ctx.accounts.msg_data.competition_id
            && msg_summary.round_start_time + msg_summary.competition_period
                <= ctx.accounts.round_data.round_end_time
        {
            return Err(MyError::CompetitionHasntEnded.into());
        }
        if ctx.accounts.round_data.top_popularity_msg_id != ctx.accounts.msg_data.msg_id {
            return Err(MyError::MessageNotRankFirst.into());
        }
        if ctx.accounts.vote_data.has_withdraw {
            return Err(MyError::RewardAlreadyWithdraw.into());
        }
        if ctx.accounts.authority.key != &id() {
            return Err(MyError::TokenAuthorityNotMatched.into());
        }

        let withdraw_amount = ctx.accounts.round_data.rewards * ctx.accounts.vote_data.popularity
            / ctx.accounts.round_data.total_popularity;

        mint_to(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                MintTo {
                    mint: ctx.accounts.token_program.to_account_info(),
                    to: ctx.accounts.to_ata.to_account_info(),
                    authority: ctx.accounts.authority.clone(),
                },
            ),
            withdraw_amount,
        )?;
        ctx.accounts.vote_data.has_withdraw = true;
        msg!(
            "withdraw rewords, round_id:{} msg_id:{}, user: {}, amount:{}",
            ctx.accounts.msg_data.competition_id,
            ctx.accounts.msg_data.msg_id,
            ctx.accounts.user.key,
            0
        );
        Ok(())
    }

    // swap mfc coin to sol
    /// switch <MFC-SOL>, input MFC, out SOL
    pub fn swap(ctx: Context<SwapData>, amount: u64) -> Result<()> {
        if ctx.accounts.from_ata.mint != ctx.accounts.msg_summary.mfc_coin_id
            || ctx.accounts.mfc_pool_acc.mint != ctx.accounts.msg_summary.mfc_coin_id
        {
            return Err(MyError::MintInconsistent.into());
        }
        if &ctx.accounts.from_ata.owner != ctx.accounts.user.key
            || ctx.accounts.mfc_pool_acc.owner != ctx.accounts.msg_summary.mfc_swap_pool_owner
        {
            return Err(MyError::OwnerInconsistent.into());
        }
        let mut sol_swap_out = ctx.accounts.msg_summary.sol_pool_amount
            / ctx.accounts.msg_summary.mfc_current_supply
            * amount;
        let fee = sol_swap_out / 100 * 5;
        sol_swap_out = sol_swap_out - fee;

        let cpi_accounts = SplTransfer {
            from: ctx.accounts.from_ata.to_account_info(),
            to: ctx.accounts.mfc_pool_acc.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
        };
        token::transfer(
            CpiContext::new(ctx.accounts.token_program.to_account_info(), cpi_accounts),
            amount,
        )?;

        let summary_acc: &AccountInfo = ctx.accounts.msg_summary.as_ref();
        // transfer sol to user
        let transfer_instruction =
            system_instruction::transfer(&summary_acc.key(), &ctx.accounts.user.key, sol_swap_out);
        anchor_lang::solana_program::program::invoke_signed(
            &transfer_instruction,
            &[
                summary_acc.clone(),
                ctx.accounts.user.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
            &[],
        )?;

        // transfer sol to fee collector account
        let transfer_instruction =
            system_instruction::transfer(&summary_acc.key(), &ctx.accounts.fee_collector.key, fee);
        anchor_lang::solana_program::program::invoke_signed(
            &transfer_instruction,
            &[
                summary_acc.clone(),
                ctx.accounts.fee_collector.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
            &[],
        )?;
        msg!(
            "swap mfc to sol user:{}, in mfc: {}, out sol:{}, fee sol:{}",
            ctx.accounts.user.key,
            amount,
            sol_swap_out,
            fee,
        );
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 1 + 8 + 32 + 8 * 10 + 32 + 8, seeds = [b"summary"], bump)]
    pub msg_summary: Account<'info, MsgSummaryData>,
    /// CHECK:
    #[account(init, payer = user, space = 0, seeds = [b"feecollector"], bump)]
    pub fee_collector: AccountInfo<'info>,
    #[account(mut)]
    pub mfc_swap_pool: Account<'info, TokenAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub token_program: Box<InterfaceAccount<'info, Mint>>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct MsgSummaryData {
    pub is_initialized: bool,
    pub msg_id: u64,
    pub mfc_coin_id: Pubkey,
    pub total_rewards_pool: u64,
    pub vote_fee_rate: u64,
    pub rewards_fee_rate: u64,
    pub rate_to_creator: u64,
    pub rewards_reduce_rate: u64,
    pub rewards_reduce_round: u64,
    // global competition id
    pub global_competition_id: u64,
    pub competition_period: i64,
    pub round_start_time: i64,
    pub mfc_current_supply: u64,
    pub mfc_swap_pool_owner: Pubkey,
    pub sol_pool_amount: u64,
}

#[derive(Accounts)]
pub struct CreateCompetitionRound<'info> {
    #[account(mut, seeds = [b"summary"], bump)]
    pub msg_summary: Account<'info, MsgSummaryData>,
    #[account(init, payer = user, space = 8 + 8 * 8, seeds = [b"rounddat", &(msg_summary.global_competition_id + 1).to_le_bytes()], bump)]
    pub round_data: Account<'info, RoundData>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct RoundData {
    pub competition_id: u64,
    pub build_count: u64,
    pub rewards: u64,
    pub total_popularity: u64,
    pub round_start_time: i64,
    pub round_end_time: i64,
    pub top_popularity_msg_id: u64,
    pub top_popularity: u64,
}

#[derive(Accounts)]
pub struct CreateMsg<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 8 + 1024 + 8 + 8, seeds = [b"msg", user.key().as_ref(), &(msg_summary.msg_id + 1).to_le_bytes()], bump
    )]
    pub msg_data: Account<'info, MsgData>,
    #[account(mut, seeds = [b"summary"], bump)]
    pub msg_summary: Account<'info, MsgSummaryData>,
    #[account(mut, seeds = [b"rounddat", &(msg_summary.global_competition_id).to_le_bytes()], bump)]
    pub round_data: Account<'info, RoundData>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct MsgData {
    pub msg_id: u64,
    pub competition_id: u64,
    pub data: String,
    pub vote_amount: u64,
    pub popularity: u64,
}

#[derive(Accounts)]
pub struct VoteMsg<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 8 * 2 + 1, seeds = [b"votemsg", user.key().as_ref(), &(msg_data.msg_id).to_le_bytes()], bump
    )]
    pub vote_data: Account<'info, VoteData>,
    #[account(mut, seeds = [b"msg", user.key().as_ref(), &(msg_data.msg_id).to_le_bytes()], bump)]
    pub msg_data: Account<'info, MsgData>,
    #[account(mut, seeds = [b"summary"], bump)]
    pub msg_summary: Account<'info, MsgSummaryData>,
    #[account(mut, seeds = [b"rounddat", &(msg_summary.global_competition_id).to_le_bytes()], bump)]
    pub round_data: Account<'info, RoundData>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct VoteData {
    pub amount: u64,
    pub popularity: u64,
    pub has_withdraw: bool,
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

#[derive(Accounts)]
pub struct WithdrawRewardData<'info> {
    #[account(mut, seeds = [b"msg", user.key().as_ref(), &(msg_data.msg_id).to_le_bytes()], bump)]
    pub msg_data: Account<'info, MsgData>,
    #[account(mut, seeds = [b"summary"], bump)]
    pub msg_summary: Account<'info, MsgSummaryData>,
    #[account(mut, seeds = [b"rounddat", &(msg_summary.global_competition_id).to_le_bytes()], bump)]
    pub round_data: Account<'info, RoundData>,
    #[account(
      mut, seeds = [b"votemsg", user.key().as_ref(), &(msg_data.msg_id).to_le_bytes()], bump
    )]
    pub vote_data: Account<'info, VoteData>,
    pub token_program: Box<InterfaceAccount<'info, Mint>>,
    #[account(mut)]
    pub to_ata: Account<'info, TokenAccount>,
    /// CHECK:
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SwapData<'info> {
    #[account(mut)]
    pub from_ata: Account<'info, TokenAccount>,
    #[account(mut)]
    pub mfc_pool_acc: Account<'info, TokenAccount>,
    #[account(mut, seeds = [b"summary"], bump)]
    pub msg_summary: Account<'info, MsgSummaryData>,
    pub token_program: Program<'info, Token>,
    /// CHECK:
    #[account(mut, seeds = [b"feecollector"], bump)]
    pub fee_collector: AccountInfo<'info>,
    /// CHECK:
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}
