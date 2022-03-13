<script>
    import {flags} from '../../../shared/flags.js'
    import {onMount} from 'svelte';
    import {io} from "socket.io-client";
    import {round} from "../stores/main.js";

    const cols = 120;
    const rows = 80;

    let flagContainer;
    let selectedFlag;

    const handleSubmit = () => {
        console.log(selectedFlag);
    }

    const calculateIndex = (x, y) => {
        return (cols * (y)) + (x+1);
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
    };
    onMount(() => {
        const socket = io(import.meta.env.VITE_SERVER_URL);
        socket.on('RANDOM_PIXEL', (pixel) => {
            paintCell(pixel);
        });

        createGrid(rows, cols);
    });

</script>

<main
        class="w3-container  w3-center"
        style="height: 100vh; max-height: 1152px; border: 1px solid blue; display: flex; flex-direction: column;"
>
    <div style="padding: 1.25em; flex: 1 1 25%">
        <h1>Guess the flag!</h1>
        <p>The faster you do it, the more XLM you will earn, but if you fail, you are out!</p>
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
                        <select class="w3-select" name="flag" bind:value="{selectedFlag}">
                            <option disabled selected value="">Select one!</option>
                            {#each flags as flag}
                                <option value="{flag}">{flag}</option>
                            {/each}
                        </select>
                    </div>

                    <div class="w3-container w3-cell">
                        <button class="w3-button w3-teal" type="button" on:click="{handleSubmit}">Submit!</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</main>
