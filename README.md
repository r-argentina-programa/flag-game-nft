# Stellar NFT Flags Game

Stake your XLM, guess the flag before other players and earn XLM and a Flag NFT!

## Game mechanic

TBD

## Installation

Start by creating the relevant accounts and flag maps using the `cli`.
Run these commands from the root folder: 
```bash
 cd cli
 npm install
 npm run start
```
This creates the flag maps in `/shared/data/`.

Then ensure you can run the server, while on the root folder, run `cd server && npm install` to install the server dependencies.
Run `cp .env.dist .env` and populate the right values on `.env`. If you follow these instructions, the server will run on `http://localhost:5000` when you execute `npm run start` (or `npm run dev` in development mode).

While on the root folder, run `cd ui && npm install` in the root folder to install the UI application.



Finally, on the root folder run `npm run dev` to start the UI application and `npm run start` to start the server application.
