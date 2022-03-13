<script>
    import Rounds from './lib/Rounds.svelte';
    import Connect from './lib/Connect.svelte';
    import {isConnected, round} from './stores/main.js';
    import socket from "./services/socket.js";

    socket.on('ROUND_UPDATE', (updatedRound) => {
        console.log('round update', updatedRound);
        if (updatedRound.winner !== null || updatedRound.isClosed === true) {
            location.reload();
            return;
        }
        round.set(updatedRound);
    });
</script>

{#if $isConnected}
    <Rounds/>
{:else}
    <Connect/>
{/if}
