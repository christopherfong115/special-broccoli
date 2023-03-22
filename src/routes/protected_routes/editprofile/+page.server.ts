import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();
	console.log(session.user.id);

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: profile } = await locals.supabase
		.from('users')
		.select('username, email, avatar')
		.eq('sessionuserid', session.user.id)
		.single();

	return { session, profile };
};

export const actions: Actions = {
	update: async ({ request, locals }) => {
		const session = await locals.getSession();
		const body = await request.formData();
		const username = body.get('username');
		console.log(username);

		const { data, error: err } = await locals.supabase
			.from('users')
			.update({
				username: username
			})
			.eq('sessionuserid', session.user.id);
		console.log(data);
		if (err) {
			return fail(500, { error: 'Error updating.' });
		}

		throw redirect(303, '/protected_routes/profile');
	}
};
