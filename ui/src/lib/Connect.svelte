<script>
	import PrivateKey from '../wallets/privateKey';
	let inputValue = '';

	async function connectWithPrivateKey() {
		const privateKey = new PrivateKey();
		await privateKey.logIn(inputValue);
	}
</script>

<div class="w3-container w3-center">
	<input type="text" bind:value={inputValue} placeholder="insert private key" />
	<button on:click={() => connectWithPrivateKey()}>Connect</button>
</div>
