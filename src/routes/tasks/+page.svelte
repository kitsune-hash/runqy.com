<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import { categoryMeta, categoryBgMeta, taskEmojis } from '$lib/types/task';
	import type { Task } from '$lib/types/task';

	let { data } = $props();

	let search = $state('');
	let activeCategory = $state<'all' | Task['category']>('all');
	let activeHardware = $state<'all' | 'cpu' | 'gpu'>('all');
	let activeMode = $state<'all' | 'long_running' | 'oneshot'>('all');

	let filteredTasks = $derived.by(() => {
		let result = data.tasks;
		if (activeCategory !== 'all') {
			result = result.filter((t) => t.category === activeCategory);
		}
		if (activeHardware !== 'all') {
			result = result.filter((t) => t.hardware.includes(activeHardware));
		}
		if (activeMode !== 'all') {
			result = result.filter((t) => t.mode === activeMode);
		}
		if (search.trim()) {
			const q = search.toLowerCase();
			result = result.filter(
				(t) =>
					t.display_name.toLowerCase().includes(q) ||
					t.description.toLowerCase().includes(q) ||
					t.tags.some((tag) => tag.includes(q))
			);
		}
		return result;
	});

	const categories = [
		{ value: 'all' as const, label: 'All Tasks', count: data.tasks.length },
		{ value: 'ai' as const, label: '🤖 AI / ML', count: data.tasks.filter((t) => t.category === 'ai').length },
		{ value: 'media' as const, label: '🎬 Media', count: data.tasks.filter((t) => t.category === 'media').length },
		{ value: 'data' as const, label: '📊 Data', count: data.tasks.filter((t) => t.category === 'data').length }
	];
</script>

<svelte:head>
	<title>Task Catalog — runqy</title>
	<meta name="description" content="Browse 29+ ready-to-deploy task templates for AI inference, media processing, and data pipelines. Drop-in workers for Runqy." />
</svelte:head>

