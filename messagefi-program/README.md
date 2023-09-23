# messagefi-program
## preinstall
````shell
anchor build
cp target/types/messagefi_program.ts ./types
````
or
```shell
npm run build-program
```
## test and api
[tests/messagefi-program.ts](./tests/messagefi-program.ts)
[types/messagefi_program.ts](./types/messagefi_program.ts)

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
## E2E test
```shell
anchor test
```
test output:
```text
Your counter address tMfmx7gwhaUJ96uLZQeWoxmAhVg54i5LLQhRioduRQg
Your wallet address 7dMmVQh6yT7WwEWqVZ4DjpArSuaC75KhcmhugUMw6fsD


  messagefi-program
Your transaction signature 4Xzy3pTCQyrnNF83mzQRJUefN6LBUe5qK7J4QZ1mPz5SvjYbyW7V4Er51RETpD4SKcVwCMWMG4E42HNLBG2ZvuTo
msg summary account state:  { msgCounter: <BN: 0> }
    ✔ Is initialized! (405ms)
creat msg! Your transaction signature 2QKLvTzkEGiNjHxRfNhRHUiXmS7gMPSREjed61GYTh5X76pEM2W2BLWtRxPeTuoapMWL4nveMFxv3estuNrH5EWi
msg summary account state:  { msgCounter: <BN: 1> }
msg account state:  { data: 'my first msg' }
    ✔ creat msg! (464ms)


  2 passing (870ms)
```