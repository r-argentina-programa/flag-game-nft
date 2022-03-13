# Stellar NFT Flags Game

Stake your XLM, guess the flag before other players and earn XLM and a Flag NFT!

## Game mechanic

TBD

## Installation

### Run the CLI

Start by creating the relevant accounts and flag maps using the `cli`. Run these commands from the root folder:

```bash
 cd cli
 npm install
 cp .env.dist .env #populate the values of .env before running the next command
 npm run start
```

Sample .env values

```
STELLAR_NETWORK=https://horizon-testnet.stellar.org
STELLAR_NETWORK_PASSPHRASE=Test SDF Network ; September 2015

# This account is not relevant to the game mechanic, any account with sufficient XLM (>110) will do
# These are sample values, you can create a new account in testnet using the stellar laboratory
# https://laboratory.stellar.org/#account-creator?network=test

FUNDER_PUBLIC_KEY=GBI7ZCRZFNRSRG3Y5TANXO6QL3T2IFT745P334MFYMT6YDU3RGXFXKZG
FUNDER_SECRET_KEY=SDPIP2CYLFLOIX52FTCK5LN5Q4HPEFZEDUXMNVTETYHYK4JDW2BHXHEM
```

The CLI does the following:

* Creates the flag maps in `json` format in the `/shared/data/` folder which will be used by the server to serve 1
  random pixel at a time.
* Creates a NFT ISSUER account which issues one NFT per flag.
* Creates a GAME MASTER account which will hold all the available NFTs to distribute to winning players
* Locks the NFT ISSUER account, so it can't emit any more assets.

When running the CLI you should see an output similar to this one.

```
arg flag map written to ../shared/data/arg.json
bol flag map written to ../shared/data/bol.json
bra flag map written to ../shared/data/bra.json
gmb flag map written to ../shared/data/gmb.json
GBI7ZCRZFNRSRG3Y5TANXO6QL3T2IFT745P334MFYMT6YDU3RGXFXKZC funded game master GCGPFSI5FIIJSFKT543HS4ZHDQTFD6LQKDLYK4YBCA2L5HMAHP2BKALP SDI5YEP2AQBGN6WTFNR3TE3ZCBZYBUYTZCYP5PZEE5CPXE5QJWSXKBNM
GBI7ZCRZFNRSRG3Y5TANXO6QL3T2IFT745P334MFYMT6YDU3RGXFXKZC funded nft issuer GBGKHLHSKCO4LF3BGDTWSNNCFUYLCQETSGZKXGZIWLPRWFY25Y4VM3YL
creating nft ARG by GBGKHLHSKCO4LF3BGDTWSNNCFUYLCQETSGZKXGZIWLPRWFY25Y4VM3YL
creating nft BOL by GBGKHLHSKCO4LF3BGDTWSNNCFUYLCQETSGZKXGZIWLPRWFY25Y4VM3YL
creating nft BRA by GBGKHLHSKCO4LF3BGDTWSNNCFUYLCQETSGZKXGZIWLPRWFY25Y4VM3YL
creating nft GMB by GBGKHLHSKCO4LF3BGDTWSNNCFUYLCQETSGZKXGZIWLPRWFY25Y4VM3YL
all flags created
locking GBGKHLHSKCO4LF3BGDTWSNNCFUYLCQETSGZKXGZIWLPRWFY25Y4VM3YL ...
locked GBGKHLHSKCO4LF3BGDTWSNNCFUYLCQETSGZKXGZIWLPRWFY25Y4VM3YL
setup script finished
```

### Server

```bash
cd server
npm install
cp .env.dist .env #make sure you populate the .env with the right values
npm run dev #development mode
# or
npm run start #production mode
```

Once you create the .env file, you must ensure you populate it with the right values.

```
FRONTEND_URL=http://localhost:3000 #generally this will be the url
STELLAR_NETWORK=https://horizon-testnet.stellar.org
STELLAR_NETWORK_PASSPHRASE=Test SDF Network ; September 2015

## These are obtained by running the CLI. These values are fake and will not work.
GAME_MASTER_PUBLIC_KEY=GCGPFSI5FIIJSFKT543HS4ZHDQTFD6LQKDLYK4YBCA2L5HMAHP2BKALA
GAME_MASTER_SECRET_KEY=SDI5YEP2AQBGN6WTFNR3TE3ZCBZYBUYTZCYP5PZEE5CPXE5QJWSXKBNN
NFT_ISSUER_PUBLIC_KEY=GBGKHLHSKCO4LF3BGDTWSNNCFUYLCQETSGZKXGZIWLPRWFY25Y4VM3A2

## When testing the API, avoiding the mechanism of paying the join fee can speed things up. More on this later.
DEVELOPMENT_SKIP_JOIN_FEE=false
```

### UI

```
cd ui
npm install
cp .env.dist .env # make sure you populate the right values before running the next command
npm run dev
```

When populating the .env, a single value is required, here is a sample configuration:

```
VITE_SERVER_URL=http://localhost:5000 # by default this is the port the server uses
VITE_STELLAR_NETWORK=https://horizon-testnet.stellar.org
VITE_STELLAR_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
```
