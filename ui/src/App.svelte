<script>
    import {io} from 'socket.io-client';
    import Rounds from './lib/Rounds.svelte';
    import Connect from './lib/Connect.svelte';
    import {isConnected} from './stores/main.js';

    const socket = io(import.meta.env.VITE_SERVER_URL);
    socket.on('message', (data) => console.log(data));
</script>

{#if $isConnected}
    <Rounds/>
{:else}
    <Connect/>
{/if}
