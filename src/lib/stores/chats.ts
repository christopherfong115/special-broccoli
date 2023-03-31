import { writable } from 'svelte/store';

// export interface MessagesStoreModel<T extends Record<PropertyKey, any>> {
// 	data: T[];
// }

// export const createMessagesStore = <T extends Record<PropertyKey, any>>(data: T[]) => {
// 	const { subscribe, set, update } = writable<MessagesStoreModel<T>>({
// 		data
// 	});

// 	return {
// 		subscribe,
// 		set,
// 		update
// 	};
// };

const chatStore = writable<any[]>([]);

export default chatStore;
