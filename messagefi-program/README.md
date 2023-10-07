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
Your transaction signature 4jcLAAmAVPQCkNPRGK7wWfV4MpGWhESFgfZayycFGcmUNqE4BCyBMm2Upyhkjmtg76z2vihJ4mTwHar5se5HGqAh
msg summary account state:  { msgId: <BN: 0> }
    ✔ Is initialized! (449ms)
summaryStatusAccountBefore["msgId"]:  <Buffer 01 00 00 00 00 00 00 00>
creat msg! Your transaction signature FHejRUJMxLHCzh7FTqV6ooU9xwQkBK8c4E4XqXo3eAB9opMdLqj4fx54uH6LRRt74MYx4i2BLTpZmKncqerY6Wy
msg summary account state:  { msgId: <BN: 1> }
msg account state:  { msgId: <BN: 1>, data: 'my first msg', voteAmount: <BN: 0> }
    ✔ creat msg! (468ms)


  2 passing (919ms)
```