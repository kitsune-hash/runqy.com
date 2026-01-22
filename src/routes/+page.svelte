<script lang="ts">
	import ArchitectureDiagram from '$lib/components/diagram/ArchitectureDiagram.svelte';
	import BootstrapDiagram from '$lib/components/diagram/BootstrapDiagram.svelte';
	import Logo from '$lib/components/Logo.svelte';
</script>

<svelte:head>
	<title>runqy - Your workers, your machines, your rules</title>
	<meta name="description" content="Open-source distributed task queue. Run workers on your own hardware—from simple batch jobs to GPU-intensive inference. You control the compute." />
</svelte:head>

<div class="min-h-screen bg-surface-900">
	<!-- Header -->
	<header class="container mx-auto px-4 py-6">
		<nav class="flex items-center justify-between">
			<div class="flex items-center gap-2">
				<Logo size={32} />
				<span class="text-2xl font-bold text-white">runqy</span>
			</div>
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

	<main>
		<!-- Hero -->
		<section class="container mx-auto px-4 py-24 text-center">
			<h1 class="text-5xl md:text-6xl font-bold text-white mb-6">
				Your workers, your machines,<br />
				<span class="text-primary-500">your rules.</span>
			</h1>
			<p class="text-xl text-surface-300 max-w-2xl mx-auto mb-8">
				The open-source distributed task queue.
				From simple scripts to GPU-intensive inference—your workers handle it all.
				Runqy distributes the tasks.
			</p>
			<div class="flex gap-4 justify-center">
				<a href="https://docs.runqy.com" class="btn preset-filled-primary-500 text-lg px-8 py-3">
					Get Started
				</a>
				<a href="https://github.com/Publikey/runqy" class="btn preset-tonal-primary text-lg px-8 py-3" target="_blank" rel="noopener">
					View on GitHub
				</a>
			</div>
		</section>

		<!-- Problem/Solution -->
		<section class="container mx-auto px-4 py-16">
			<div class="max-w-3xl mx-auto text-center">
				<h2 class="text-3xl font-bold text-white mb-6">Your compute belongs to you. So does your code.</h2>
				<p class="text-lg text-surface-300 mb-6">
					Runqy is a task broker. It receives jobs, distributes them to your workers, and tracks execution.
					The workers run on your machines—with resources you control.
				</p>
				<p class="text-lg text-surface-300">
					Got an RTX 4090 under your desk? Run GPU inference in production.
					A beefy server for CPU-heavy scraping? Add it to the pool.
					Need more capacity? Spin up cloud workers for peak loads.
					<span class="text-primary-400">Runqy orchestrates. You stay in control.</span>
				</p>
			</div>
		</section>

		<!-- How It Works -->
		<section id="how-it-works" class="container mx-auto px-4 py-24">
			<h2 class="text-3xl font-bold text-white text-center mb-16">How it works</h2>
			<div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
						Workers pull your code automatically. They clone, install deps, and signal ready—zero manual deployment.
					</p>
				</div>
				<div class="text-center">
					<div class="text-5xl font-bold text-primary-500 mb-4">3</div>
					<h3 class="text-xl font-semibold text-white mb-3">Enqueue jobs</h3>
					<p class="text-surface-300">
						Via SDK or API. Runqy distributes to available workers. Results come back via callback.
					</p>
				</div>
			</div>
		</section>

		<!-- Zero-Touch Deployment -->
		<section class="container mx-auto px-4 py-24 bg-surface-800/30">
			<h2 class="text-3xl font-bold text-white text-center mb-4">Zero-touch deployment</h2>
			<p class="text-center text-surface-300 mb-12 max-w-2xl mx-auto">
				Push code to GitHub. Workers deploy themselves. No SSH. No Docker builds. No CI pipelines to maintain.
			</p>
			<div class="w-full max-w-4xl mx-auto">
				<BootstrapDiagram />
			</div>
		</section>

		<!-- Architecture -->
		<section class="container mx-auto px-4 py-24">
			<h2 class="text-3xl font-bold text-white text-center mb-4">Your infra, your way</h2>
			<p class="text-center text-surface-300 mb-12 max-w-2xl mx-auto">
				Mix environments as you see fit. Add workers when you need them. Remove them when it's quiet.
			</p>
			<div class="w-full max-w-7xl mx-auto">
				<ArchitectureDiagram />
			</div>
		</section>

		<!-- Use Cases -->
		<section class="container mx-auto px-4 py-24">
			<h2 class="text-3xl font-bold text-white text-center mb-16">Use cases</h2>
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
				<div class="card preset-filled-surface-800 p-6">
					<h3 class="text-lg font-semibold text-white mb-2">Image Generation</h3>
					<p class="text-surface-300 text-sm">
						Stable Diffusion, SDXL, Flux. Enqueue a prompt, get an image. Workers process in parallel on your machines.
					</p>
				</div>
				<div class="card preset-filled-surface-800 p-6">
					<h3 class="text-lg font-semibold text-white mb-2">LLM Inference</h3>
					<p class="text-surface-300 text-sm">
						vLLM, Transformers, llama.cpp. Stream tokens to your app via callbacks. The model runs on your hardware.
					</p>
				</div>
				<div class="card preset-filled-surface-800 p-6">
					<h3 class="text-lg font-semibold text-white mb-2">Video Generation</h3>
					<p class="text-surface-300 text-sm">
						Long-running jobs on your own hardware. Get notified when it's done.
					</p>
				</div>
				<div class="card preset-filled-surface-800 p-6">
					<h3 class="text-lg font-semibold text-white mb-2">Web Scraping</h3>
					<p class="text-surface-300 text-sm">
						Parallel crawling across workers. Scale your scrapers horizontally without managing infrastructure.
					</p>
				</div>
				<div class="card preset-filled-surface-800 p-6">
					<h3 class="text-lg font-semibold text-white mb-2">Data Pipelines</h3>
					<p class="text-surface-300 text-sm">
						ETL jobs, data transformations, report generation. Offload heavy processing to dedicated workers.
					</p>
				</div>
				<div class="card preset-filled-surface-800 p-6">
					<h3 class="text-lg font-semibold text-white mb-2">Batch Processing</h3>
					<p class="text-surface-300 text-sm">
						Thousands of documents to process? Enqueue them all, workers split the load.
					</p>
				</div>
			</div>
		</section>

		<!-- Benefits -->
		<section class="container mx-auto px-4 py-24">
			<h2 class="text-3xl font-bold text-white text-center mb-16">What this changes</h2>
			<div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
				<div class="flex gap-4">
					<div class="text-primary-500 text-2xl">$</div>
					<div>
						<h3 class="text-lg font-semibold text-white mb-2">Free and open source</h3>
						<p class="text-surface-300">
							No vendor fees. No per-task pricing. Self-host the broker, run workers on your own machines.
						</p>
					</div>
				</div>
				<div class="flex gap-4">
					<div class="text-primary-500 text-2xl">+</div>
					<div>
						<h3 class="text-lg font-semibold text-white mb-2">Use hardware you already have</h3>
						<p class="text-surface-300">
							Your gaming GPU, your lab server, your render machine. Anything can become a Runqy worker.
						</p>
					</div>
				</div>
				<div class="flex gap-4">
					<div class="text-primary-500 text-2xl">&uarr;</div>
					<div>
						<h3 class="text-lg font-semibold text-white mb-2">Mix and match providers</h3>
						<p class="text-surface-300">
							Your local machine, on-prem servers, cheap GPUs on Lambda, burst capacity on AWS. Mix providers freely, find the best price.
						</p>
					</div>
				</div>
				<div class="flex gap-4">
					<div class="text-primary-500 text-2xl">&harr;</div>
					<div>
						<h3 class="text-lg font-semibold text-white mb-2">Zero migration pain</h3>
						<p class="text-surface-300">
							Switching cloud providers? Moving in-house? Your workers move, your code stays the same.
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Built for real workloads -->
		<section class="container mx-auto px-4 py-24 bg-surface-800/30">
			<div class="max-w-3xl mx-auto text-center">
				<h2 class="text-3xl font-bold text-white mb-6">Built for real workloads</h2>
				<p class="text-lg text-surface-300 mb-8">
					Simple CPU tasks finish fast. Complex GPU jobs get the time they need.
					Long timeouts for slow generations. Callback support for streaming.
					Priority queues to separate urgent jobs from batch.
				</p>
				<p class="text-surface-400">
					Whether your job takes 500ms or 10 minutes, Runqy handles it.
				</p>
			</div>
		</section>

		<!-- Code Example -->
		<section class="container mx-auto px-4 py-24">
			<h2 class="text-3xl font-bold text-white text-center mb-4">Pure Python. Code-first.</h2>
			<p class="text-center text-surface-300 mb-8 max-w-xl mx-auto">
				Two decorators. One function call. That's all it takes to turn your Python into a distributed worker.
			</p>
			<div class="max-w-2xl mx-auto">
				<pre class="card preset-filled-surface-800 p-6 text-sm overflow-x-auto"><code class="text-surface-200">{`from runqy_task import task, load, run

@load
def setup():
    # Runs once at startup (load your model here)
    return {"model": load_my_model()}

@task
def process(payload, ctx):
    # Handles each task
    result = ctx["model"].predict(payload["data"])
    return {"prediction": result}

run()  # Enters the task loop`}</code></pre>
			</div>
		</section>

		<!-- CTA -->
		<section class="container mx-auto px-4 py-24 text-center">
			<h2 class="text-3xl font-bold text-white mb-6">Get started</h2>
			<p class="text-lg text-surface-300 mb-8 max-w-xl mx-auto">
				Install the SDK. Write your worker. Run it on your machine. Enqueue your first job.
			</p>
			<p class="text-xl text-primary-400 mb-8">Your workers, your machines, your rules.</p>
			<div class="flex gap-4 justify-center">
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
	<footer class="container mx-auto px-4 py-8 border-t border-surface-700">
		<div class="flex flex-col md:flex-row items-center justify-between gap-4">
			<div class="text-surface-400">
				© 2025 runqy. Open-source distributed task queue.
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
