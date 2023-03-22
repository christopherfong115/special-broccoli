<script lang="ts">
	import { enhance } from '$app/forms';
	import { chatStore } from '$lib/stores/chats';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let { chats } = data;

	// $: ({ supabase } = data);

	// const dbFilter = {
	// 	schema: 'public',
	// 	table: 'mainchat',
	// 	event: 'INSERT'
	// };

	// let chatsTemp: any[] = [];

	// const channel = supabase.channel('#random');

	// channel
	// 	.on('postgres_changes', dbFilter, (payload: any) => {
	// 		chatsTemp.push(payload.new);
	// 		console.log(payload.new);
	// 	})
	// 	.subscribe();

	let message = '';
</script>

<h1>Chat room</h1>
<!-- <ul class="text-white">
	{#each $chatStore.msgs as chat2}
		<li>{chat2}</li>
	{/each}
</ul> -->
{#each chats as chat}
	<div class="text-white">{chat.contents}</div>
{/each}
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
