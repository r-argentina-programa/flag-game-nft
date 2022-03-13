<script>
	import { winner, prize, flagName, flagImage } from '../store/store';
</script>

<div class="w3-container w3-center">
	{#if $winner}
		<h1>You Won!</h1>
		<p>Well done you have won {$prize} XLM and the {$flagName}</p>
		<img src={$flagImage} alt={$flagName} />
	{:else}
		<h1>You lost!</h1>
		<p>Try again next round</p>
	{/if}
</div>
