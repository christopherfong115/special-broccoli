<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData, PageData } from './$types';

	export let data: LayoutData;

	$: ({ supabase } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => subscription.unsubscribe();
	});

	const paths = [
		['login', '/login'],
		['register', '/register']
	];
</script>

<nav class="relative text-white justify-between flex px-10 items-center font-bold p-5">
	<div class="relative uppercase hover:text-purple-500">
		<a href="/">HOME</a>
	</div>
	<ul class="flex flex-row gap-7">
		{#if data.session}
			<li class="hover:text-purple-500">
				<a href="/protected_routes/profile">
					<button> profile </button>
				</a>
			</li>
			<li class="hover:text-purple-500">
				<a href="/protected_routes/FindFriends">
					<button> add_friends </button>
				</a>
			</li>
		{/if}
		{#each paths as path}
			<li class="hover:text-purple-500">
				<a href={path[1]}>{path[0]}</a>
			</li>
		{/each}
		{#if data.session}
			<li class="hover:text-green-500">
				<form action="/logout" method="POST">
					<button> signout </button>
				</form>
			</li>
		{/if}
	</ul>
</nav>

<slot />

<style>
	:global(body) {
		background-color: #121212;
	}
</style>
