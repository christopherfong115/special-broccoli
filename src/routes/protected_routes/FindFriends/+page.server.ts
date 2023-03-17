import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../FindFriends/$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();
	if (!session) {
		throw redirect(303, '/');
	}

	const { data, error: err } = await locals.supabase.from('users').select('*');

	return { session, users: data };
};
