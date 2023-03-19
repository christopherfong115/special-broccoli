<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;

	let { chats } = data;

	let message = '';
</script>

<h1>Chat room</h1>
<ul class="text-white">
	{#each chats as chat}
		<li>{chat.contents}</li>
	{/each}
</ul>
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
