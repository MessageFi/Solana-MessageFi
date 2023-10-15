# messagefi-program
## preinstall
```shell
npm install
```
## build program
```shell
npm run build-program
```
## program implementation
[messagefi-program](./programs/messagefi-program/src)
## test and abi
[e2e tests](./tests/messagefi-program.ts)  
[abi](./types/messagefi_program.ts)

## test contract address
`BrzCxa79vf1N71RNRdcX2zZCxgswrs5FniGS9VR26TQT`

## local deploy
### run solana-test-validator in first terminal
```shell
solana-test-validator
```
deploy contract
```shell
solana config set --url localhost
solana program deploy ./config/deploy/messagefi_program.so
```
function api
```rust
#[program]
pub mod messagefi_program {
    use super::*;

    /// init program
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {}

    /// create a new competition after competition_period expired
    pub fn create_competition_round(ctx: Context<CreateCompetitionRound>) -> Result<()> {}

    /// create a message
    pub fn create_msg(ctx: Context<CreateMsg>, data: String) -> Result<()> {}

    /// vote sol for a message
    pub fn vote_msg_with_sol(ctx: Context<VoteMsg>, amount: u64) -> Result<()> {}

    /// add comments for a message
    pub fn add_comments(ctx: Context<CreateComment>, comment_data: String) -> Result<()> {}
    
    /// withdraw rewards after a competition finish in the time range
    pub fn withdraw_rewords(ctx: Context<WithdrawRewardData>) -> Result<()> {}
    
    /// switch <MFC-SOL>, input MFC, out SOL
    pub fn swap(ctx: Context<SwapData>, amount: u64) -> Result<()> {}
}
```
## function api params and account data structures
```rust
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
```
## E2E test
there are some test case in anchor test:
* airdrop token
* create MFC token
* initialized messagefi program
* create competition round
* create message
* vote 1000000000 lamports for this msg
* add comments for a message
* todo: add e2e test for withdraw_rewords and swap api
```shell
anchor test
```
test output:
```text
Your counter address tMfmx7gwhaUJ96uLZQeWoxmAhVg54i5LLQhRioduRQg
Your wallet address 7dMmVQh6yT7WwEWqVZ4DjpArSuaC75KhcmhugUMw6fsD


  messagefi-program
payer balance:  1000000000
    ✔ payer airdrop (209ms)
create MFC token!111111111 
mint token account:  DmFq1sKzgW7bhSVY7F4nefJ9ZbYuGev3jk8qgS1HgtAN
    ✔ create MFC token! (946ms)
Your transaction signature 2c8CHfeYLn7aTeCqqi6MwgWt3PoMcg2mqL1uJHQ5qcQEm6D8dQc5bXn8KE8AoVTw7Dky1SWoZKg3okD6zVivLeo8
msg summary account state:  {
  isInitialized: true,
  msgId: <BN: 0>,
  mfcCoinId: PublicKey [PublicKey(DmFq1sKzgW7bhSVY7F4nefJ9ZbYuGev3jk8qgS1HgtAN)] {
    _bn: <BN: bda2908a6f8307fa4e4685250bb89475420cdfc199cc5d8a83c6486653fae523>
  },
  totalRewardsPool: <BN: c7d713b49da0000>,
  voteFeeRate: <BN: 1f4>,
  rewardsFeeRate: <BN: 32>,
  rateToCreator: <BN: 1f4>,
  rewardsReduceRate: <BN: 7d0>,
  rewardsReduceRound: <BN: 64>,
  globalCompetitionId: <BN: 1>,
  competitionPeriod: <BN: 15180>,
  roundStartTime: <BN: 652c0d8e>,
  mfcCurrentSupply: <BN: 0>,
  mfcSwapPoolOwner: PublicKey [PublicKey(D8uZbVL5iMhyyJiDCscZNY2ADPcH9aoUicmqNvViKY8r)] {
    _bn: <BN: b452bda4cc8448527fcb2983ec58ecbd4c24f39bd29d03365ebaa881599a58c3>
  },
  solPoolAmount: <BN: 0>
}
    ✔ initialized messagefi program! (482ms)
Your transaction signature 2UiPrhWK1gfxp8Ddwqh11Pee1P5RZaw7cPpXeNqEFriTYXv5LcaviBPb4JVj4auvLvDAgw5HfXSKb1XbWNE7L9xz
create competition round account state:  {
  competitionId: <BN: 2>,
  buildCount: <BN: 0>,
  rewards: <BN: aa87bee538000>,
  totalPopularity: <BN: 0>,
  roundStartTime: <BN: 652c0d8e>,
  roundEndTime: <BN: 652d5f0e>,
  topPopularityMsgId: <BN: 0>,
  topPopularity: <BN: 0>
}
    ✔ create competition round (468ms)
summaryStatusAccountBefore["msgId"]:  <Buffer 01 00 00 00 00 00 00 00>
creat msg! Your transaction signature 5eoBuhZxC1kFb7tDV34o3aHeY163uE6c9QVjXCArRs3vNXqzubvRdubnxknzhEFLNSkUmR4xGSmzgQ1BqKbLcScs
msg summary account state:  {
  isInitialized: true,
  msgId: <BN: 1>,
  mfcCoinId: PublicKey [PublicKey(DmFq1sKzgW7bhSVY7F4nefJ9ZbYuGev3jk8qgS1HgtAN)] {
    _bn: <BN: bda2908a6f8307fa4e4685250bb89475420cdfc199cc5d8a83c6486653fae523>
  },
  totalRewardsPool: <BN: c7d713b49da0000>,
  voteFeeRate: <BN: 1f4>,
  rewardsFeeRate: <BN: 32>,
  rateToCreator: <BN: 1f4>,
  rewardsReduceRate: <BN: 7d0>,
  rewardsReduceRound: <BN: 64>,
  globalCompetitionId: <BN: 2>,
  competitionPeriod: <BN: 15180>,
  roundStartTime: <BN: 652c0d8e>,
  mfcCurrentSupply: <BN: aa87bee538000>,
  mfcSwapPoolOwner: PublicKey [PublicKey(D8uZbVL5iMhyyJiDCscZNY2ADPcH9aoUicmqNvViKY8r)] {
    _bn: <BN: b452bda4cc8448527fcb2983ec58ecbd4c24f39bd29d03365ebaa881599a58c3>
  },
  solPoolAmount: <BN: 0>
}
msg account state:  {
  msgId: <BN: 1>,
  competitionId: <BN: 2>,
  data: 'my first msg',
  voteAmount: <BN: 0>,
  popularity: <BN: 0>
}

start vote 1000000000 lamports for this msg!=============
vote msg! Your transaction signature 4DjTxbo8dJQjE1UaeK6ZcNPS5cVwVyka2tXEVveHTGNEPBXtZ91njepHnExV86KQdvxvSgWw3ZPUeFccHa8vhQoq
msg account state after vote:  {
  msgId: <BN: 1>,
  competitionId: <BN: 2>,
  data: 'my first msg',
  voteAmount: <BN: 3b9aca00>,
  popularity: <BN: 174876e800>
} total vote num:  1000000000
vote account state:  {
  amount: <BN: 3b9aca00>,
  popularity: <BN: 174876e800>,
  hasWithdraw: false
} account:  F6AiUmVT2TjCU2vK4z1wjqfAkV4TDDQ8EPcTqqJS9MWa ' vote number:  1000000000

start comment for msgId: 1 =============
comment msg! Your transaction signature 43Q6okKPLYM9fPWVkKmj1MsTxrhd4pRZ9Gh1yJVj6k3ZNPA15H66jwk9qEkesmbHsfNFRD9jCY3JaibjPNeS8Wug
comment account state:  { data: 'Good message!' }
    ✔ creat msg! (1407ms)


  5 passing (4s)

✨  Done in 5.15s.
```