import { writable } from 'svelte/store';

const gridStore = writable<any[]>([]);

export default gridStore;
