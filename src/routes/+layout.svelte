<script>
	import '../app.css';

	const paths = [
		['item1', '/item1'],
		['item2', '/item2']
	];
</script>

<nav class="relative justify-between flex px-10 items-center font-bold p-5">
	<div>NAME HERE</div>
	<ul class="flex flex-row gap-7">
		{#each paths as path}
			<li class="hover:text-blue-400">
				<a href={path[1]}>{path[0]}</a>
			</li>
		{/each}
	</ul>
</nav>

<slot />
