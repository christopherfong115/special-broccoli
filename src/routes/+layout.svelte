<script lang="ts">
	import '../app.css';

	const paths = [['login', '/login']];
</script>

<nav class="relative text-white justify-between flex px-10 items-center font-bold p-5">
	<div class="" />
	<ul class="flex flex-row gap-7">
		{#each paths as path}
			<li class="hover:text-purple-500">
				<a href={path[1]}>{path[0]}</a>
			</li>
		{/each}
	</ul>
</nav>

<slot />

<style>
	:global(body) {
		background-color: #121212;
	}
</style>
