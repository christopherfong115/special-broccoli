<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let { session, profile } = data;
</script>

<div
	class="text-white absolute -translate-x-1/2 flex flex-col gap-3 -translate-y-1/2 left-1/2 top-1/2"
>
	{#if profile}
		<div class="">
			<img
				class="rounded-full aspect-square w-44 object-cover"
				alt="avatar-img"
				src={profile?.avatar}
			/>
		</div>
		<h1 class="text-white text-center gap-2 font-bold">
			<div class="text-violet-400">
				{profile?.username}
			</div>
		</h1>
		<!-- <form class="mx-auto w-full text-center">
			<a
				href="/protected_routes/editprofile"
				class="px-2 py-1 w-full outline outline-gray-500 hover:outline-slate-300 hover:text-slate-400"
				>Edit Profile</a
			>
		</form> -->
	{/if}
</div>
