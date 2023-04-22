<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	let { lolchamps, valagents } = data;
	type Champion = {
		version: string;
		id: string;
		key: string;
		partype: string;
		title: string;
		tags: string[];
		image: {
			full: string;
			group: string;
			sprite: string;
		};
	};

	type AgentAbilities = {
		slot: string;
		displayName: string;
		description: string;
		displayIcon: string;
	};

	type Agent = {
		uuid: string;
		displayName: string;
		description: string;
		displayIcon: string;
		fullPortrait: string;
		background: string;
		backgroundGradientColors: string[];
		role: {
			displayName: string;
			description: string;
			displayIcon: string;
		};
		abilities: AgentAbilities[];
	};

	let ValAgents: Agent[] = valagents;

	let champdata: Champion[] = [];
	for (const keys in lolchamps.data) {
		champdata.push(lolchamps.data[keys]);
	}

	function displayChamp() {
		displayChamps = true;
	}

	function displayLeague() {
		leagueSection = true;
		displayAgents = false;
		valSection = false;
	}
	function displayVal() {
		leagueSection = false;
		displayChamps = false;
		valSection = true;
	}

	function displayAgent() {
		displayAgents = true;
	}

	let displayChamps = false;
	let leagueSection = true;
	let displayAgents = false;
	let valSection = false;
</script>

<h1 class="text-white text-3xl font-extrabold">GAMES</h1>
<div class="flex gap-10 mx-auto pl-10 pt-10">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		on:click={displayLeague}
		class="w-fit px-6 flex items-center bg-slate-800 py-2 rounded-2xl hover:scale-105"
	>
		<img class="w-11 aspect-square" alt="lol-icon" src="/league-icon.png" />
	</div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		on:click={displayVal}
		class="w-fit px-7 flex items-center bg-slate-800 py-2 rounded-2xl hover:scale-105"
	>
		<img class="w-10 aspect-square" src="/valorant-icon.jpg" alt="val-icon" />
	</div>
</div>
{#if leagueSection}
	<div class="text-white flex gap-5 pl-10 pt-10">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="cursor-pointer" on:click={displayChamp}>All Champs</div>
		<div>Profile</div>
	</div>
	{#if displayChamps}
		<div class="grid grid-cols-5 gap-4 items-center justify-items-center">
			{#each champdata as champ}
				<div class="text-white text-center">
					<img
						title={`${champ.id}`}
						class="w-[250px] h-[282px] object-cover"
						alt="champ-pfp"
						src={`/champs/${champ.id.toLowerCase()}.jpg`}
					/>
					<div>
						{champ.id}
					</div>
					<div>
						{champ.title}
					</div>
				</div>
			{/each}
		</div>
	{/if}
{/if}

{#if valSection}
	<div class="text-white flex gap-5 pl-10 pt-10">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="cursor-pointer" on:click={displayAgent}>All Agents</div>
		<div>Profile</div>
	</div>
	{#if displayAgents}
		<div class="grid lg:grid-cols-5 md:grid-cols-2 gap-4 items-center justify-items-center">
			{#each ValAgents as agent}
				<div class={`text-white text-center`}>
					<div class={`relative`}>
						<img
							class={`absolute lg:-translate-y-32 opacity-30 lg:scale-75 md:scale-50 md:-translate-y-44 -z-40`}
							title={`${agent.displayName}`}
							alt="player_bg"
							src={agent.background}
						/>
					</div>
					<img
						title={`${agent.displayName}-bg`}
						class="w-[250px] h-[282px] object-cover mx-auto"
						alt="champ-pfp"
						src={agent.fullPortrait}
					/>
					<div class="font-bold mt-3">
						{agent.displayName}
					</div>
					<div class="flex gap-4">
						{agent.description}
					</div>
				</div>
			{/each}
		</div>
	{/if}
{/if}
