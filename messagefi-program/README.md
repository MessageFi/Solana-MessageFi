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
* create message
* vote 1000000000 lamports for this msg
* add comments
```shell
anchor test
```
test output:
```text
  messagefi-program
payer balance:  1000000000
    ✔ payer airdrop (268ms)
create MFC token!111111111 
mint token account:  C4BfmmkQMautVC419tXAwWpVvkrDvGgA7uHuZ813Regn
    ✔ create MFC token! (464ms)
Your transaction signature 2WqabjiYmA94agpkUHB6PZVuJahsM1BG4mxRgg7Q2JUrkcwqbrfS2X8UN2mCCihbwG2T5dcZMNqj61QjnqnoG3XQ
msg summary account state:  {
  isInitialized: true,
  msgId: <BN: 0>,
  mfcCoinId: PublicKey [PublicKey(C4BfmmkQMautVC419tXAwWpVvkrDvGgA7uHuZ813Regn)] {
    _bn: <BN: a4415c8bc18f10107450d79276b59beb49a0bbec1577f38c4e5b3b98786adcd7>
  }
}
    ✔ initialized messagefi program! (478ms)
summaryStatusAccountBefore["msgId"]:  <Buffer 01 00 00 00 00 00 00 00>
creat msg! Your transaction signature 3PmjDHW2jLPwvFBC1yjTUdEJaiv7pHZFSPs41WT6M8Jh2uh4vjC9kHtzhZKKtKtU1xMKi7TzZ3sMHApauYAxsvgb
msg summary account state:  {
  isInitialized: true,
  msgId: <BN: 1>,
  mfcCoinId: PublicKey [PublicKey(C4BfmmkQMautVC419tXAwWpVvkrDvGgA7uHuZ813Regn)] {
    _bn: <BN: a4415c8bc18f10107450d79276b59beb49a0bbec1577f38c4e5b3b98786adcd7>
  }
}
msg account state:  { msgId: <BN: 1>, data: 'my first msg', voteAmount: <BN: 0> }

start vote 1000000000 lamports for this msg!=============
vote msg! Your transaction signature MEJ9wgTpyFZqBAnirMf9ff84zTZ7SYJzW6ndEqUPdQD2ZpXCYMPqc9v6RKenz2w8gH7JptF6zyw6uWd1y48igXG
msg account state after vote:  { msgId: <BN: 1>, data: 'my first msg', voteAmount: <BN: 3b9aca00> } total vote num:  1000000000
vote account state:  { amount: <BN: 3b9aca00> } account:  F6AiUmVT2TjCU2vK4z1wjqfAkV4TDDQ8EPcTqqJS9MWa ' vote number:  1000000000

start comment for msgId: 1 =============
comment msg! Your transaction signature 3kAhjJ9TjRyHtY8UFc3rYXBCiMum4sBQPs2ZWXgPJY9FAa1itgGh2tRKYc6wnEBfhsitf2sJFDVYZV8EhHzNGgwF
comment account state:  { data: 'Good message!' }
    ✔ creat msg! (1414ms)


  4 passing (3s)

✨  Done in 6.52s.
```