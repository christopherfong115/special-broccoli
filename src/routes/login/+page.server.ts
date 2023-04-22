import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { AuthApiError } from '@supabase/supabase-js';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();

	const { data: profile } = await locals.supabase
		.from('users')
		.select('username, email, avatar')
		.eq('sessionuserid', session.user.id)
		.single();

	return { session, profile };
};

export const actions = {
	login: async ({ request, locals }) => {
		const body = await request.formData();
		const email = body.get('email');
		const password = body.get('password');
		const { data, error: err } = await locals.supabase.auth.signInWithPassword({
			email: email as string,
			password: password as string
		});

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: 'Invalid credentials.',
					values: {
						email
					}
				});
			}
			return fail(500, {
				error: 'Server error. Try again later.',
				values: {
					email
				}
			});
		}

		return { success: true };
	}
} satisfies Actions;
