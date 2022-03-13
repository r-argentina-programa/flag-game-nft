<script>
	import { onMount } from 'svelte';

	let flagContainer;

	onMount(() => {
		const createGrid = (rows, cols) => {
			for (let c = 0; c < rows * cols; c++) {
				let cell = document.createElement('div');
				flagContainer.appendChild(cell).className = 'grid-item';
			}
		};

		createGrid(120, 80);
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
		<div id="flag-container" class="flag-container" bind:this={flagContainer}>
			<!-- -->
		</div>

		<div>
			<form>
				<div style="width: max-content; margin: auto">
					<div class="w3-container w3-cell">
						<select class="w3-select" name="flag">
							<option value="" disabled selected>Select one!</option>
							<option value="arg">Argentina</option>
							<option value="bol">Bolivia</option>
							<option value="bra">Brazil</option>
							<option value="gmb">Gambia</option>
						</select>
					</div>

					<div class="w3-container w3-cell">
						<button class="w3-button w3-teal" type="submit">Submit!</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</main>
