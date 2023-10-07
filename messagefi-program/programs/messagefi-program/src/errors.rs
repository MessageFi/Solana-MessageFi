use anchor_lang::error_code;

#[error_code]
pub enum MyError {
    #[msg("account inconsistent")]
    AccInconsistent,
}
