import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

export async function load({ locals }) {}

export const actions = {
	login: async ({ request }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');
		console.log(username, password);
		return { success: true, username: username, password: password };
	}
} satisfies Actions;
