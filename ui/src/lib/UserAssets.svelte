<script>
	import { userNFTs } from '../stores/main.js';
</script>

<div class="w3-container w3-center">
	<h1>My NFTs</h1>
	<div class="nfts-container">
		{#if $userNFTs.length > 0}
			{#each $userNFTs as nft}
				<img src={nft} alt="" class="w3-margin-left" />
			{/each}
		{:else}
			You don't have any NFT
		{/if}
	</div>
</div>
