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