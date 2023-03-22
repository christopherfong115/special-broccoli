import { writable } from 'svelte/store';

// export interface MessagesStoreModel<T extends Record<PropertyKey, any>> {
// 	data: T[];
// 	roomid: string;
// }

// export const createMessagesStore = <T extends Record<PropertyKey, any>>(data: T[]) => {
// 	const { subscribe, set, update } = writable<MessagesStoreModel<T>>({
// 		data,
// 		roomid: 'mainchat'
// 	});

// 	return {
// 		subscribe,
// 		set,
// 		update
// 	};
// };

type MsgsAry = {
	msgs: string[];
};

const defaultChatsStore: MsgsAry = {
	msgs: []
};

export const chatStore = writable(defaultChatsStore);
