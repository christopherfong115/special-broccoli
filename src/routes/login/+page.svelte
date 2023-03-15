<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';

	export let data: PageData;
</script>

<div
	class="flex flex-col xs:w-[85%] sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6 absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 p-4 outline outline-4 outline-blue-400"
>
	<div class="translate-y-20 mb-40">
		<img
			class="rounded-full outline outline-blue-300 mx-auto object-cover aspect-square w-44"
			alt="pic-sad"
			src={'/sad.jpg'}
		/>
	</div>
	<form
		method="POST"
		action="?/login"
		use:enhance
		class="flex flex-col gap-7 rounded-md p-4 text-black"
	>
		{#if !data.session}
			<h1 class="text-center font-bold text-3xl text-blue-400 uppercase">start</h1>
			<div class="flex flex-col gap-1">
				<!-- svelte-ignore a11y-label-has-associated-control
				<label>Username</label> -->
				<input
					name="email"
					type="text"
					required
					class="pl-1 outline focus:outline-slate-400 outline-slate-300 rounded-md"
					placeholder="Email"
				/>
			</div>
			<div class="flex flex-col gap-1">
				<!-- svelte-ignore a11y-label-has-associated-control
				<label>Password</label> -->
				<input
					name="password"
					type="password"
					required
					class="pl-1 outline outline-slate-300 rounded-md"
					placeholder="Password"
				/>
			</div>
			<div class="block mr-0 ml-auto">
				<button
					class="text-white uppercase bg-blue-400 hover:bg-blue-300 font-bold w-fit px-3 py-1 align-"
					>get</button
				>
			</div>
		{:else if data.session}
			<div class="text-white text-center font-bold">
				Welcome back,
				{' '}

				<div class="text-amber-400 font-bold">{data.session.user.email}</div>
			</div>
		{/if}
	</form>
</div>
