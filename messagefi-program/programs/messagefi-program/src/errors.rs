use anchor_lang::error_code;

#[error_code]
pub enum MyError {
    #[msg("already initialized")]
    AlreadyInitialized,
    #[msg("account inconsistent")]
    AccInconsistent,
}