<div class="min-h-screen bg-surface-900">
	<!-- Header -->
	<header class="container mx-auto px-4 py-6">
		<nav class="flex items-center justify-between">
			<a href="/" class="flex items-center gap-2">
				<Logo size={32} />
				<span class="text-2xl font-bold text-white">runqy</span>
			</a>
			<div class="hidden md:flex items-center gap-6">
				<a href="/#features" class="text-surface-300 hover:text-white transition-colors text-sm">Features</a>
				<a href="/tasks" class="text-white font-medium text-sm">Tasks</a>
				<a href="/benchmarks" class="text-surface-300 hover:text-white transition-colors text-sm">Benchmarks</a>
			</div>
			<div class="flex gap-3">
				<a href="https://docs.runqy.com" class="btn preset-filled-primary-500">Docs</a>
				<a href="https://github.com/Publikey/runqy" class="btn preset-tonal-primary" target="_blank" rel="noopener">GitHub</a>
			</div>
		</nav>
	</header>

	<main class="container mx-auto px-4 py-12">
		<!-- Hero -->
		<div class="text-center mb-12">
			<h1 class="text-4xl md:text-5xl font-bold text-white mb-4">Task Catalog</h1>
			<p class="text-lg text-surface-300 max-w-2xl mx-auto">
				Ready-to-deploy worker templates for common workloads. Pick a task, configure it, run it on your infrastructure.
			</p>
		</div>

		<!-- Filters -->
		<div class="max-w-6xl mx-auto mb-8 space-y-4">
			<!-- Search -->
			<div class="relative max-w-md mx-auto">
				<span class="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400">🔍</span>
				<input
					type="text"
					bind:value={search}
					placeholder="Search tasks..."
					class="w-full pl-10 pr-4 py-2.5 bg-surface-800 border border-surface-700 rounded-lg text-white placeholder-surface-500 focus:outline-none focus:border-primary-500 transition-colors"
				/>
			</div>

			<!-- Category tabs -->
			<div class="flex flex-wrap justify-center gap-2">
				{#each categories as cat}
					<button
						onclick={() => (activeCategory = cat.value)}
						class="px-4 py-2 rounded-lg text-sm font-medium transition-all {activeCategory === cat.value
							? 'bg-primary-500 text-white'
							: 'bg-surface-800 text-surface-300 hover:bg-surface-700 hover:text-white'}"
					>
						{cat.label}
						<span class="ml-1 text-xs opacity-70">{cat.count}</span>
					</button>
				{/each}
			</div>

			<!-- Hardware + Mode filters -->
			<div class="flex flex-wrap justify-center gap-4">
				<div class="flex items-center gap-2">
					<span class="text-xs text-surface-400 uppercase tracking-wider">Hardware:</span>
					{#each [{ value: 'all', label: 'All' }, { value: 'cpu', label: '🟢 CPU' }, { value: 'gpu', label: '🟠 GPU' }] as hw}
						<button
							onclick={() => (activeHardware = hw.value as typeof activeHardware)}
							class="px-3 py-1 rounded text-xs font-medium transition-all {activeHardware === hw.value
								? 'bg-surface-600 text-white'
								: 'bg-surface-800 text-surface-400 hover:text-white'}"
						>
							{hw.label}
						</button>
					{/each}
				</div>
				<div class="flex items-center gap-2">
					<span class="text-xs text-surface-400 uppercase tracking-wider">Mode:</span>
					{#each [{ value: 'all', label: 'All' }, { value: 'long_running', label: 'Long-running' }, { value: 'oneshot', label: 'One-shot' }] as m}
						<button
							onclick={() => (activeMode = m.value as typeof activeMode)}
							class="px-3 py-1 rounded text-xs font-medium transition-all {activeMode === m.value
								? 'bg-surface-600 text-white'
								: 'bg-surface-800 text-surface-400 hover:text-white'}"
						>
							{m.label}
						</button>
					{/each}
				</div>
			</div>
		</div>

		<!-- Results count -->
		<div class="max-w-6xl mx-auto mb-6">
			<p class="text-sm text-surface-400">{filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}</p>
		</div>

		<!-- Task grid -->
		<div class="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5">
			{#each filteredTasks as task (task.name)}
				<a
					href="/tasks/{task.name}"
					class="card preset-outlined-surface-700 p-5 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-200 group block"
				>
					<!-- Header -->
					<div class="flex items-start gap-3 mb-3">
						<span class="text-2xl">{taskEmojis[task.name] || '📦'}</span>
						<div class="flex-1 min-w-0">
							<h3 class="text-base font-semibold text-white group-hover:text-primary-400 transition-colors truncate">
								{task.display_name}
							</h3>
							<span class="text-xs {categoryMeta[task.category].color}">
								{categoryMeta[task.category].label}
							</span>
						</div>
					</div>

					<!-- Description -->
					<p class="text-sm text-surface-300 mb-3 line-clamp-2">{task.description}</p>

					<!-- Badges -->
					<div class="flex flex-wrap gap-1.5 mb-3">
						{#each task.hardware as hw}
							<span class="text-xs px-2 py-0.5 rounded-full {hw === 'gpu' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20' : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'}">
								{hw.toUpperCase()}
							</span>
						{/each}
						<span class="text-xs px-2 py-0.5 rounded-full {task.mode === 'long_running' ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20' : 'bg-surface-600 text-surface-300 border border-surface-500/20'}">
							{task.mode === 'long_running' ? 'Long-running' : 'One-shot'}
						</span>
					</div>

					<!-- Latency -->
					<div class="text-xs text-surface-400">
						⚡ {task.avg_latency}
					</div>

					<!-- Tags -->
					<div class="mt-3 flex flex-wrap gap-1">
						{#each task.tags.slice(0, 4) as tag}
							<span class="text-xs text-surface-500 bg-surface-800 px-1.5 py-0.5 rounded">#{tag}</span>
						{/each}
						{#if task.tags.length > 4}
							<span class="text-xs text-surface-500">+{task.tags.length - 4}</span>
						{/if}
					</div>
				</a>
			{/each}
		</div>

		{#if filteredTasks.length === 0}
			<div class="text-center py-16">
				<p class="text-surface-400 text-lg">No tasks match your filters.</p>
				<button
					onclick={() => { search = ''; activeCategory = 'all'; activeHardware = 'all'; activeMode = 'all'; }}
					class="mt-4 btn preset-tonal-primary text-sm"
				>
					Clear filters
				</button>
			</div>
		{/if}

		<!-- CTA -->
		<div class="text-center mt-16 py-12 border-t border-surface-800">
			<h2 class="text-2xl font-bold text-white mb-3">Don't see what you need?</h2>
			<p class="text-surface-300 mb-6">Every task is just Python. Write your own worker in minutes.</p>
			<div class="flex gap-4 justify-center">
				<a href="https://docs.runqy.com/quickstart" class="btn preset-filled-primary-500">Get Started →</a>
				<a href="https://github.com/Publikey/runqy-tasks" class="btn preset-tonal-primary" target="_blank" rel="noopener">Contribute a Task</a>
			</div>
		</div>
	</main>
</div>
