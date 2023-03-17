import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { AuthApiError } from '@supabase/supabase-js';

export const actions: Actions = {
	register: async ({ request, locals }) => {
		const body = await request.formData();

		const email = body.get('email');
		const password = body.get('password');
		const username = body.get('username');

		const { data, error: err } = await locals.supabase.auth.signUp({
			email: email as string,
			password: password as string
		});

		const { data2, error: err2 } = await locals.supabase.from('users').insert({
			username: username,
			provider: 'basic',
			avatar: 'https://nftevening.com/wp-content/uploads/2022/04/BAYC-PFP-NFT.png',
			email: email,
			sessionuserid: data.user.id
		});

		console.log(data2);

		if (err2) {
			console.log(err2);
		}

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
