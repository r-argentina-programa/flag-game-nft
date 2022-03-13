<script lang="ts">
	import { io } from 'socket.io-client';
	import Rounds from './ui/lib/Rounds.svelte';
	const socket = io(import.meta.env.VITE_SERVER_URL);
	socket.on('message', (data) => console.log(data));
</script>

<Rounds />
