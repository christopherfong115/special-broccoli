import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async () => {
	const data = await fetch(
		'https://ddragon.leagueoflegends.com/cdn/13.6.1/data/en_US/champion.json'
	);
	const retval = await data.json();

	const valAgentData = await fetch('https://valorant-api.com/v1/agents');

	const valAgentRetval = await valAgentData.json();

	const filteredAgents = valAgentRetval.data.filter(
		(agent: any) => agent.uuid !== 'ded3520f-4264-bfed-162d-b080e2abccf9'
	);

	return { lolchamps: retval, valagents: filteredAgents };
};

export const actions: Actions = {
	searchUser: async ({ request, locals }) => {}
};
