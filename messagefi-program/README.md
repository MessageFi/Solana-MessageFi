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
Your transaction signature 4EaL5wKfYRjSAtsuV6ZGmsYUwNEPTwjo7nRUqEyLRVQ28J4f7ThcEj5sNqa2inDy44RDCEdKL96QPkyXLFXSEavD
msg summary account state:  { msgId: <BN: 0> }
    ✔ Is initialized! (532ms)
summaryStatusAccountBefore["msgId"]:  <Buffer 01 00 00 00 00 00 00 00>
creat msg! Your transaction signature 3r92jqFm9bcAjt6hQu6zjGeQDVGbisWFt2V1iT1WBN11DKdtK3rw4e41gUYvz77vzvBJHMTrgj9B1CvpZVEGBU3m
msg summary account state:  { msgId: <BN: 1> }
msg account state:  { msgId: <BN: 1>, data: 'my first msg', voteAmount: <BN: 0> }

start vote 1000000000 lamports for this msg!=============
vote msg! Your transaction signature 5erMoWGtTpdCpmbEatxHWXVTvEKfQGijeRKSMan6qQeEx7NEp7eGBfAQBkLbpkAgfr8m6uyPiaDTKZ1LjzJzxK7X
msg account state after vote:  { msgId: <BN: 1>, data: 'my first msg', voteAmount: <BN: 3b9aca00> } total vote num:  1000000000
vote account state:  { amount: <BN: 3b9aca00> } account:  F6AiUmVT2TjCU2vK4z1wjqfAkV4TDDQ8EPcTqqJS9MWa ' vote number:  1000000000

start comment for msgId: 1 =============
comment msg! Your transaction signature 268gtvkS6HScNrmXizhQneK1Vvj2uaSSkjD9WTSoVuSxFEGH8qji3snR7u1hiqXC4rCQ4xgNq36tNWdNuZ2QUqXp
comment account state:  { data: 'Good message!' }
    ✔ creat msg! (1405ms)


  2 passing (2s)

✨  Done in 3.23s.
```