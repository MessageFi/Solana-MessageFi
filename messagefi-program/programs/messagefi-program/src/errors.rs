use anchor_lang::error_code;

#[error_code]
pub enum MyError {
    #[msg("already initialized")]
    AlreadyInitialized,
    #[msg("account inconsistent")]
    AccInconsistent,
    #[msg("new competition not stated")]
    NewCompetitionNotStarted,
    #[msg("competition hasn't ended")]
    CompetitionHasntEnded,
    #[msg("competition id not matched")]
    CompetitionIdNotMatched,
    #[msg("message not rank first")]
    MessageNotRankFirst,
    #[msg("reward already withdraw")]
    RewardAlreadyWithdraw,
    #[msg("token authority not matched")]
    TokenAuthorityNotMatched,
    #[msg("mint inconsistent")]
    MintInconsistent,
    #[msg("owner inconsistent")]
    OwnerInconsistent,
}
