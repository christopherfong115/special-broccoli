import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../FindFriends/$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();
	if (!session) {
		throw redirect(303, '/');
	}

	const { data: allUsers, error: err } = await locals.supabase.from('users').select('*');

	const { data: friends, error: ferr } = await locals.supabase
		.from('friends')
		.select('*')
		.eq('sessionuserid', session.user.id);

	const { data: pending, error: perr } = await locals.supabase
		.from('friends')
		.select('*')
		.eq('frienduserid', session.user.id);

	let usersTmp = JSON.parse(JSON.stringify(allUsers));

	for (let i = 0; i < friends.length; i++) {
		usersTmp = usersTmp.filter((user: any) => {
			return user.sessionuserid !== friends[i].frienduserid;
		});
	}

	for (let i = 0; i < pending.length; i++) {
		usersTmp = usersTmp.filter((user: any) => {
			return user.sessionuserid !== pending[i].sessionuserid;
		});
	}

	let pendingtmp = pending;

	pendingtmp = pendingtmp.filter((prfilter: any) => {
		return prfilter.friendconfirm === false;
	});

	usersTmp = usersTmp.filter((user: any) => {
		return user.sessionuserid !== session.user.id;
	});

	// let friendsrequests = JSON.parse(JSON.stringify(allUsers));
	// if (friends.length === 0) {
	// 	friendsrequests = [];
	// } else {
	// 	for (let i = 0; i < friends.length; i++) {
	// 		friendsrequests = friendsrequests.filter((user: any) => {
	// 			return user.sessionuserid !== friends[i].frienduserid;
	// 		});
	// 	}
	// }
	// let prrequests = JSON.parse(JSON.stringify(allUsers));

	// for (let i = 0; i < pending.length; i++) {
	// 	prrequests = prrequests.filter((user: any) => {
	// 		return user.sessionuserid === pending[i].sessionuserid;
	// 	});
	// }

	return {
		session,
		users: usersTmp,
		friends: friends,
		pendingRequests: pendingtmp
	};
};

export const actions: Actions = {
	addFriend: async ({ request, locals }) => {
		const session = await locals.getSession();
		const body = await request.formData();
		const frienduserid = body.get('sessionuserid');
		const friendname = body.get('friendusername');
		const friendavatar = body.get('friendavatar');

		const { data: profile, error: errp } = await locals.supabase
			.from('users')
			.select('*')
			.eq('sessionuserid', session.user.id);

		const { data: check, error: errc } = await locals.supabase
			.from('friends')
			.select('*')
			.eq('sessionuserid', frienduserid);

		console.log(check);
		console.log('no check');
		if (check.length > 0) {
			console.log('checkig');
			for (let i = 0; i < check.length; i++) {
				if (check[i].frienduserid === session.user.id) {
					console.log('returned true!');
					throw redirect(303, '/protected_routes/FindFriends');
				}
			}
		}

		const { data: add, error: err } = await locals.supabase.from('friends').insert({
			sessionuserid: session.user.id,
			username: profile[0].username,
			avatar: profile[0].avatar,
			frienduserid: frienduserid,
			friendusername: friendname,
			friendavatar: friendavatar
		});

		return { success: true, friendid: frienduserid };
	},
	acceptFriend: async ({ request, locals }) => {
		const session = await locals.getSession();
		const body = await request.formData();
		const frienduserid = body.get('sessionuserid');
		const friendname = body.get('friendusername');
		const friendavatar = body.get('friendavatar');
		const frienduid = body.get('frienduid');

		const { data: profile, error: errp } = await locals.supabase
			.from('users')
			.select('*')
			.eq('sessionuserid', session.user.id);

		const { data: add, error: err } = await locals.supabase.from('friends').insert({
			sessionuserid: session.user.id,
			username: profile[0].username,
			avatar: profile[0].avatar,
			frienduserid: frienduserid,
			friendusername: friendname,
			friendavatar: friendavatar,
			friendconfirm: true
		});

		const { data: updateFriendid, error: erruf } = await locals.supabase
			.from('friends')
			.update({
				friendconfirm: true
			})
			.eq('friendid', frienduid);

		throw redirect(303, '/protected_routes/FindFriends');
	}
};
