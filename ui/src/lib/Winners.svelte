<script>
	import { onMount } from 'svelte';
	import { getWinners } from '../services/flag-nft.js';

	let winners = [];
	onMount(async function () {
		const winnersResponse = await getWinners();
		winners = winnersResponse;
	});
</script>

<div class="flags-nft-container w3-container">
	<div class="w3-row-padding w3-margin-top">
		<h3>Past winners</h3>
		{#if winners.length > 0}
			{#each winners as winner}
				{#each winner.nfts as nft}
					<div class="flags-nft w3-quarter">
						<div class="w3-container w3-padding-16 w3-center">
							<img
								src="static/{nft.toLowerCase()}.svg"
								alt="List of winners"
								width="120"
								height="80"
							/>
							<div class="w3-clear" />
							<p class="flags-nft-pubkey">
								<strong>{nft} {winner.publicKey}</strong>
							</p>
						</div>
					</div>
				{/each}
			{/each}
		{:else}
			<h3>There are no winners yet</h3>
		{/if}
	</div>
	<div class="flags-nft-how-to w3-row-padding">
		<h3>How does it work?</h3>
		<span
			>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse quaerat mollitia numquam
			voluptatem quibusdam earum obcaecati necessitatibus, aliquam optio deleniti quod quisquam quis
			architecto laboriosam, asperiores eaque laborum fugiat veritatis?</span
		>
	</div>
</div>

<style>
	.flags-nft-container {
		display: flex;
		justify-content: space-between;
	}

	.flags-nft {
		width: 160px;
	}

	.flags-nft-how-to {
		width: 420px;
	}

	.flags-nft-pubkey {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
