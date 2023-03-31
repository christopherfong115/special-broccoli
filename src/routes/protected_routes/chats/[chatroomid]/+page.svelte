<script lang="ts">
	import { enhance } from '$app/forms';
	import { onDestroy } from 'svelte';
	import type { PageData } from './$types';
	import supabase from '$lib/supabase';
	import chatStore from '$lib/stores/chats';
	import { get } from 'svelte/store';
	export let data: PageData;

	let { session, chats } = data;
	// chatStore.set(chats);

	chatStore.set(chats);
	const subscription = supabase
		.channel('send-msg')
		.on('postgres_changes', { event: '*', schema: 'public' }, (payload) => {
			chatStore.set([...get(chatStore), payload.new]);
		})
		.subscribe();

	onDestroy(() => {
		return () => supabase.removeChannel(subscription);
	});
	// const dbFilter = {
	// 	schema: 'public',
	// 	table: 'mainchat',
	// 	event: 'INSERT'
	// };

	let message = '';
</script>

<h1>Chat room</h1>
<!-- <ul class="text-white">
	{#each $chatStore.msgs as chat2}
		<li>{chat2}</li>
	{/each}
</ul> -->
<div class="flex flex-col gap-5 pb-10">
	{#each $chatStore as chat}
		<div class="pl-10">
			<div class="text-white flex items-center gap-4">
				<img alt="pfp" class="aspect-square w-14 object-cover rounded-full" src={chat.avatar} />
				<div>
					<h1 class="font-extrabold">{chat.username}</h1>
					<div>{new Date(chat.created_at).toDateString()}</div>
				</div>
			</div>
			<div class="text-white pl-10 pt-4">{chat.contents}</div>
		</div>
	{/each}
</div>
<div class="">
	<form class="" action="?/sendMsg" use:enhance method="POST">
		<input
			type="text-black placeholder:text-black bg-slate-400"
			name="msg"
			required
			bind:value={message}
			placeholder="send a message..."
		/>
		<button class="text-white">submit</button>
	</form>
</div>
