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