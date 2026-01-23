<script lang="ts">
	import { onMount } from 'svelte';

	// Logo colors
	const colors = {
		hub: { r: 59, g: 130, b: 246 }, // #3B82F6 - blue
		line: { r: 100, g: 116, b: 139 }, // #64748B - slate
		worker: { r: 226, g: 232, b: 240 } // #E2E8F0 - white/light
	};

	interface Task {
		id: number;
		path: number;
		progress: number;
		size: number;
		speed: number;
		arrived: boolean;
		arrivalTime: number;
	}

	interface Endpoint {
		x: number;
		y: number;
		size: number;
		pulseDelay: number;
		processing: boolean;
		lastProcessTime: number;
	}

	let tasks: Task[] = $state([]);
	let endpoints: Endpoint[] = $state([
		{ x: 88, y: 12, size: 1.2, pulseDelay: 0, processing: false, lastProcessTime: 0 },
		{ x: 92, y: 30, size: 1.0, pulseDelay: 0.5, processing: false, lastProcessTime: 0 },
		{ x: 85, y: 48, size: 1.4, pulseDelay: 1.0, processing: false, lastProcessTime: 0 },
		{ x: 94, y: 68, size: 0.9, pulseDelay: 1.5, processing: false, lastProcessTime: 0 },
		{ x: 87, y: 88, size: 1.1, pulseDelay: 2.0, processing: false, lastProcessTime: 0 }
	]);
	let mounted = $state(false);
	let container: HTMLDivElement;

	// Hub position
	const hub = { x: 8, y: 50 };

	// Create paths from hub to each endpoint
	const paths = endpoints.map((ep) => ({
		startX: hub.x,
		startY: hub.y,
		endX: ep.x,
		endY: ep.y,
		curve: (ep.y - hub.y) * 0.4
	}));

	function getPathD(path: (typeof paths)[0]) {
		const controlX = (path.startX + path.endX) / 2;
		const controlY = path.startY + path.curve;
		return `M ${path.startX} ${path.startY} Q ${controlX} ${controlY} ${path.endX} ${path.endY}`;
	}

	function getPositionOnPath(pathIndex: number, progress: number) {
		const path = paths[pathIndex];
		const t = Math.min(progress, 100) / 100;

		const controlX = (path.startX + path.endX) / 2;
		const controlY = path.startY + path.curve;

		const x = (1 - t) * (1 - t) * path.startX + 2 * (1 - t) * t * controlX + t * t * path.endX;
		const y = (1 - t) * (1 - t) * path.startY + 2 * (1 - t) * t * controlY + t * t * path.endY;

		return { x, y };
	}

	onMount(() => {
		mounted = true;

		let id = 0;
		const initialTasks: Task[] = [];

		for (let i = 0; i < 12; i++) {
			initialTasks.push({
				id: id++,
				path: Math.floor(Math.random() * 5),
				progress: Math.random() * 80,
				size: Math.random() * 5 + 4,
				speed: Math.random() * 0.18 + 0.1,
				arrived: false,
				arrivalTime: 0
			});
		}

		tasks = initialTasks;

		let lastTime = performance.now();
		let taskId = id;

		function animate(currentTime: number) {
			const delta = (currentTime - lastTime) / 16;
			lastTime = currentTime;

			tasks = tasks
				.map((task) => {
					if (task.arrived) {
						const timeSinceArrival = currentTime - task.arrivalTime;
						if (timeSinceArrival > 800) {
							return { ...task, progress: 200 };
						}
						return task;
					}

					const newProgress = task.progress + task.speed * delta;

					if (newProgress >= 98 && !task.arrived) {
						endpoints = endpoints.map((ep, i) =>
							i === task.path
								? { ...ep, processing: true, lastProcessTime: currentTime }
								: ep
						);

						return {
							...task,
							progress: 100,
							arrived: true,
							arrivalTime: currentTime
						};
					}

					return { ...task, progress: newProgress };
				})
				.filter((task) => task.progress < 150);

			endpoints = endpoints.map((ep) => {
				if (ep.processing && currentTime - ep.lastProcessTime > 600) {
					return { ...ep, processing: false };
				}
				return ep;
			});

			if (Math.random() < 0.04 * delta && tasks.length < 20) {
				tasks = [
					...tasks,
					{
						id: taskId++,
						path: Math.floor(Math.random() * 5),
						progress: 0,
						size: Math.random() * 5 + 4,
						speed: Math.random() * 0.18 + 0.1,
						arrived: false,
						arrivalTime: 0
					}
				];
			}

			requestAnimationFrame(animate);
		}

		requestAnimationFrame(animate);
	});
</script>

