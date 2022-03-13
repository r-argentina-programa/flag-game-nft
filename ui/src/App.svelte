<script>
    import {io} from 'socket.io-client';
    import Rounds from './lib/Rounds.svelte';
    import Connect from './lib/Connect.svelte';
    import {round, isConnected} from './stores/main.js';

    const socket = io(import.meta.env.VITE_SERVER_URL);
    socket.on('ROUND_UPDATE', (updatedRound) => {
        console.log('round update', updatedRound);
        round.set(updatedRound);
    });
</script>

{#if $isConnected}
    <Rounds/>
{:else}
    <Connect/>
{/if}
