<script lang="ts">
	import type { OutlineObject } from '$lib/data/interfaces/interfaces';
	import FlippingOutlineCard from '$lib/components/cards/OutlineCardFlipping.svelte';
	import Container from '$lib/components/outlineSVGs/OutlineSVG.svelte';
	import Toggle from '$lib/components/Toggle.svelte';
	import { prettify, shuffleOutlines } from '$lib/scripts/helpers';
	import { hydratedData } from '$lib/scripts/hydrate-outline-data';

	const shuffledSpecialOutlines: OutlineObject[] = shuffleOutlines(
		hydratedData.filter((outline) => outline.specialOutlineMeanings.length > 0)
	);

	let counter = $state(0);
	let outlineFirst = $state(false);
	let outlineObject = $derived(shuffledSpecialOutlines[counter]);

	const changeOutline = () => {
		counter === hydratedData.length - 1 ? (counter = 0) : counter++;
	};

	const handleKeydown = (event: { keyCode: number }) => {
		event.keyCode === 32 ? changeOutline() : null;
	};

	const toggleCardOrientation = () => (outlineFirst = !outlineFirst);
</script>

<svelte:head>
	<title>Revise | teeline.online</title>
	<meta
		name="description"
		content="Work your way through hundreds of virtual flash cards to sear Teeline shorthand outlines into your brain and get your speed closer to the sacred 100wpm."
	/>
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<div class="content">
	<div class="info-container">
		<p>Hover over / tap on the flash card to see what it stands for</p>
		<Toggle toggleLabel={`Show outlines first`} toggleFunction={toggleCardOrientation} />
	</div>

	<div class="flipcard-container">
		{#key outlineObject}
			<FlippingOutlineCard
				flipped={outlineFirst}
				front={prettify(outlineObject.specialOutlineMeanings)}
			>
				{#snippet back()}
					<div style="width: 60%">
						<Container {outlineObject} />
					</div>
				{/snippet}
			</FlippingOutlineCard>
		{/key}
	</div>

	<div class="button-container">
		<button class="button" onclick={changeOutline}>Next card...</button>
	</div>
</div>

<style>
	.content {
		padding: 0 0 20px 0;
	}
	.info-container {
		text-align: center;
	}
	.button-container {
		text-align: center;
	}
	button {
		font-size: 2rem;
		border-radius: 10px;
		padding: 10px 20px;
	}
	.flipcard-container {
		width: 100%;
	}
	@media (min-width: 1025px) {
		.flipcard-container {
			width: 30%;
			margin: auto;
		}
	}
</style>
