<script>
    import {onMount} from "svelte";
    import {keyPair, player, round} from '../stores/main';
    import PlayGame from './PlayGame.svelte';
    import Winners from './Winners.svelte';
    import {getJoinOffer, getPlayer, getRound, joinRound} from "../services/flag-nft.js";
    import {signJoinXdr} from "../services/stellar.js";

    onMount(async function () {
        const roundResponse = await getRound();
        const playerResponse = await getPlayer($player);
        round.set(roundResponse.round);
        player.set(playerResponse);
    });

    const handleJoin = async () => {
        const joinOfferXdr = await getJoinOffer($player);
        const signedJoinOfferXdr = signJoinXdr(joinOfferXdr, $keyPair);
        const updatedPlayer = await joinRound($player, signedJoinOfferXdr);
        console.log(updatedPlayer)
        player.set(updatedPlayer);
    }
</script>

<header class="flags-nft-game w3-container" style="padding-top:22px">
    <div class="flags-nft-game w3-center">
        <h2>Welcome <a href="https://stellar.expert/explorer/testnet/account/{$player.publicKey}"
                       target="_blank">{$player.shortPublicKey}</a></h2>
        {#if !$round.isOpen && !$round.isPlaying}
            <h1><strong>The round isn't open yet, come back soon!</strong></h1>
            <Winners/>
        {:else if $round.isOpen}
            {#if $player.status === 'joined'}
                <h1><strong>The next round is now open!</strong></h1>
                <h2>You have already joined. Wait for the round to start.</h2>
                <Winners/>
            {:else}
                <h1><strong>The next round is now open!</strong></h1>
                <div class="flags-nft-game container">
                    <div class="flags-nft-game popup background">
                        <div class="message">Entry cost: 100 XLM</div>
                        <button class="flags-nft-game join-btn" on:click="{handleJoin}">Join</button>
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
