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
Your transaction signature 4rLSqqdoGRoMqTERCNBuKZ866iXSDzBim9wEw3NY25tmp3Bn7mkAeJ6rAqUa7yuLFZWqQbDd7vPDmDLtDZEZGhNr
msg summary account state:  { msgId: <BN: 0> }
    ✔ Is initialized! (256ms)
summaryStatusAccountBefore["msgId"]:  <Buffer 01 00 00 00 00 00 00 00>
creat msg! Your transaction signature 3MDvLMCKtbhmZZBfUBJ9fmiLwJ34x8cF5M4p7AdLa99wWUYLr64c6hk4H2a7zz5hYkoR6kN3K1nAh3AQ1uA37Phx
msg summary account state:  { msgId: <BN: 1> }
msg account state:  { msgId: <BN: 1>, data: 'my first msg', voteAmount: <BN: 0> }

start vote 1000000000 lamports for this msg!=============
vote msg! Your transaction signature 4GuaFN2EzJnhrBRvXfL9au5qJ8A5YGSexCKskPzRPugLdUabbmh8JRZYPib5RX5r8Ucq5mbZpR9Kp2SDorRFWqRi
msg account state after vote:  { msgId: <BN: 1>, data: 'my first msg', voteAmount: <BN: 3b9aca00> } total vote num:  1000000000
vote account state:  { amount: <BN: 3b9aca00> } account:  F6AiUmVT2TjCU2vK4z1wjqfAkV4TDDQ8EPcTqqJS9MWa ' vote number:  1000000000
    ✔ creat msg! (948ms)


  2 passing (1s)

✨  Done in 2.29s.
```