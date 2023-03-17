<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div
	class="flex flex-col xs:w-[85%] sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6 absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 p-4 outline outline-4 outline-violet-500"
>
	<div class="translate-y-20 mb-40">
		<img
			class="rounded-full outline outline-violet-500 mx-auto object-cover aspect-square w-44"
			alt="pic-sad"
			src={'/benimaru.jpg'}
		/>
	</div>
	<form
		method="POST"
		action="?/register"
		use:enhance
		class="flex flex-col gap-7 rounded-md p-4 text-black"
	>
		<h1 class="text-center uppercase font-bold text-3xl text-purple-400">Create</h1>

		<div class="flex flex-col gap-1">
			<!-- svelte-ignore a11y-label-has-associated-control
			<label>Username</label> -->
			<input
				name="email"
				type="text"
				required
				class="pl-1 outline focus:outline-slate-400 outline-slate-300 rounded-md bg-slate-400 text-white placeholder:text-white"
				placeholder="Email"
			/>
		</div>
		<div class="flex flex-col gap-1">
			<!-- svelte-ignore a11y-label-has-associated-control
			<label>Username</label> -->
			<input
				name="username"
				type="text"
				required
				class="pl-1 outline focus:outline-slate-400 outline-slate-300 rounded-md bg-slate-400 text-white placeholder:text-white"
				placeholder="Username"
			/>
		</div>
		<div class="flex flex-col gap-1">
			<!-- svelte-ignore a11y-label-has-associated-control
			<label>Password</label> -->
			<input
				name="password"
				type="password"
				required
				class="pl-1 outline outline-slate-300 rounded-md bg-slate-400 placeholder:text-white text-white"
				placeholder="Password"
			/>
		</div>
		<div class="block mr-0 ml-auto">
			<button
				class="text-white uppercase bg-violet-400 hover:bg-violet-300 font-bold w-fit px-3 py-1 align-"
				>post</button
			>
		</div>
	</form>
</div>
