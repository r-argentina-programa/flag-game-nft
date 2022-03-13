<script>
	import { publicKey } from '../store/store';
</script>

<div class="flags-nft-container w3-container">
	<div class="w3-row-padding w3-margin-top">
		{#if $publicKey.length > 0}
			<h3>Past winners</h3>
			{#each $publicKey as key}
				<div class="flags-nft w3-quarter">
					<div class="w3-container w3-padding-16 w3-center">
						<i class="fa fa-solid fa-flag-checkered w3-xxxlarge" />
						<div class="w3-clear" />
						<p class="flags-nft-pubkey">
							<strong>{key}</strong>
						</p>
					</div>
				</div>
			{/each}
		{:else if $publicKey.length === 0}
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
	.fa-flag-checkered {
		text-align: center;
		color: black;
	}
	.flags-nft-pubkey {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
