import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: profile } = await locals.supabase
		.from('users')
		.select('username, email, avatar')
		.eq('sessionuserid', session.user.id)
		.single();

	console.log(profile);
	return { session, profile };
};
