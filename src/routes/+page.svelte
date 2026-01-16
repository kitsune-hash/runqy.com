<script lang="ts">
	// Landing page for runqy - distributed task queue system
</script>

<svelte:head>
	<title>runqy - Distributed Task Queue System</title>
	<meta name="description" content="Server-driven distributed task queue with stateless workers. Process tasks at scale with Redis-backed queues and Python task handlers." />
</svelte:head>

<div class="min-h-screen bg-surface-900">
	<!-- Hero Section -->
	<header class="container mx-auto px-4 py-6">
		<nav class="flex items-center justify-between">
			<div class="text-2xl font-bold text-white">runqy</div>
			<div class="flex gap-4">
				<a href="https://docs.runqy.com" class="btn preset-filled-primary-500">
					Docs
				</a>
				<a href="https://github.com/Publikey/runqy" class="btn preset-outlined-primary-500" target="_blank" rel="noopener">
					GitHub
				</a>
			</div>
		</nav>
	</header>

	<main>
		<!-- Hero -->
		<section class="container mx-auto px-4 py-24 text-center">
			<h1 class="text-5xl md:text-6xl font-bold text-white mb-6">
				Distributed Task Queues,<br />
				<span class="text-primary-500">Simplified</span>
			</h1>
			<p class="text-xl text-surface-300 max-w-2xl mx-auto mb-8">
				Server-driven bootstrap architecture with stateless workers.
				Workers receive all configuration from a central server at startup—no local config needed.
			</p>
			<div class="flex gap-4 justify-center">
				<a href="https://docs.runqy.com" class="btn preset-filled-primary-500 text-lg px-8 py-3">
					Get Started
				</a>
				<a href="#features" class="btn preset-outlined-surface-500 text-lg px-8 py-3">
					Learn More
				</a>
			</div>
		</section>

		<!-- Features -->
		<section id="features" class="container mx-auto px-4 py-24">
			<h2 class="text-3xl font-bold text-white text-center mb-16">Why runqy?</h2>
			<div class="grid md:grid-cols-3 gap-8">
				<div class="card preset-filled-surface-800 p-6">
					<div class="text-4xl mb-4">🚀</div>
					<h3 class="text-xl font-semibold text-white mb-2">Server-Driven Bootstrap</h3>
					<p class="text-surface-300">
						Workers are stateless—they receive Redis credentials, code deployment specs, and task routing from the central server.
					</p>
				</div>
				<div class="card preset-filled-surface-800 p-6">
					<div class="text-4xl mb-4">🐍</div>
					<h3 class="text-xl font-semibold text-white mb-2">Python SDK</h3>
					<p class="text-surface-300">
						Simple decorators for task handling. Use @load for initialization and @task for processing. Clean stdin/stdout protocol.
					</p>
				</div>
				<div class="card preset-filled-surface-800 p-6">
					<div class="text-4xl mb-4">⚡</div>
					<h3 class="text-xl font-semibold text-white mb-2">Redis-Backed</h3>
					<p class="text-surface-300">
						Asynq-compatible Redis key format. Reliable task queuing with pending, active, and result tracking.
					</p>
				</div>
			</div>
		</section>

		<!-- Architecture Overview -->
		<section class="container mx-auto px-4 py-24">
			<h2 class="text-3xl font-bold text-white text-center mb-8">Architecture</h2>
			<div class="max-w-4xl mx-auto">
				<pre class="card preset-filled-surface-800 p-6 text-sm text-surface-200 overflow-x-auto">
{`┌─────────────────────┐    ┌─────────────────┐    ┌───────────────┐
│ runqy-server        │    │     Redis       │    │   Clients     │
│                     │───→│                 │←───│   (enqueue)   │
│ POST /worker/       │    │ - Task queues   │    │               │
│   register          │    │ - Worker state  │    │               │
└─────────────────────┘    └─────────────────┘    └───────────────┘
         │                         ↑
         │ config + deployment     │ dequeue/heartbeat
         ↓                         │
┌──────────────────────────────────────────────────────────────────┐
│                      runqy-worker (Go)                           │
│  1. Register → receive Redis creds + git repo                    │
│  2. Clone deployment code, create virtualenv                     │
│  3. Spawn Python process, wait for ready signal                  │
│  4. Dequeue tasks, forward to Python via stdin/stdout            │
└──────────────────────────────────────────────────────────────────┘`}
				</pre>
			</div>
		</section>

		<!-- Code Example -->
		<section class="container mx-auto px-4 py-24">
			<h2 class="text-3xl font-bold text-white text-center mb-8">Simple Python Tasks</h2>
			<div class="max-w-2xl mx-auto">
				<pre class="card preset-filled-surface-800 p-6 text-sm overflow-x-auto"><code class="text-surface-200">{`from runqy_task import task, load, run

@load
def setup():
    # Runs once at startup
    return {"model": load_my_model()}

@task
def process(payload, ctx):
    # Handles each task
    result = ctx["model"].predict(payload["data"])
    return {"prediction": result}

run()  # Enters stdin/stdout loop`}</code></pre>
			</div>
		</section>
	</main>

	<!-- Footer -->
	<footer class="container mx-auto px-4 py-8 border-t border-surface-700">
		<div class="flex flex-col md:flex-row items-center justify-between gap-4">
			<div class="text-surface-400">
				© 2025 runqy. Distributed task queue system.
			</div>
			<div class="flex gap-6">
				<a href="https://docs.runqy.com" class="text-surface-400 hover:text-white transition-colors">
					Docs
				</a>
				<a href="https://github.com/Publikey/runqy" class="text-surface-400 hover:text-white transition-colors" target="_blank" rel="noopener">
					GitHub
				</a>
			</div>
		</div>
	</footer>
</div>
