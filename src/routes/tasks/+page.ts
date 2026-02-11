import { tasks } from '$lib/data/tasks';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return { tasks };
};
