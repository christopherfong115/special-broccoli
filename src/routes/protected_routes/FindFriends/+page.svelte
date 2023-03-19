<script lang="ts">
	import { enhance } from '$app/forms';
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import { onDestroy } from 'svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let acceptedid: any[] = [];

	if (form) {
		acceptedid.push(form.friendid);
		console.log(acceptedid);
	}

	let { session, users, friends, pendingRequests } = data;

	type User = {
		id: string;
		created_at: string;
		provider: string;
		sessionuserid: string;
		username: string;
		email: string;
		avatar: string;
	};

	type Friend = {
		friendid: string;
		sessionuserid: string;
		frienduserid: string;
		friendusername: string;
		friendavatar: string;
		friendconfirm: boolean;
	};

	const header = 'Find_Friends'.split('');

	const usersSearch: User[] = users.map((user: User) => ({
		...user,
		searchTerms: `${user.username} ${user.email}`
	}));

	const searchStore = createSearchStore(usersSearch);

	const unsubscribe = searchStore.subscribe((model) => searchHandler(model));
	onDestroy(() => {
		unsubscribe();
	});
</script>

{#if session}
	<div class="text-white pl-10 font-semibold">Current User: {session.user.email}</div>
{/if}
{#if pendingRequests.length !== 0}
	<h1 class="text-white text-4xl font-bold text-center mt-10">Pending Requests</h1>
	<div class="text-white grid grid-cols-5 p-10">
		{#each pendingRequests as pr}
			{#if !pr.friendconfirm}
				<form action="?/acceptFriend" method="POST">
					<div class="w-fit flex flex-col gap-3">
						<input type="hidden" name="sessionuserid" hidden value={pr.sessionuserid} />
						<input type="hidden" name="friendusername" hidden value={pr.username} />
						<input type="hidden" name="friendavatar" hidden value={pr.avatar} />
						<input type="hidden" name="frienduid" hidden value={pr.friendid} />
						<img class="rounded-full aspect-square w-44 object-cover" alt="pfp" src={pr.avatar} />
						<div class="text-purple-400 font-bold text-center">{pr.username}</div>
						<button
							class="text-white font-semibold w-full mx-auto outline outline-slate-400 hover:bg-slate-600"
							>Accept</button
						>
					</div>
				</form>
			{/if}
		{/each}
	</div>
{/if}

<h1 class="text-white text-4xl font-bold text-center mt-10">Your Friends</h1>
<div class="text-white grid grid-cols-5 p-10">
	{#each friends as friend}
		<div class="w-fit flex flex-col gap-3">
			<img
				class="rounded-full aspect-square w-44 object-cover"
				alt="pfp"
				src={friend.friendavatar}
			/>
			<div class="text-purple-400 font-bold text-center">{friend.friendusername}</div>
		</div>
	{/each}
</div>

<div class="flex mx-auto w-fit">
	{#each header as letter}
		<h1
			class="cursor-pointer text-slate-300 hover:text-red-400 tracking-widest font-extrabold text-center text-4xl mt-10"
		>
			{letter}
		</h1>
	{/each}
</div>

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
		<form action="?/addFriend" use:enhance method="POST">
			<div class="w-fit flex flex-col gap-3">
				<input type="hidden" name="sessionuserid" hidden value={user.sessionuserid} />
				<input type="hidden" name="friendusername" hidden value={user.username} />
				<input type="hidden" name="friendavatar" hidden value={user.avatar} />
				<img class="rounded-full aspect-square w-44 object-cover" alt="pfp" src={user.avatar} />
				<div class="text-purple-400 font-bold text-center">{user.username}</div>
				{#if form?.friendid === user.sessionuserid}
					<div class="text-emerald-500 text-center font-semibold">Added</div>
				{:else}
					<button
						class="text-white font-semibold w-full mx-auto outline outline-slate-400 hover:bg-slate-600"
						>Add</button
					>
				{/if}
			</div>
		</form>
	{/each}
</div>
