import { tasks } from '$lib/data/tasks';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const task = tasks.find((t) => t.name === params.slug);
	if (!task) throw error(404, 'Task not found');
	return { task };
};