<div bind:this={container} class="absolute inset-0 overflow-hidden pointer-events-none">
	<!-- SVG for path lines -->
	<svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
		<defs>
			<!-- Gradient matching logo: blue -> slate -> light -->
			<linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
				<stop offset="0%" stop-color="rgba({colors.hub.r}, {colors.hub.g}, {colors.hub.b}, 0.25)" />
				<stop offset="50%" stop-color="rgba({colors.line.r}, {colors.line.g}, {colors.line.b}, 0.2)" />
				<stop offset="100%" stop-color="rgba({colors.worker.r}, {colors.worker.g}, {colors.worker.b}, 0.15)" />
			</linearGradient>
		</defs>

		{#each paths as path}
			<path
				d={getPathD(path)}
				fill="none"
				stroke="url(#pathGradient)"
				stroke-width="0.25"
			/>
		{/each}
	</svg>

	<!-- Hub glow (blue - matching logo center) -->
	<div
		class="absolute rounded-full animate-pulse"
		style="
			left: {hub.x}%;
			top: {hub.y}%;
			width: 80px;
			height: 80px;
			transform: translate(-50%, -50%);
			background: radial-gradient(circle, rgba({colors.hub.r}, {colors.hub.g}, {colors.hub.b}, 0.25) 0%, transparent 70%);
		"
	></div>
	<div
		class="absolute rounded-full"
		style="
			left: {hub.x}%;
			top: {hub.y}%;
			width: 18px;
			height: 18px;
			transform: translate(-50%, -50%);
			background: radial-gradient(circle, rgba({colors.hub.r}, {colors.hub.g}, {colors.hub.b}, 0.95) 0%, rgba({colors.hub.r}, {colors.hub.g}, {colors.hub.b}, 0.6) 50%, transparent 80%);
			box-shadow: 0 0 20px rgba({colors.hub.r}, {colors.hub.g}, {colors.hub.b}, 0.5);
		"
	></div>

	<!-- Endpoint workers (white/light - matching logo worker dots) -->
	{#each endpoints as ep, i}
		<!-- Outer glow -->
		<div
			class="absolute rounded-full transition-all duration-500"
			style="
				left: {ep.x}%;
				top: {ep.y}%;
				width: {ep.processing ? 55 * ep.size : 40 * ep.size}px;
				height: {ep.processing ? 55 * ep.size : 40 * ep.size}px;
				transform: translate(-50%, -50%);
				background: radial-gradient(circle,
					rgba({colors.worker.r}, {colors.worker.g}, {colors.worker.b}, {ep.processing ? 0.35 : 0.15}) 0%,
					transparent 70%);
			"
		></div>
		<!-- Inner core -->
		<div
			class="absolute rounded-full transition-all duration-300"
			style="
				left: {ep.x}%;
				top: {ep.y}%;
				width: {ep.processing ? 14 * ep.size : 11 * ep.size}px;
				height: {ep.processing ? 14 * ep.size : 11 * ep.size}px;
				transform: translate(-50%, -50%);
				background: radial-gradient(circle,
					rgba({colors.worker.r}, {colors.worker.g}, {colors.worker.b}, {ep.processing ? 0.95 : 0.7}) 0%,
					rgba({colors.worker.r}, {colors.worker.g}, {colors.worker.b}, {ep.processing ? 0.7 : 0.4}) 60%,
					transparent 85%);
				box-shadow: 0 0 {ep.processing ? 15 * ep.size : 8 * ep.size}px
					rgba({colors.worker.r}, {colors.worker.g}, {colors.worker.b}, {ep.processing ? 0.5 : 0.25});
			"
		></div>
		<!-- Processing ring -->
		{#if ep.processing}
			<div
				class="absolute rounded-full processing-ring"
				style="
					left: {ep.x}%;
					top: {ep.y}%;
					width: {16 * ep.size}px;
					height: {16 * ep.size}px;
					transform: translate(-50%, -50%);
					border: 1.5px solid rgba({colors.worker.r}, {colors.worker.g}, {colors.worker.b}, 0.6);
				"
			></div>
		{/if}
	{/each}

	<!-- Animated task dots (blue - matching logo center/hub) -->
	{#if mounted}
		{#each tasks as task (task.id)}
			{@const pos = getPositionOnPath(task.path, task.progress)}
			{@const fadeIn = task.progress < 8 ? task.progress / 8 : 1}
			{@const fadeOut = task.arrived ? Math.max(0, 1 - (task.progress - 100) / 50) : 1}
			{@const opacity = fadeIn * fadeOut}
			{@const isArriving = task.progress > 90 && !task.arrived}

			<!-- Glow trail -->
			<div
				class="absolute rounded-full"
				style="
					left: {pos.x}%;
					top: {pos.y}%;
					width: {task.size * 3}px;
					height: {task.size * 3}px;
					transform: translate(-50%, -50%);
					background: radial-gradient(circle, rgba({colors.hub.r}, {colors.hub.g}, {colors.hub.b}, {opacity * 0.35}) 0%, transparent 70%);
				"
			></div>
			<!-- Core dot -->
			<div
				class="absolute rounded-full transition-transform duration-100"
				style="
					left: {pos.x}%;
					top: {pos.y}%;
					width: {task.arrived ? task.size * 0.5 : task.size}px;
					height: {task.arrived ? task.size * 0.5 : task.size}px;
					transform: translate(-50%, -50%) {isArriving ? 'scale(1.3)' : ''};
					opacity: {opacity};
					background: radial-gradient(circle,
						rgba({colors.hub.r + 40}, {colors.hub.g + 40}, {colors.hub.b + 10}, 1) 0%,
						rgba({colors.hub.r}, {colors.hub.g}, {colors.hub.b}, 0.9) 100%);
					box-shadow: 0 0 {task.size * 1.5}px rgba({colors.hub.r}, {colors.hub.g}, {colors.hub.b}, {opacity * 0.7});
				"
			></div>
		{/each}
	{/if}
</div>

<style>
	.processing-ring {
		animation: process-pulse 0.8s ease-out forwards;
	}

	@keyframes process-pulse {
		0% {
			opacity: 0.5;
			transform: translate(-50%, -50%) scale(1);
		}
		100% {
			opacity: 0;
			transform: translate(-50%, -50%) scale(1.8);
		}
	}
</style>
