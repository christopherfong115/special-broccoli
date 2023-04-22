import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();

	const { data: chats, error: err } = await locals.supabase
		.from('mainchat')
		.select('*')
		.order('created_at', { ascending: true });

	// console.log(users_online);
	return { session, chats };
};

export const actions: Actions = {
	sendMsg: async ({ request, locals }) => {
		const session = await locals.getSession();

		if (!session) {
			throw redirect(303, '/');
		}

		const body = await request.formData();
		const msg = body.get('msg');

		const { data: profile } = await locals.supabase
			.from('users')
			.select('username, email, avatar')
			.eq('sessionuserid', session.user.id)
			.single();

		const { data: msgsend, error: err } = await locals.supabase.from('mainchat').insert({
			userid: session.user.id,
			contents: msg,
			username: profile.username,
			roomid: '1',
			avatar: profile.avatar
		});
	}
};
