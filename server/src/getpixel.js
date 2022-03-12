require('dotenv').config();
const { BigNumber: B } = require('bignumber.js');
const getPixels = require('get-pixels');
const fs = require('fs');
const StellarSdk = require('stellar-sdk');
const { ACCOUNTS_STARTING_BALANCE, TX_TIMEOUT } = require('./constants.js');
const server = new StellarSdk.Server(process.env.STELLAR_NETWORK);

async function createAccount() {
	try {
		const founderAccount = await server.loadAccount(process.env.FOUNDER_ACCOUNT_PUBLIC_KEY);
		console.log(founderAccount);
		const newAccountKeypair = StellarSdk.Keypair.random();
		const newPublicKey = newAccountKeypair.publicKey();

		console.log(newPublicKey);
		const startingBalance = new B(ACCOUNTS_STARTING_BALANCE).absoluteValue().toJSON();
		const founderAccountKeypair = StellarSdk.Keypair.fromSecret(
			process.env.FOUNDER_ACCOUNT_SECRET_KEY
		);

		const transaction = new StellarSdk.TransactionBuilder(founderAccount, {
			networkPassphrase: process.env.STELLAR_NETWORK_PASSPHRASE,
			fee: StellarSdk.BASE_FEE
		})
			.addOperation(
				StellarSdk.Operation.createAccount({
					destination: newPublicKey,
					startingBalance: '1'
				})
			)
			.setTimeout(TX_TIMEOUT)
			.build();

		transaction.sign(founderAccountKeypair);
		console.log('Transaction', transaction.toXDR());
		await server.submitTransaction(transaction);
		console.log(newPublicKey);
	} catch (e) {
		console.error('ERROR!', e.response.data);
	}
}
createAccount();
// const flags = ['arg', 'bol', 'bra', 'gmb'];

// function rgbToHex(r, g, b) {
// 	r = r.toString(16);
// 	g = g.toString(16);
// 	b = b.toString(16);

// 	if (r.length == 1) r = '0' + r;
// 	if (g.length == 1) g = '0' + g;
// 	if (b.length == 1) b = '0' + b;

// 	return '#' + r + g + b;
// }

// function getFlagMap(flag) {
// 	return new Promise((resolve, reject) => {
// 		const path = `../ui/shared/flags/120x80/${flag}.png`;
// 		getPixels(path, function (err, pixels) {
// 			const map = [];
// 			for (let y = 0; y < pixels.shape[1]; y++) {
// 				for (let x = 0; x < pixels.shape[0]; x++) {
// 					const r = pixels.get(x, y, 0);
// 					const g = pixels.get(x, y, 1);
// 					const b = pixels.get(x, y, 2);
// 					const hex = rgbToHex(r, g, b);

// 					map[y] = map[y] || [];
// 					map[y][x] = { flag: flags, color: hex, isVisible: false };
// 				}
// 			}
// 			resolve(map);
// 		});
// 	});
// }

// async function getFlagMaps() {
// 	for (const flag of flags) {
// 		const map = await getFlagMap(flag);
// 		console.log(flag, 'processed');
// 		const flagString = JSON.stringify(map, null, 2);
// 		fs.writeFile('flags.json', flagString, (err) => {
// 			if (err) throw err;
// 			console.log('Flags written to file');
// 		});
// 	}
// }

// getFlagMaps().then(console.log);

/*

Cuenta fundadora --> funda las demas cuentas

script --> crea cuentas de stellar

--> crear keypair de una cuenta -->  cuenta fundadora le da plata a la cuenta nueva

*/
