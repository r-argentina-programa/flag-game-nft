<script lang="ts">
	import PlayGame from './ui/lib/PlayGame.svelte';
	import { io } from 'socket.io-client';
	const socket = io(import.meta.env.VITE_SERVER_URL);
	socket.on('message', (data) => console.log(data));
</script>

<PlayGame />
