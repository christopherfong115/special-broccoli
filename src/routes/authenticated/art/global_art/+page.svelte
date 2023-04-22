<script lang="ts">
	import gridStore from '$lib/stores/grids';

	let colors = [
		'bg-white',
		'bg-white',
		'bg-white',
		'bg-white',
		'bg-white',
		'bg-white',
		'bg-white',
		'bg-white',
		'bg-white',
		'bg-white',
		'bg-white',
		'bg-white'
	];

	gridStore.set(colors);

	function change(index: number, color: string) {
		colors[index] = color;
		gridStore.set(colors);
		console.log(colors);
	}
</script>

<div class="grid grid-cols-12 justify-items-center w-fit">
	{#each $gridStore as square, index}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			on:click={(e) => change(index, 'bg-amber-400')}
			class={`w-5 h-5 ${square} hover:bg-slate-400`}
		/>
	{/each}
</div>
