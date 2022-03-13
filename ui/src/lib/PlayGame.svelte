<script>
    import {flags} from '../../../shared/flags.js'
    import {onMount} from 'svelte';
    import {keyPair, player, round} from "../stores/main.js";
    import {submitAnswer} from "../services/flag-nft.js";
    import {submitClaimPrizeXdr} from "../services/stellar.js";
    import socket from "../services/socket.js";
    import Spinner from "./Spinner.svelte";

    let isLoading = true;

    const cols = 120;
    const rows = 80;

    let flagContainer;
    let selectedFlag;

    const handleSubmit = async () => {
        try {
            isLoading = true
            const response = await submitAnswer($player, selectedFlag);
            player.set(response.player);
            console.log(response);
            if ($player.status === 'won') {
                await submitClaimPrizeXdr(response.prizeXdr, $keyPair);
                console.log('Prize claimed!');
            }
        } catch (e) {
            console.error(e);
        } finally {
            isLoading = false;
        }
    }

    const calculateIndex = (x, y) => {
        return (cols * (y)) + (x + 1);
    }

    const paintCell = ({x, y, color}) => {
        flagContainer.querySelector(`div:nth-of-type(${calculateIndex(x, y)})`).style.backgroundColor = color;
    }

    const createGrid = (rows, cols) => {
        for (let c = 0; c < rows * cols; c++) {
            let cell = document.createElement('div');
            flagContainer.appendChild(cell).className = 'grid-item';
        }

        for (let i = 0; i < $round.pixels.length; i++) {
            paintCell($round.pixels[i]);
        }

        isLoading = false;
    };
    onMount(() => {
        socket.on('RANDOM_PIXEL', (pixel) => {
            paintCell(pixel);
        });

        createGrid(rows, cols);
    });

</script>

{#if isLoading}
    <Spinner />
{/if}
<main
        class="w3-container  w3-center"
        style="height: 100vh; max-height: 1152px; border: 1px solid blue; display: flex; flex-direction: column;"
>
    <div style="padding: 1.25em; flex: 1 1 25%">
        {#if $player.status === 'won'}
            <h1>You won!</h1>
        {:else if $player.status === 'lost'}
            <h1>You lost!</h1>
        {:else}
            <h1>Guess the flag!</h1>
            <p>The faster you do it, the more XLM you will earn, but if you fail, you will lose your 100 XLM!</p>
        {/if}
    </div>

    <div
            style="flex: 1 1 75%; display: flex; flex-direction: column; justify-content: space-evenly; align-items: center"
    >
        <div bind:this={flagContainer} class="flag-container" id="flag-container">
            <!-- -->
        </div>

        <div>
            <form>
                <div style="width: max-content; margin: auto">
                    <div class="w3-container w3-cell">
                        <select bind:value="{selectedFlag}" class="w3-select" name="flag">
                            <option disabled selected value="">Select one!</option>
                            {#each flags as flag}
                                <option value="{flag}">{flag}</option>
                            {/each}
                        </select>
                    </div>

                    <div class="w3-container w3-cell">
                        <button class="w3-button w3-teal" on:click="{handleSubmit}" type="button">Submit!</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</main>
