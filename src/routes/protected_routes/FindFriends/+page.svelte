<script lang="ts">
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import { onDestroy } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let { session, users } = data;

	type User = {
		id: string;
		created_at: string;
		provider: string;
		sessionuserid: string;
		username: string;
		email: string;
		avatar: string;
	};

	const header = 'Find_Friends'.split('');

	const usersSearch: User[] = users.map((user: User) => ({
		...user,
		searchTerms: `${user.username} ${user.email}`
	}));

	console.log(usersSearch);

	const searchStore = createSearchStore(usersSearch);

	const unsubscribe = searchStore.subscribe((model) => searchHandler(model));
	onDestroy(() => {
		unsubscribe();
	});
</script>

<div class="flex mx-auto w-fit">
	{#each header as letter}
		<h1
			class="cursor-pointer text-slate-300 hover:text-red-400 tracking-widest font-extrabold text-center text-4xl mt-10"
		>
			{letter}
		</h1>
	{/each}
</div>

{#if session}
	<div class="text-white pl-10">Current User: {session.user.email}</div>
{/if}
<div class="flex justify-end pr-10">
	<input
		class="pl-1 bg-slate-400 text-white placeholder:text-white outline outline-offset-2 outline-slate-600 rounded-md p-2 w-[25%] mb-5"
		type="text"
		placeholder="Search by username or email"
		bind:value={$searchStore.search}
	/>
</div>
<div class="text-white grid grid-cols-5 p-10">
	{#each $searchStore.filtered as user}
		<div class="w-fit flex flex-col gap-3">
			<img class="rounded-full aspect-square w-44 object-cover" alt="pfp" src={user.avatar} />
			<div class="text-purple-400 font-bold text-center">{user.username}</div>
		</div>
	{/each}
</div>
