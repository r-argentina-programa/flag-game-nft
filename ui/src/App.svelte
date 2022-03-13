<script>
	import { io } from 'socket.io-client';
	import Rounds from './ui/lib/Rounds.svelte';
	import Connect from './ui/lib/Connect.svelte';
	import { isConnected } from './ui/store/store';
	const socket = io(import.meta.env.VITE_SERVER_URL);
	socket.on('message', (data) => console.log(data));
</script>

{#if $isConnected}
	<Rounds />
{:else}
	<Connect />
{/if}
