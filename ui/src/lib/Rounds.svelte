<script>
    import {onMount} from "svelte";
    import {player, round} from '../stores/main';
    import PlayGame from './PlayGame.svelte';
    import Winners from './Winners.svelte';
    import {getPlayer, getRound} from "../services/flag-nft.js";

    onMount(async function () {
        const roundResponse = await getRound();
        const playerResponse = await getPlayer($player);
        round.update(() => roundResponse.round);
        player.update(() => playerResponse);
    });
</script>

<header class="flags-nft-game w3-container" style="padding-top:22px">
    <div class="flags-nft-game w3-center">
        <h2>Welcome {$player.publicKey}</h2>
        {#if !$round.isOpen && !$round.isPlaying}
            <h1><strong>The round isn't open yet, come back soon!</strong></h1>
            <Winners/>
        {:else if $round.isOpen}
            {#if $player.status = 'joined'}
            {:else}
                <h1><strong>The next round is now open!</strong></h1>
                <div class="flags-nft-game container">
                    <div class="flags-nft-game popup background">
                        <div class="message">Entry cost: 100 XLM</div>
                        <button class="flags-nft-game join-btn">Join</button>
                    </div>
                </div>
                <Winners/>
            {/if}
        {:else if $round.isPlaying}
            {#if $player.status = 'playing'}
                <PlayGame/>
            {:else}
                <h1><strong>There's a round currently in progress</strong></h1>
                <p>Come back later to register for a new round!</p>
                <Winners/>
            {/if}
        {/if}
    </div>
</header>

<style>
    .container {
        display: inline-flex;
    }

    .container .popup {
        position: relative;
        background-color: #ffffff;
        padding: 15px;
        margin: 10px;
        width: 10px;
        margin-top: 45px;
        height: 10px;
        font-size: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .container .message {
        position: absolute;
        top: 0;
        font-size: 14px;
        width: 250px;
        background-color: #ffffff;
        color: #ffffff;
        padding: 5px 8px;
        border-radius: 5px;
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .container .message::before {
        position: absolute;
        content: '';
        height: 8px;
        width: 8px;
        background-color: #ffffff;
        bottom: -3px;
        left: 50%;
        transform: translate(-50%) rotate(45deg);
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .container .popup:hover .message {
        top: -45px;
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
    }

    .container .popup:hover button,
    .container .popup:hover .message {
        text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
    }

    .container .background:hover,
    .container .background:hover .message,
    .container .background:hover .message::before {
        background-color: #3b5999;
        color: #ffffff;
    }
</style>
