<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let { session, profile } = data;
</script>

<div
	class="text-white absolute -translate-x-1/2 flex flex-col gap-3 -translate-y-1/2 left-1/2 top-1/2"
>
	<div class="text-white">
		<a href="/protected_routes/profile">{'<-'}</a>
	</div>
	{#if profile}
		<div class="">
			<img
				class="rounded-full mx-auto aspect-square w-44 object-cover"
				alt="avatar-img"
				src={profile?.avatar}
			/>
		</div>
		<h1 class="text-white text-center gap-2 font-bold">
			<div class="text-violet-400">
				{profile?.username}
			</div>
		</h1>
		<form action="?/update" method="POST" class="mx-auto w-full text-center">
			<input
				class="pl-1 text-black bg-slate-300 w-full rounded-2xl py-2 mb-4"
				type="text"
				placeholder="New username"
				name="username"
				required
			/>
			<button
				class="px-2 py-1 w-full outline outline-gray-500 hover:outline-slate-300 hover:text-slate-400"
			>
				Update
			</button>
		</form>
	{/if}
</div>
