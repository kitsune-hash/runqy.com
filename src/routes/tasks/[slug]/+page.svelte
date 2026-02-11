<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import { categoryMeta, categoryBgMeta, taskEmojis } from '$lib/types/task';

	let { data } = $props();
	const task = data.task;
	const emoji = taskEmojis[task.name] || '📦';
	const cat = categoryMeta[task.category];
	const catBg = categoryBgMeta[task.category];

	// Simple markdown-like rendering for long_description
	function renderDescription(text: string): string {
		return text
			.replace(/^## (.+)$/gm, '<h3 class="text-lg font-semibold text-white mt-6 mb-2">$1</h3>')
			.replace(/^- \*\*(.+?):\*\* (.+)$/gm, '<li class="ml-4 text-surface-300 text-sm"><strong class="text-white">$1:</strong> $2</li>')
			.replace(/^- (.+)$/gm, '<li class="ml-4 text-surface-300 text-sm">$1</li>')
			.replace(/\n\n/g, '<br/><br/>')
			.replace(/`([^`]+)`/g, '<code class="text-xs bg-surface-800 px-1.5 py-0.5 rounded text-primary-300">$1</code>');
	}

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: task.display_name,
		description: task.description,
		applicationCategory: 'DeveloperApplication',
		operatingSystem: 'Linux',
		offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
	};
</script>

<svelte:head>
	<title>{task.display_name} — runqy Tasks</title>
	<meta name="description" content={task.description} />
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
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

	<main class="container mx-auto px-4 py-8 max-w-4xl">
		<!-- Back -->
		<a href="/tasks" class="inline-flex items-center gap-1 text-sm text-surface-400 hover:text-white transition-colors mb-8">
			← Back to Tasks
		</a>

		<!-- Hero -->
		<div class="mb-10">
			<div class="flex items-center gap-4 mb-4">
				<span class="text-4xl">{emoji}</span>
				<div>
					<h1 class="text-3xl md:text-4xl font-bold text-white">{task.display_name}</h1>
					<span class="text-sm {cat.color}">{cat.emoji} {cat.label}</span>
				</div>
			</div>
			<p class="text-lg text-surface-300">{task.description}</p>

			<!-- Badges row -->
			<div class="flex flex-wrap gap-2 mt-4">
				{#each task.hardware as hw}
					<span class="text-xs px-3 py-1 rounded-full font-medium {hw === 'gpu' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20' : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'}">
						{hw.toUpperCase()}{hw === 'gpu' && task.gpu_required ? ' (required)' : ''}
					</span>
				{/each}
				<span class="text-xs px-3 py-1 rounded-full font-medium {task.mode === 'long_running' ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20' : 'bg-surface-600 text-surface-300 border border-surface-500/20'}">
					{task.mode === 'long_running' ? 'Long-running' : 'One-shot'}
				</span>
				<span class="text-xs px-3 py-1 rounded-full bg-surface-800 text-surface-300 border border-surface-700">
					⚡ {task.avg_latency}
				</span>
				<span class="text-xs px-3 py-1 rounded-full bg-surface-800 text-surface-300 border border-surface-700">
					💾 {task.memory_mb >= 1000 ? `${(task.memory_mb / 1000).toFixed(task.memory_mb % 1000 === 0 ? 0 : 1)}GB` : `${task.memory_mb}MB`} RAM
				</span>
			</div>

			<!-- Tags -->
			<div class="flex flex-wrap gap-1.5 mt-4">
				{#each task.tags as tag}
					<span class="text-xs text-surface-500 bg-surface-800 px-2 py-0.5 rounded">#{tag}</span>
				{/each}
			</div>
		</div>

		<!-- Content grid -->
		<div class="grid md:grid-cols-3 gap-8">
			<!-- Main content (2 cols) -->
			<div class="md:col-span-2 space-y-8">
				<!-- Long description -->
				<section>
					<div class="prose-invert text-surface-300 leading-relaxed">
						{@html renderDescription(task.long_description)}
					</div>
				</section>

				<!-- Use Cases -->
				{#if task.use_cases.length > 0}
					<section>
						<h2 class="text-xl font-semibold text-white mb-3">Use Cases</h2>
						<ul class="space-y-2">
							{#each task.use_cases as uc}
								<li class="flex items-center gap-2 text-surface-300 text-sm">
									<span class="text-primary-400">→</span>
									{uc}
								</li>
							{/each}
						</ul>
					</section>
				{/if}

				<!-- Input/Output Examples -->
				<section>
					<h2 class="text-xl font-semibold text-white mb-3">API Examples</h2>
					<div class="space-y-4">
						<div>
							<h4 class="text-sm font-medium text-surface-400 mb-2 uppercase tracking-wider">Input</h4>
							<pre class="card preset-filled-surface-800 p-4 text-sm overflow-x-auto"><code class="text-surface-200">{task.input_example.trim()}</code></pre>
						</div>
						<div>
							<h4 class="text-sm font-medium text-surface-400 mb-2 uppercase tracking-wider">Output</h4>
							<pre class="card preset-filled-surface-800 p-4 text-sm overflow-x-auto"><code class="text-surface-200">{task.output_example.trim()}</code></pre>
						</div>
					</div>
				</section>
			</div>

			<!-- Sidebar (1 col) -->
			<div class="space-y-6">
				<!-- Models -->
				{#if task.models.length > 0}
					<div class="card preset-outlined-surface-700 p-5">
						<h3 class="text-sm font-medium text-surface-400 mb-3 uppercase tracking-wider">Models</h3>
						<div class="flex flex-wrap gap-1.5">
							{#each task.models as model}
								<span class="text-xs px-2 py-1 rounded {catBg.bg} {cat.color} border {catBg.border}">{model}</span>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Tools -->
				{#if task.tools.length > 0}
					<div class="card preset-outlined-surface-700 p-5">
						<h3 class="text-sm font-medium text-surface-400 mb-3 uppercase tracking-wider">Tools & Libraries</h3>
						<div class="flex flex-wrap gap-1.5">
							{#each task.tools as tool}
								<span class="text-xs px-2 py-1 rounded bg-surface-800 text-surface-300 border border-surface-700">{tool}</span>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Quick Start -->
				<div class="card preset-outlined-surface-700 p-5">
					<h3 class="text-sm font-medium text-surface-400 mb-3 uppercase tracking-wider">Get Started</h3>
					<div class="space-y-3">
						<div>
							<p class="text-xs text-surface-400 mb-1">Install the SDK:</p>
							<code class="text-xs bg-surface-800 px-2 py-1 rounded block text-surface-200">pip install runqy-python</code>
						</div>
						<div>
							<p class="text-xs text-surface-400 mb-1">Clone the task:</p>
							<code class="text-xs bg-surface-800 px-2 py-1 rounded block text-surface-200 break-all">git clone https://github.com/Publikey/runqy-tasks</code>
						</div>
						<div>
							<p class="text-xs text-surface-400 mb-1">queue.yaml:</p>
							<pre class="text-xs bg-surface-800 px-2 py-1.5 rounded text-surface-200 overflow-x-auto"><code>name: {task.name}
mode: {task.mode}
{task.gpu_required ? 'gpu_required: true' : 'hardware: [' + task.hardware.join(', ') + ']'}
memory_mb: {task.memory_mb}</code></pre>
						</div>
						<a href="https://docs.runqy.com/tasks/{task.name}" class="btn preset-filled-primary-500 w-full text-sm mt-2">
							View Full Docs →
						</a>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>
