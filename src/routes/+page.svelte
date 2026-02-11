<script lang="ts">
	import ArchitectureDiagram from '$lib/components/diagram/ArchitectureDiagram.svelte';
	import BootstrapDiagram from '$lib/components/diagram/BootstrapDiagram.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import TaskFlowBackground from '$lib/components/TaskFlowBackground.svelte';
</script>

<svelte:head>
	<title>runqy — Open-source distributed task queue for GPU & CPU workloads</title>
	<meta name="description" content="Open-source distributed task queue built in Go. Run workers on your own hardware — from simple batch jobs to GPU-intensive inference. Python SDK, REST API, Redis-backed." />
</svelte:head>

<div class="min-h-screen bg-surface-900">
	<!-- Header -->
	<header class="container mx-auto px-4 py-6">
		<nav class="flex items-center justify-between">
			<div class="flex items-center gap-2">
				<Logo size={32} />
				<span class="text-2xl font-bold text-white">runqy</span>
			</div>
			<div class="hidden md:flex items-center gap-6">
				<a href="#features" class="text-surface-300 hover:text-white transition-colors text-sm">Features</a>
				<a href="#how-it-works" class="text-surface-300 hover:text-white transition-colors text-sm">How it Works</a>
				<a href="#use-cases" class="text-surface-300 hover:text-white transition-colors text-sm">Use Cases</a>
				<a href="/tasks" class="text-surface-300 hover:text-white transition-colors text-sm">Tasks</a>
				<a href="#comparison" class="text-surface-300 hover:text-white transition-colors text-sm">Compare</a>
				<a href="/benchmarks" class="text-surface-300 hover:text-white transition-colors text-sm">Benchmarks</a>
			</div>
			<div class="flex gap-3">
				<a href="https://docs.runqy.com" class="btn preset-filled-primary-500">
					Docs
				</a>
				<a href="https://github.com/Publikey/runqy" class="btn preset-tonal-primary" target="_blank" rel="noopener">
					GitHub
				</a>
			</div>
		</nav>
	</header>

	<main>
		<!-- Hero -->
		<section class="relative overflow-hidden">
			<TaskFlowBackground />

			<div class="relative z-10 container mx-auto px-4 py-28 md:py-36 text-center">
				<div class="inline-block mb-6">
					<span class="text-xs font-medium text-primary-400 bg-primary-500/10 px-3 py-1 rounded-full border border-primary-500/20">
						Open Source · Built in Go · Redis-backed
					</span>
				</div>

				<h1
					class="animate-fade-in-up text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
				>
					Your workers, your machines,<br />
					<span
						class="bg-gradient-to-r from-cyan-400 via-primary-400 to-violet-500 bg-clip-text text-transparent"
					>
						your rules.
					</span>
				</h1>

				<p
					class="animate-fade-in-up text-xl text-surface-300 max-w-2xl mx-auto mb-10"
					style="animation-delay: 200ms;"
				>
					The open-source distributed task queue for GPU and CPU workloads.
					Push tasks via API, Runqy distributes them to your workers — anywhere.
				</p>

				<div class="animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center" style="animation-delay: 400ms;">
					<a
						href="https://docs.runqy.com"
						class="btn preset-filled-primary-500 text-lg px-8 py-3 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-200"
					>
						Get Started →
					</a>
					<a
						href="https://github.com/Publikey/runqy"
						class="btn preset-tonal-primary text-lg px-8 py-3 hover:scale-105 transition-all duration-200"
						target="_blank"
						rel="noopener"
					>
						View on GitHub
					</a>
				</div>

				<!-- Quick install -->
				<div class="animate-fade-in-up mt-8" style="animation-delay: 600ms;">
					<code class="text-sm text-surface-400 bg-surface-800/80 px-4 py-2 rounded-lg border border-surface-700">
						pip install runqy-python
					</code>
				</div>
			</div>
		</section>

		<!-- Social proof / stats bar -->
		<section class="border-y border-surface-700/50 bg-surface-800/20">
			<div class="container mx-auto px-4 py-8">
				<div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
					<div>
						<div class="text-2xl font-bold text-white">~3K</div>
						<div class="text-sm text-surface-400">jobs/s (HTTP API)</div>
					</div>
					<div>
						<div class="text-2xl font-bold text-white">~17K</div>
						<div class="text-sm text-surface-400">jobs/s (batch)</div>
					</div>
					<div>
						<div class="text-2xl font-bold text-white">Go + Redis</div>
						<div class="text-sm text-surface-400">lightweight core</div>
					</div>
					<div>
						<div class="text-2xl font-bold text-white">MIT</div>
						<div class="text-sm text-surface-400">open source</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Problem/Solution -->
		<section class="container mx-auto px-4 py-20">
			<div class="max-w-3xl mx-auto text-center">
				<h2 class="text-3xl font-bold text-white mb-6">Your compute belongs to you. So does your code.</h2>
				<p class="text-lg text-surface-300 mb-6">
					Runqy is a task broker. It receives jobs, distributes them to your workers, and tracks execution.
					The workers run on your machines — with resources you control.
				</p>
				<p class="text-lg text-surface-300">
					Got an RTX 4090 under your desk? Run GPU inference in production.
					A beefy server for CPU-heavy scraping? Add it to the pool.
					Need more capacity? Spin up cloud workers for peak loads.
					<span class="text-primary-400 font-medium">Runqy orchestrates. You stay in control.</span>
				</p>
			</div>
		</section>

		<!-- Features -->
		<section id="features" class="container mx-auto px-4 py-20">
			<div class="text-center mb-16">
				<h2 class="text-3xl font-bold text-white mb-4">Built for real workloads</h2>
				<p class="text-surface-300 max-w-2xl mx-auto">Everything you need to distribute tasks across heterogeneous infrastructure.</p>
			</div>
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
				<div class="card preset-outlined-surface-700 p-6">
					<div class="text-primary-400 text-2xl mb-3">⚡</div>
					<h3 class="text-lg font-semibold text-white mb-2">High throughput</h3>
					<p class="text-surface-300 text-sm">
						~3K jobs/s via HTTP API, ~17K via batch endpoint, ~83K direct Redis.
						Go + Redis core keeps overhead minimal.
					</p>
				</div>
				<div class="card preset-outlined-surface-700 p-6">
					<div class="text-primary-400 text-2xl mb-3">🔄</div>
					<h3 class="text-lg font-semibold text-white mb-2">Zero-touch deployment</h3>
					<p class="text-surface-300 text-sm">
						Workers pull code from GitHub automatically. Push to main, workers update themselves.
						No SSH, no Docker builds, no CI pipelines.
					</p>
				</div>
				<div class="card preset-outlined-surface-700 p-6">
					<div class="text-primary-400 text-2xl mb-3">🖥️</div>
					<h3 class="text-lg font-semibold text-white mb-2">Run anywhere</h3>
					<p class="text-surface-300 text-sm">
						Your desktop GPU, cloud VMs, Vast.ai, Lambda Labs, on-prem servers.
						Mix and match providers in a single pool.
					</p>
				</div>
				<div class="card preset-outlined-surface-700 p-6">
					<div class="text-primary-400 text-2xl mb-3">🐍</div>
					<h3 class="text-lg font-semibold text-white mb-2">Python SDK</h3>
					<p class="text-surface-300 text-sm">
						Two decorators to turn any Python script into a distributed worker.
						No DSL, no config files, no boilerplate.
					</p>
				</div>
				<div class="card preset-outlined-surface-700 p-6">
					<div class="text-primary-400 text-2xl mb-3">🌐</div>
					<h3 class="text-lg font-semibold text-white mb-2">REST API</h3>
					<p class="text-surface-300 text-sm">
						Submit jobs from any language. JSON in, JSON out.
						Batch endpoint for high-volume submissions.
					</p>
				</div>
				<div class="card preset-outlined-surface-700 p-6">
					<div class="text-primary-400 text-2xl mb-3">📡</div>
					<h3 class="text-lg font-semibold text-white mb-2">Callbacks & webhooks</h3>
					<p class="text-surface-300 text-sm">
						Get notified when jobs complete. Stream results via callbacks.
						Perfect for long-running GPU inference tasks.
					</p>
				</div>
				<div class="card preset-outlined-surface-700 p-6">
					<div class="text-primary-400 text-2xl mb-3">⏱️</div>
					<h3 class="text-lg font-semibold text-white mb-2">Flexible timeouts</h3>
					<p class="text-surface-300 text-sm">
						Simple tasks finish fast. GPU jobs get the time they need.
						Configurable per-task timeouts from milliseconds to hours.
					</p>
				</div>
				<div class="card preset-outlined-surface-700 p-6">
					<div class="text-primary-400 text-2xl mb-3">🔒</div>
					<h3 class="text-lg font-semibold text-white mb-2">Self-hosted</h3>
					<p class="text-surface-300 text-sm">
						Your data never leaves your infrastructure. Single Go binary + Redis.
						No vendor lock-in, no SaaS dependency.
					</p>
				</div>
				<div class="card preset-outlined-surface-700 p-6">
					<div class="text-primary-400 text-2xl mb-3">📊</div>
					<h3 class="text-lg font-semibold text-white mb-2">Priority queues</h3>
					<p class="text-surface-300 text-sm">
						Separate urgent jobs from batch processing. Workers pick up
						high-priority tasks first.
					</p>
				</div>
			</div>
		</section>

		<!-- How It Works -->
		<section id="how-it-works" class="container mx-auto px-4 py-20 bg-surface-800/20">
			<h2 class="text-3xl font-bold text-white text-center mb-16">How it works</h2>
			<div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
				<div class="text-center">
					<div class="text-5xl font-bold text-primary-500 mb-4">1</div>
					<h3 class="text-xl font-semibold text-white mb-3">Write your task</h3>
					<p class="text-surface-300">
						Pure Python. No DSL. No config files. Just your code with two decorators.
					</p>
				</div>
				<div class="text-center">
					<div class="text-5xl font-bold text-primary-500 mb-4">2</div>
					<h3 class="text-xl font-semibold text-white mb-3">Push to GitHub</h3>
					<p class="text-surface-300">
						Workers pull your code automatically. They clone, install deps, and signal ready — zero manual deployment.
					</p>
				</div>
				<div class="text-center">
					<div class="text-5xl font-bold text-primary-500 mb-4">3</div>
					<h3 class="text-xl font-semibold text-white mb-3">Enqueue jobs</h3>
					<p class="text-surface-300">
						Via CLI, SDK, or API. Runqy distributes to available workers. Results come back via callback.
					</p>
				</div>
			</div>

			<!-- Code Example inline -->
			<div class="max-w-4xl mx-auto">
				<div class="grid md:grid-cols-2 gap-6">
					<div>
						<h4 class="text-sm font-medium text-surface-400 mb-2 uppercase tracking-wider">Worker (Python)</h4>
						<pre class="card preset-filled-surface-800 p-5 text-sm overflow-x-auto"><code class="text-surface-200">{`from runqy_python import task, load, run

@load
def setup():
    # Runs once at startup
    return {"model": load_my_model()}

@task
def process(payload, ctx):
    result = ctx["model"].predict(
        payload["data"]
    )
    return {"prediction": result}

run()  # Enters the task loop`}</code></pre>
					</div>
					<div>
						<h4 class="text-sm font-medium text-surface-400 mb-2 uppercase tracking-wider">Submit jobs (cURL)</h4>
						<pre class="card preset-filled-surface-800 p-5 text-sm overflow-x-auto"><code class="text-surface-200">{`# Single job
curl -X POST http://localhost:8080/jobs \\
  -H "Content-Type: application/json" \\
  -d '{
    "task": "process",
    "payload": {"data": "hello"},
    "callback_url": "https://..."
  }'

# Batch (up to 17K jobs/s)
curl -X POST http://localhost:8080/batch \\
  -d '{"jobs": [...]}'`}</code></pre>
					</div>
				</div>
			</div>
		</section>

		<!-- Architecture -->
		<section class="container mx-auto px-4 py-20">
			<h2 class="text-3xl font-bold text-white text-center mb-4">Your infra, your way</h2>
			<p class="text-center text-surface-300 mb-12 max-w-2xl mx-auto">
				Mix environments as you see fit. Add workers when you need them. Remove them when it's quiet.
			</p>
			<div class="w-full max-w-7xl mx-auto">
				<ArchitectureDiagram />
			</div>
		</section>

		<!-- Zero-Touch Deployment -->
		<section class="container mx-auto px-4 py-20 bg-surface-800/20">
			<h2 class="text-3xl font-bold text-white text-center mb-4">Zero-touch deployment</h2>
			<p class="text-center text-surface-300 mb-12 max-w-2xl mx-auto">
				Push code to GitHub. Workers deploy themselves. No SSH. No Docker builds. No CI pipelines to maintain.
			</p>
			<div class="w-full max-w-4xl mx-auto">
				<BootstrapDiagram />
			</div>
		</section>

		<!-- Use Cases -->
		<section id="use-cases" class="container mx-auto px-4 py-20">
			<div class="text-center mb-16">
				<h2 class="text-3xl font-bold text-white mb-4">Built for these workloads</h2>
				<p class="text-surface-300 max-w-2xl mx-auto">From quick CPU tasks to hour-long GPU inference, Runqy handles it.</p>
			</div>
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
				<div class="card preset-filled-surface-800 p-6">
					<h3 class="text-lg font-semibold text-white mb-2">🎨 Image Generation</h3>
					<p class="text-surface-300 text-sm mb-3">
						Stable Diffusion, SDXL, Flux. Enqueue a prompt, get an image. Workers process in parallel on your GPUs.
					</p>
					<span class="text-xs text-primary-400">GPU · Long-running · Parallel</span>
				</div>
				<div class="card preset-filled-surface-800 p-6">
					<h3 class="text-lg font-semibold text-white mb-2">🤖 LLM Inference</h3>
					<p class="text-surface-300 text-sm mb-3">
						vLLM, Transformers, llama.cpp. Stream tokens to your app via callbacks. The model runs on your hardware.
					</p>
					<span class="text-xs text-primary-400">GPU · Streaming · Callbacks</span>
				</div>
				<div class="card preset-filled-surface-800 p-6">
					<h3 class="text-lg font-semibold text-white mb-2">🎬 Video Generation</h3>
					<p class="text-surface-300 text-sm mb-3">
						Long-running jobs on your own hardware. Get notified when it's done. No timeout fears.
					</p>
					<span class="text-xs text-primary-400">GPU · Hours-long · Webhooks</span>
				</div>
				<div class="card preset-filled-surface-800 p-6">
					<h3 class="text-lg font-semibold text-white mb-2">🕷️ Web Scraping</h3>
					<p class="text-surface-300 text-sm mb-3">
						Parallel crawling across workers. Scale your scrapers horizontally without managing infrastructure.
					</p>
					<span class="text-xs text-primary-400">CPU · High-volume · Parallel</span>
				</div>
				<div class="card preset-filled-surface-800 p-6">
					<h3 class="text-lg font-semibold text-white mb-2">📊 Data Pipelines</h3>
					<p class="text-surface-300 text-sm mb-3">
						ETL jobs, data transformations, report generation. Offload heavy processing to dedicated workers.
					</p>
					<span class="text-xs text-primary-400">CPU/GPU · Batch · ETL</span>
				</div>
				<div class="card preset-filled-surface-800 p-6">
					<h3 class="text-lg font-semibold text-white mb-2">📦 Batch Processing</h3>
					<p class="text-surface-300 text-sm mb-3">
						Thousands of documents to process? Enqueue them all via the batch endpoint. Workers split the load.
					</p>
					<span class="text-xs text-primary-400">CPU · Batch API · Scale-out</span>
				</div>
			</div>
		</section>

		<!-- Comparison -->
		<section id="comparison" class="container mx-auto px-4 py-20 bg-surface-800/20">
			<div class="text-center mb-16">
				<h2 class="text-3xl font-bold text-white mb-4">How Runqy compares</h2>
				<p class="text-surface-300 max-w-2xl mx-auto">Different tools for different needs. Here's where Runqy fits.</p>
			</div>

			<div class="max-w-5xl mx-auto overflow-x-auto">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-surface-700">
							<th class="text-left text-surface-400 py-3 px-4 font-medium">Feature</th>
							<th class="text-center text-primary-400 py-3 px-4 font-semibold">Runqy</th>
							<th class="text-center text-surface-400 py-3 px-4 font-medium">Celery</th>
							<th class="text-center text-surface-400 py-3 px-4 font-medium">BullMQ</th>
							<th class="text-center text-surface-400 py-3 px-4 font-medium">Temporal</th>
						</tr>
					</thead>
					<tbody class="text-surface-300">
						<tr class="border-b border-surface-800">
							<td class="py-3 px-4">Language</td>
							<td class="text-center py-3 px-4 text-white">Go (broker) + Python SDK</td>
							<td class="text-center py-3 px-4">Python</td>
							<td class="text-center py-3 px-4">Node.js</td>
							<td class="text-center py-3 px-4">Go + multi-lang SDKs</td>
						</tr>
						<tr class="border-b border-surface-800">
							<td class="py-3 px-4">Auto worker deployment</td>
							<td class="text-center py-3 px-4 text-primary-400">✓ Git-based</td>
							<td class="text-center py-3 px-4">✗</td>
							<td class="text-center py-3 px-4">✗</td>
							<td class="text-center py-3 px-4">✗</td>
						</tr>
						<tr class="border-b border-surface-800">
							<td class="py-3 px-4">GPU workloads</td>
							<td class="text-center py-3 px-4 text-primary-400">✓ First-class</td>
							<td class="text-center py-3 px-4">Possible</td>
							<td class="text-center py-3 px-4">Possible</td>
							<td class="text-center py-3 px-4">Possible</td>
						</tr>
						<tr class="border-b border-surface-800">
							<td class="py-3 px-4">Heterogeneous infra</td>
							<td class="text-center py-3 px-4 text-primary-400">✓ Mix providers</td>
							<td class="text-center py-3 px-4">Manual</td>
							<td class="text-center py-3 px-4">Same datacenter</td>
							<td class="text-center py-3 px-4">Manual</td>
						</tr>
						<tr class="border-b border-surface-800">
							<td class="py-3 px-4">Workflow orchestration</td>
							<td class="text-center py-3 px-4">Task queue</td>
							<td class="text-center py-3 px-4">Canvas/chains</td>
							<td class="text-center py-3 px-4">Flows</td>
							<td class="text-center py-3 px-4 text-white">✓ Full workflows</td>
						</tr>
						<tr class="border-b border-surface-800">
							<td class="py-3 px-4">Setup complexity</td>
							<td class="text-center py-3 px-4 text-primary-400">Binary + Redis</td>
							<td class="text-center py-3 px-4">Broker + backend</td>
							<td class="text-center py-3 px-4">Redis</td>
							<td class="text-center py-3 px-4">Complex (DB, ES)</td>
						</tr>
						<tr>
							<td class="py-3 px-4">License</td>
							<td class="text-center py-3 px-4 text-white">MIT</td>
							<td class="text-center py-3 px-4">BSD</td>
							<td class="text-center py-3 px-4">MIT</td>
							<td class="text-center py-3 px-4">MIT</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="text-center mt-8">
				<a href="/benchmarks" class="btn preset-tonal-primary">
					View detailed benchmarks →
				</a>
			</div>
		</section>

		<!-- Integrations -->
		<section class="container mx-auto px-4 py-20">
			<div class="text-center mb-16">
				<h2 class="text-3xl font-bold text-white mb-4">Integrations</h2>
				<p class="text-surface-300 max-w-2xl mx-auto">Submit jobs from anywhere. Workers run Python.</p>
			</div>
			<div class="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
				<div class="card preset-outlined-surface-700 p-6 text-center">
					<div class="text-3xl mb-3">🐍</div>
					<h3 class="text-lg font-semibold text-white mb-2">Python SDK</h3>
					<p class="text-surface-300 text-sm">
						<code class="text-xs bg-surface-800 px-2 py-1 rounded">pip install runqy-python</code>
					</p>
					<p class="text-surface-400 text-xs mt-2">Write workers with decorators. Submit jobs programmatically.</p>
				</div>
				<div class="card preset-outlined-surface-700 p-6 text-center">
					<div class="text-3xl mb-3">🌐</div>
					<h3 class="text-lg font-semibold text-white mb-2">REST API</h3>
					<p class="text-surface-300 text-sm">
						<code class="text-xs bg-surface-800 px-2 py-1 rounded">POST /jobs</code> · <code class="text-xs bg-surface-800 px-2 py-1 rounded">POST /batch</code>
					</p>
					<p class="text-surface-400 text-xs mt-2">JSON-based. Use from any language, any platform.</p>
				</div>
				<div class="card preset-outlined-surface-700 p-6 text-center">
					<div class="text-3xl mb-3">🔴</div>
					<h3 class="text-lg font-semibold text-white mb-2">Redis</h3>
					<p class="text-surface-300 text-sm">
						Battle-tested message broker
					</p>
					<p class="text-surface-400 text-xs mt-2">Lightweight, fast, and familiar. Your queue lives in Redis.</p>
				</div>
			</div>
		</section>

		<!-- Quick Start -->
		<section id="quickstart" class="container mx-auto px-4 py-20 bg-surface-800/20">
			<div class="text-center mb-12">
				<h2 class="text-3xl font-bold text-white mb-4">Get started in 5 minutes</h2>
				<p class="text-surface-300 max-w-xl mx-auto">From zero to distributed task processing.</p>
			</div>
			<div class="max-w-3xl mx-auto space-y-6">
				<div class="flex gap-4 items-start">
					<div class="text-primary-500 font-bold text-lg min-w-8">1.</div>
					<div class="flex-1">
						<h4 class="text-white font-medium mb-2">Start the broker</h4>
						<pre class="card preset-filled-surface-800 p-4 text-sm overflow-x-auto"><code class="text-surface-200">{`# Download the binary (or build from source)
./runqy serve --redis localhost:6379`}</code></pre>
					</div>
				</div>
				<div class="flex gap-4 items-start">
					<div class="text-primary-500 font-bold text-lg min-w-8">2.</div>
					<div class="flex-1">
						<h4 class="text-white font-medium mb-2">Write a worker</h4>
						<pre class="card preset-filled-surface-800 p-4 text-sm overflow-x-auto"><code class="text-surface-200">{`# worker.py
from runqy_python import task, run

@task
def hello(payload, ctx):
    return {"message": f"Hello {payload['name']}!"}

run()`}</code></pre>
					</div>
				</div>
				<div class="flex gap-4 items-start">
					<div class="text-primary-500 font-bold text-lg min-w-8">3.</div>
					<div class="flex-1">
						<h4 class="text-white font-medium mb-2">Submit a job</h4>
						<pre class="card preset-filled-surface-800 p-4 text-sm overflow-x-auto"><code class="text-surface-200">{`curl -X POST http://localhost:8080/jobs \\
  -H "Content-Type: application/json" \\
  -d '{"task": "hello", "payload": {"name": "world"}}'`}</code></pre>
					</div>
				</div>
			</div>
			<div class="text-center mt-10">
				<a href="https://docs.runqy.com/quickstart" class="btn preset-filled-primary-500 text-lg px-8 py-3">
					Full Quickstart Guide →
				</a>
			</div>
		</section>

		<!-- Why Open Source -->
		<section class="container mx-auto px-4 py-20">
			<div class="max-w-4xl mx-auto">
				<div class="grid md:grid-cols-2 gap-12 items-center">
					<div>
						<h2 class="text-3xl font-bold text-white mb-6">Why open source?</h2>
						<div class="space-y-4">
							<div class="flex gap-3 items-start">
								<span class="text-primary-400">→</span>
								<div>
									<h4 class="text-white font-medium">No vendor lock-in</h4>
									<p class="text-surface-400 text-sm">Your task queue shouldn't depend on a SaaS surviving. Self-host forever.</p>
								</div>
							</div>
							<div class="flex gap-3 items-start">
								<span class="text-primary-400">→</span>
								<div>
									<h4 class="text-white font-medium">Transparent performance</h4>
									<p class="text-surface-400 text-sm">Read the code, run the benchmarks, verify the claims yourself.</p>
								</div>
							</div>
							<div class="flex gap-3 items-start">
								<span class="text-primary-400">→</span>
								<div>
									<h4 class="text-white font-medium">Community-driven</h4>
									<p class="text-surface-400 text-sm">File issues, submit PRs, shape the roadmap. Built in the open.</p>
								</div>
							</div>
							<div class="flex gap-3 items-start">
								<span class="text-primary-400">→</span>
								<div>
									<h4 class="text-white font-medium">No per-task pricing</h4>
									<p class="text-surface-400 text-sm">Run as many jobs as you want. Your hardware, your costs.</p>
								</div>
							</div>
						</div>
					</div>
					<div class="card preset-outlined-surface-700 p-8 text-center">
						<div class="text-6xl mb-4">🔓</div>
						<h3 class="text-xl font-bold text-white mb-2">MIT Licensed</h3>
						<p class="text-surface-300 text-sm mb-6">Use it however you want. Commercial, personal, modified — no restrictions.</p>
						<a href="https://github.com/Publikey/runqy" class="btn preset-tonal-primary" target="_blank" rel="noopener">
							Star on GitHub ⭐
						</a>
					</div>
				</div>
			</div>
		</section>

		<!-- CTA -->
		<section class="container mx-auto px-4 py-24 text-center bg-surface-800/20">
			<h2 class="text-3xl font-bold text-white mb-6">Ready to distribute your workloads?</h2>
			<p class="text-lg text-surface-300 mb-4 max-w-xl mx-auto">
				Install the SDK. Write your worker. Run it on your machine. Enqueue your first job.
			</p>
			<p class="text-xl text-primary-400 mb-8 font-medium">Your workers, your machines, your rules.</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a href="https://docs.runqy.com" class="btn preset-filled-primary-500 text-lg px-8 py-3">
					Read the Docs
				</a>
				<a href="https://github.com/Publikey/runqy" class="btn preset-tonal-primary text-lg px-8 py-3" target="_blank" rel="noopener">
					View on GitHub
				</a>
			</div>
		</section>
	</main>

	<!-- Footer -->
	<footer class="border-t border-surface-700">
		<div class="container mx-auto px-4 py-12">
			<div class="grid md:grid-cols-4 gap-8 mb-8">
				<div>
					<div class="flex items-center gap-2 mb-4">
						<Logo size={24} />
						<span class="text-lg font-bold text-white">runqy</span>
					</div>
					<p class="text-surface-400 text-sm">
						Open-source distributed task queue built in Go. MIT licensed.
					</p>
				</div>
				<div>
					<h4 class="text-white font-medium mb-3 text-sm">Product</h4>
					<div class="space-y-2">
						<a href="#features" class="block text-surface-400 hover:text-white transition-colors text-sm">Features</a>
						<a href="/tasks" class="block text-surface-400 hover:text-white transition-colors text-sm">Tasks</a>
						<a href="/benchmarks" class="block text-surface-400 hover:text-white transition-colors text-sm">Benchmarks</a>
						<a href="#use-cases" class="block text-surface-400 hover:text-white transition-colors text-sm">Use Cases</a>
						<a href="#comparison" class="block text-surface-400 hover:text-white transition-colors text-sm">Compare</a>
					</div>
				</div>
				<div>
					<h4 class="text-white font-medium mb-3 text-sm">Resources</h4>
					<div class="space-y-2">
						<a href="https://docs.runqy.com" class="block text-surface-400 hover:text-white transition-colors text-sm">Documentation</a>
						<a href="https://docs.runqy.com/quickstart" class="block text-surface-400 hover:text-white transition-colors text-sm">Quickstart</a>
						<a href="https://docs.runqy.com/api" class="block text-surface-400 hover:text-white transition-colors text-sm">API Reference</a>
					</div>
				</div>
				<div>
					<h4 class="text-white font-medium mb-3 text-sm">Community</h4>
					<div class="space-y-2">
						<a href="https://github.com/Publikey/runqy" class="block text-surface-400 hover:text-white transition-colors text-sm" target="_blank" rel="noopener">GitHub</a>
						<a href="https://github.com/Publikey/runqy/issues" class="block text-surface-400 hover:text-white transition-colors text-sm" target="_blank" rel="noopener">Issues</a>
						<a href="https://github.com/Publikey/runqy/discussions" class="block text-surface-400 hover:text-white transition-colors text-sm" target="_blank" rel="noopener">Discussions</a>
					</div>
				</div>
			</div>
			<div class="border-t border-surface-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
				<div class="text-surface-500 text-sm">
					© 2025 runqy. Open-source distributed task queue. MIT License.
				</div>
				<div class="flex gap-6">
					<a href="https://github.com/Publikey/runqy" class="text-surface-500 hover:text-white transition-colors text-sm" target="_blank" rel="noopener">
						GitHub
					</a>
				</div>
			</div>
		</div>
	</footer>
</div>
