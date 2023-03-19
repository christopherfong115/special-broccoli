import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// const mySubscription = await locals.supabase
	// 	.channel('any')
	// 	.on(
	// 		'postgres_changes',
	// 		{ event: 'INSERT', schema: 'public', table: 'mainchat' },
	// 		async (payload: any) => {
	// 			console.log(payload);
	// 		}
	// 	)
	// 	.subscribe();

	const { data: chats, error: err } = await locals.supabase.from('mainchat').select('*');

	return { chats };
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
			roomid: '1'
		});
	}
};
