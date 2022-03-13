<script>
	import { Jumper } from 'svelte-loading-spinners';
</script>

<div class="flags-nft-game spinner">
	<div class="modal-wrapper">
		<div class="modal">
			<div class="flags-nft-game modal-header">
				<h1 class="flags-nft-game title-modal">LOADING...</h1>
				<Jumper size="60" color="#000000" unit="px" duration="1s" />
			</div>
		</div>
	</div>
</div>

<style>
	.modal-header {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.title-modal {
		font-family: 'Montserrat', sans-serif;
		font-size: 12px;
		font-weight: bold;
		width: 120px;
	}
	.spinner {
		display: flex;
		justify-content: center;
		z-index: 9999;
	}

	.modal-wrapper {
		background-color: rgb(0, 0, 0);
		background-color: rgba(0, 0, 0, 0.6);
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}

	.modal {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: white;
		max-width: 600px;
		width: 220px;
		height: 140px;
		padding: 1rem;
		margin: 15% auto;
		border-radius: 5px;
	}

	@media screen and (max-width: 291px) {
		.modal {
			height: 600px;
		}
	}
</style>
