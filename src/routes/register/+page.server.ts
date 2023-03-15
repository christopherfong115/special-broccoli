import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { AuthApiError } from '@supabase/supabase-js';

export const actions: Actions = {
	register: async ({ request, locals }) => {
		const body = await request.formData();

		const email = body.get('email');
		const password = body.get('password');

		const { data, error: err } = await locals.supabase.auth.signUp({
			email: email as string,
			password: password as string
		});

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: 'Invalid credentials.'
				});
			}
			return fail(500, {
				error: 'Server error. Try again later.'
			});
		}

		throw redirect(303, '/');
	}
};
