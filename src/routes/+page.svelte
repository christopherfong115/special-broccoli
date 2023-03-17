<script lang="ts">
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import BsBuilding from 'svelte-icons-pack/bs/BsBuilding';
	import RiMapRouteFill from 'svelte-icons-pack/ri/RiMapRouteFill';
	import BsChatText from 'svelte-icons-pack/bs/BsChatText';
	import FiUser from 'svelte-icons-pack/fi/FiUser';
	let techstack = '';

	const changeSvelte = () => {
		techstack = 's';
	};

	const changeSupabase = () => {
		techstack = 'sb';
	};
</script>

<div class="text-white">
	<h1 class="font-extrabold text-5xl text-center mt-20">SvelteKit Chat-app</h1>
	<div class="font-bold text-center mt-10">
		This entire project was built of the following tech stack:
	</div>
	<div class="flex gap-4 w-fit font-semibold text-lg text-center mx-auto">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div on:click={changeSvelte} class="hover:scale-[110%]">
			<img class="scale-[60%]" alt="svelte-logo" src="/svelte-logo.png" />
			<div>SvelteKit</div>
		</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div on:click={changeSupabase} class="hover:scale-[110%]">
			<img class="scale-[60%]" alt="supabase-logo" src="/supabase-logo.png" />
			<div>Supabase</div>
		</div>
	</div>

	{#if techstack === 's'}
		<div
			class="w-[80%] flex flex-col gap-5 p-4 bg-[#252525] mt-20 mx-auto rounded-xl outline outline-slate-600"
		>
			<h1 class="text-center font-bold text-xl text-orange-600">SvelteKit</h1>
			<div class="text-orange-400 flex gap-7 w-fit mx-auto font-semibold">
				<div>
					<Icon color={'white'} className="aspect-square scale-150 mx-auto mb-3" src={BsBuilding} />
					<div>Frontend Development</div>
				</div>
				<div>
					<Icon
						color={'white'}
						className="aspect-square scale-150 mx-auto mb-3"
						src={RiMapRouteFill}
					/>
					<div>Routing and Data fetching</div>
				</div>
			</div>
			<div>
				Sveltekit was used as the front end for this project in order to render data and to create
				appealing visual and UI/UX for interactions.
			</div>
		</div>
	{:else if techstack === 'sb'}
		<div
			class="w-[80%] flex flex-col gap-5 p-4 bg-[#252525] mt-20 mx-auto rounded-xl outline outline-slate-600"
		>
			<h1 class="text-center font-bold text-xl text-emerald-600">Supabase</h1>
			<div class="text-emerald-400 flex gap-7 w-fit mx-auto font-semibold">
				<div>
					<Icon color={'white'} className="aspect-square scale-150 mx-auto mb-3" src={FiUser} />
					<div>User Auth</div>
				</div>
				<div>
					<Icon color={'white'} className="aspect-square scale-150 mx-auto mb-3" src={BsChatText} />
					<div>Chat Rooms + Texts</div>
				</div>
			</div>
			<div>
				Supabase was used for its built in user authentication API's and using its relational
				database to fetch chats.
			</div>
		</div>
	{/if}
</div>
