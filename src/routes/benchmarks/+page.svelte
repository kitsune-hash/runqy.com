<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	
	// Benchmark data
	const benchmarkData = {
		labels: ['1K Jobs', '10K Jobs', '50K Jobs'],
		datasets: {
			throughput: {
				runqy: [867, 888, 824],
				celery: [1049, 1073, 1088],
				bullmq: [9804, 16978, 24178]
			},
			latencyP99: {
				runqy: [22.12, 112.80, 251.15],
				celery: [81.61, 260.80, 564.93],
				bullmq: [24.47, 6.60, 9.34]
			}
		}
	};

	// Colors
	const colors = {
		runqy: '#06b6d4', // cyan
		celery: '#22c55e', // green  
		bullmq: '#f59e0b'  // amber
	};

	// Calculate bar widths for throughput (log scale for visibility)
	function getBarWidth(value: number, max: number): number {
		return Math.max(5, (Math.log10(value + 1) / Math.log10(max + 1)) * 100);
	}

	const maxThroughput = 25000;
	const maxLatency = 600;
</script>

<svelte:head>
	<title>Benchmarks — runqy</title>
	<meta name="description" content="Performance benchmarks comparing Runqy with Celery and BullMQ task queues." />
</svelte:head>

<div class="min-h-screen bg-surface-900">
	<!-- Header -->
	<header class="container mx-auto px-4 py-6">
		<nav class="flex items-center justify-between">
			<a href="/" class="flex items-center gap-2">
				<Logo size={32} />
				<span class="text-2xl font-bold text-white">runqy</span>
			</a>
			<div class="flex gap-4">
				<a href="https://docs.runqy.com" class="btn preset-filled-primary-500">
					Docs
				</a>
				<a href="https://github.com/Publikey/runqy" class="btn preset-tonal-primary" target="_blank" rel="noopener">
					GitHub
				</a>
			</div>
		</nav>
	</header>

	<main class="container mx-auto px-4 py-12">
		<!-- Hero -->
		<div class="text-center mb-16">
			<h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
				Performance Benchmarks
			</h1>
			<p class="text-xl text-surface-300 max-w-2xl mx-auto">
				Transparent, reproducible benchmarks comparing Runqy with other popular task queue systems.
			</p>
		</div>

		<!-- Important Context -->
		<div class="bg-surface-800/50 rounded-xl p-6 mb-12 border border-surface-700">
			<h3 class="text-lg font-semibold text-cyan-400 mb-2">📊 What We're Measuring</h3>
			<p class="text-surface-300">
				These benchmarks measure <strong class="text-white">job submission (enqueue) throughput</strong> — 
				how fast jobs can be added to the queue. This is different from job processing speed, 
				which depends on your worker implementation.
			</p>
			<p class="text-surface-400 mt-2 text-sm">
				For ML/GPU workloads where job processing takes minutes, enqueue speed is rarely the bottleneck. 
				Runqy optimizes for <em>worker deployment flexibility</em> over raw enqueue throughput.
			</p>
		</div>

		<!-- Throughput Chart -->
		<section class="mb-16">
			<h2 class="text-2xl font-bold text-white mb-6">Throughput (jobs/second)</h2>
			<p class="text-surface-400 mb-6">Higher is better. Log scale for visibility.</p>
			
			<div class="space-y-8">
				{#each benchmarkData.labels as label, i}
					<div class="bg-surface-800/30 rounded-lg p-4">
						<h4 class="text-surface-300 mb-4 font-medium">{label}</h4>
						
						<div class="space-y-3">
							<!-- Runqy -->
							<div class="flex items-center gap-4">
								<span class="w-20 text-sm text-surface-400">Runqy</span>
								<div class="flex-1 bg-surface-700 rounded-full h-6 overflow-hidden">
									<div 
										class="h-full rounded-full flex items-center justify-end pr-2 text-xs font-medium text-white"
										style="width: {getBarWidth(benchmarkData.datasets.throughput.runqy[i], maxThroughput)}%; background-color: {colors.runqy}"
									>
										{benchmarkData.datasets.throughput.runqy[i].toLocaleString()}
									</div>
								</div>
							</div>
							
							<!-- Celery -->
							<div class="flex items-center gap-4">
								<span class="w-20 text-sm text-surface-400">Celery</span>
								<div class="flex-1 bg-surface-700 rounded-full h-6 overflow-hidden">
									<div 
										class="h-full rounded-full flex items-center justify-end pr-2 text-xs font-medium text-white"
										style="width: {getBarWidth(benchmarkData.datasets.throughput.celery[i], maxThroughput)}%; background-color: {colors.celery}"
									>
										{benchmarkData.datasets.throughput.celery[i].toLocaleString()}
									</div>
								</div>
							</div>
							
							<!-- BullMQ -->
							<div class="flex items-center gap-4">
								<span class="w-20 text-sm text-surface-400">BullMQ</span>
								<div class="flex-1 bg-surface-700 rounded-full h-6 overflow-hidden">
									<div 
										class="h-full rounded-full flex items-center justify-end pr-2 text-xs font-medium text-white"
										style="width: {getBarWidth(benchmarkData.datasets.throughput.bullmq[i], maxThroughput)}%; background-color: {colors.bullmq}"
									>
										{benchmarkData.datasets.throughput.bullmq[i].toLocaleString()}
									</div>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Latency Chart -->
		<section class="mb-16">
			<h2 class="text-2xl font-bold text-white mb-6">P99 Latency (milliseconds)</h2>
			<p class="text-surface-400 mb-6">Lower is better. 99th percentile response time.</p>
			
			<div class="space-y-8">
				{#each benchmarkData.labels as label, i}
					<div class="bg-surface-800/30 rounded-lg p-4">
						<h4 class="text-surface-300 mb-4 font-medium">{label}</h4>
						
						<div class="space-y-3">
							<!-- Runqy -->
							<div class="flex items-center gap-4">
								<span class="w-20 text-sm text-surface-400">Runqy</span>
								<div class="flex-1 bg-surface-700 rounded-full h-6 overflow-hidden">
									<div 
										class="h-full rounded-full flex items-center justify-end pr-2 text-xs font-medium text-white"
										style="width: {(benchmarkData.datasets.latencyP99.runqy[i] / maxLatency) * 100}%; background-color: {colors.runqy}"
									>
										{benchmarkData.datasets.latencyP99.runqy[i].toFixed(1)}ms
									</div>
								</div>
							</div>
							
							<!-- Celery -->
							<div class="flex items-center gap-4">
								<span class="w-20 text-sm text-surface-400">Celery</span>
								<div class="flex-1 bg-surface-700 rounded-full h-6 overflow-hidden">
									<div 
										class="h-full rounded-full flex items-center justify-end pr-2 text-xs font-medium text-white"
										style="width: {Math.min((benchmarkData.datasets.latencyP99.celery[i] / maxLatency) * 100, 100)}%; background-color: {colors.celery}"
									>
										{benchmarkData.datasets.latencyP99.celery[i].toFixed(1)}ms
									</div>
								</div>
							</div>
							
							<!-- BullMQ -->
							<div class="flex items-center gap-4">
								<span class="w-20 text-sm text-surface-400">BullMQ</span>
								<div class="flex-1 bg-surface-700 rounded-full h-6 overflow-hidden">
									<div 
										class="h-full rounded-full flex items-center justify-end pr-2 text-xs font-medium text-white"
										style="width: {(benchmarkData.datasets.latencyP99.bullmq[i] / maxLatency) * 100}%; background-color: {colors.bullmq}"
									>
										{benchmarkData.datasets.latencyP99.bullmq[i].toFixed(1)}ms
									</div>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Analysis -->
		<section class="mb-16">
			<h2 class="text-2xl font-bold text-white mb-6">Analysis</h2>
			
			<div class="grid md:grid-cols-3 gap-6">
				<div class="bg-surface-800/50 rounded-xl p-6 border border-cyan-500/30">
					<div class="flex items-center gap-2 mb-3">
						<div class="w-3 h-3 rounded-full" style="background-color: {colors.runqy}"></div>
						<h3 class="font-semibold text-white">Runqy</h3>
					</div>
					<p class="text-surface-300 text-sm">
						Consistent latency under load. HTTP-based API adds overhead but enables 
						remote worker bootstrapping and cross-cloud deployments.
					</p>
				</div>
				
				<div class="bg-surface-800/50 rounded-xl p-6 border border-green-500/30">
					<div class="flex items-center gap-2 mb-3">
						<div class="w-3 h-3 rounded-full" style="background-color: {colors.celery}"></div>
						<h3 class="font-semibold text-white">Celery</h3>
					</div>
					<p class="text-surface-300 text-sm">
						Mature Python ecosystem. Good throughput but P99 latency increases 
						significantly under load due to task serialization.
					</p>
				</div>
				
				<div class="bg-surface-800/50 rounded-xl p-6 border border-amber-500/30">
					<div class="flex items-center gap-2 mb-3">
						<div class="w-3 h-3 rounded-full" style="background-color: {colors.bullmq}"></div>
						<h3 class="font-semibold text-white">BullMQ</h3>
					</div>
					<p class="text-surface-300 text-sm">
						Fastest raw throughput using native Redis pipelines. 
						Great for high-volume, same-datacenter workloads.
					</p>
				</div>
			</div>
		</section>

		<!-- When to use Runqy -->
		<section class="mb-16">
			<h2 class="text-2xl font-bold text-white mb-6">When to Choose Runqy</h2>
			
			<div class="bg-gradient-to-r from-cyan-500/10 to-violet-500/10 rounded-xl p-8 border border-cyan-500/20">
				<p class="text-surface-200 mb-4">
					Runqy isn't trying to win enqueue speed benchmarks. It's designed for workloads where:
				</p>
				<ul class="space-y-2 text-surface-300">
					<li class="flex items-start gap-2">
						<span class="text-cyan-400">→</span>
						<span>Job processing takes <strong class="text-white">minutes to hours</strong> (ML training, video encoding, GPU inference)</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="text-cyan-400">→</span>
						<span>Workers run on <strong class="text-white">your own hardware</strong> — cloud GPUs, on-prem servers, Vast.ai</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="text-cyan-400">→</span>
						<span>You need <strong class="text-white">automatic code deployment</strong> to workers via git</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="text-cyan-400">→</span>
						<span>Workers may be <strong class="text-white">ephemeral or preemptible</strong> (spot instances, serverless GPUs)</span>
					</li>
				</ul>
			</div>
		</section>

		<!-- Methodology -->
		<section class="mb-16">
			<h2 class="text-2xl font-bold text-white mb-6">Methodology</h2>
			
			<div class="bg-surface-800/30 rounded-xl p-6">
				<div class="grid md:grid-cols-2 gap-8">
					<div>
						<h4 class="font-semibold text-white mb-3">Test Environment</h4>
						<ul class="text-surface-400 text-sm space-y-1">
							<li>• Ubuntu Linux (local development machine)</li>
							<li>• Redis 7.x (localhost)</li>
							<li>• Runqy v0.2.x, Celery 5.4.x, BullMQ 5.x</li>
							<li>• Concurrent submissions: 10-100 threads</li>
						</ul>
					</div>
					<div>
						<h4 class="font-semibold text-white mb-3">What We Measured</h4>
						<ul class="text-surface-400 text-sm space-y-1">
							<li>• Round-trip time from client to queue confirmation</li>
							<li>• Throughput: jobs submitted per second</li>
							<li>• Latency percentiles: P50, P95, P99</li>
							<li>• Error rate (all tests: 0%)</li>
						</ul>
					</div>
				</div>
				
				<div class="mt-6 pt-6 border-t border-surface-700">
					<p class="text-surface-400 text-sm">
						Benchmark code is open source. 
						<a href="https://github.com/Publikey/runqy-benchmarks" class="text-cyan-400 hover:underline">
							View on GitHub →
						</a>
					</p>
				</div>
			</div>
		</section>

		<!-- CTA -->
		<section class="text-center">
			<h2 class="text-2xl font-bold text-white mb-4">Ready to try Runqy?</h2>
			<p class="text-surface-300 mb-6">Get started in minutes with our quickstart guide.</p>
			<a href="https://docs.runqy.com/quickstart" class="btn preset-filled-primary-500 text-lg px-8">
				Get Started →
			</a>
		</section>
	</main>

	<!-- Footer -->
	<footer class="container mx-auto px-4 py-12 mt-12 border-t border-surface-800">
		<div class="flex justify-between items-center text-surface-500 text-sm">
			<span>© 2026 Runqy. Open source under MIT license.</span>
			<a href="/" class="hover:text-white">← Back to home</a>
		</div>
	</footer>
</div>

<!-- Styles handled by Skeleton UI -->
