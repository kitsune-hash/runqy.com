<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { HTML } from '@threlte/extras';
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { COLORS } from './utils/colors';
	import FlatNode from './nodes/FlatNode.svelte';
	import QueueNode from './nodes/QueueNode.svelte';
	import ServerFrame from './nodes/ServerFrame.svelte';
	import TaskParticle from './connections/TaskParticle.svelte';

	// Responsive zoom - calculated to make content fill ~82% of canvas width
	// Higher zoom = larger content = fills more of the canvas
	// Max width is 1280px (max-w-7xl), so cap zoom calculation at that
	let zoom = $state(35);

	function calculateZoom(): number {
		if (typeof window === 'undefined') return 35;
		// Cap the width at 1280px (max-w-7xl) for zoom calculation
		const width = Math.min(window.innerWidth, 1280);
		// Calculate zoom to fill ~82% of canvas horizontally
		// Content spans ~30 units (includes node sizes beyond positions)
		const contentWidth = 30;
		const fillPercent = 0.82;
		const calculatedZoom = (width * fillPercent) / contentWidth;
		// Clamp between reasonable values
		return Math.max(22, Math.min(45, calculatedZoom));
	}

	onMount(() => {
		zoom = calculateZoom();
		const handleResize = () => {
			zoom = calculateZoom();
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});

	// Layout: Client -> [runqy Server + Queues] -> Workers (spread across full width)
	// Expanded to fill canvas edge-to-edge: content spans from x=-14 to x=14
	const POSITIONS = {
		client: [-13.5, 0, 0] as [number, number, number],
		// Server frame center
		serverFrame: [-6, 0, 0] as [number, number, number],
		// Server inside frame
		server: [-7.8, 0, 0] as [number, number, number],
		// 3 Queues inside frame (stacked vertically with more spacing)
		queues: [
			[-4.8, 2, 0] as [number, number, number],     // queue_x
			[-4.8, 0, 0] as [number, number, number],     // queue_y
			[-4.8, -2, 0] as [number, number, number],    // queue_z
		],
		// 5 Workers (spread out diagonally/distributed, not aligned)
		workers: [
			[3.5, 3.5, 0] as [number, number, number],    // On-Prem (top-left of workers)
			[9.5, 2.2, 0] as [number, number, number],    // AWS (top-right)
			[6.5, 0.3, 0] as [number, number, number],    // GCP (center)
			[13.5, -0.5, 0] as [number, number, number],  // Azure (far right edge)
			[8, -2.8, 0] as [number, number, number],     // Kubernetes (bottom)
		],
		// Single "Workers" label position (centered under all workers)
		workersLabel: [8.2, -5, 0] as [number, number, number],
	};

	// Queue definitions
	const QUEUES = [
		{ pos: POSITIONS.queues[0], label: 'queue_x', color: COLORS.workerGpu },
		{ pos: POSITIONS.queues[1], label: 'queue_y', color: COLORS.server },
		{ pos: POSITIONS.queues[2], label: 'queue_z', color: COLORS.redis },
	];

	// Worker definitions (5 workers - only sublabel shown, "Workers" label is shared)
	const WORKERS = [
		{ pos: POSITIONS.workers[0], label: '', sublabel: 'On-Premise', color: COLORS.workerLaptop },
		{ pos: POSITIONS.workers[1], label: '', sublabel: 'AWS', color: COLORS.workerCloud },
		{ pos: POSITIONS.workers[2], label: '', sublabel: 'Google Cloud', color: 0x4285f4 },
		{ pos: POSITIONS.workers[3], label: '', sublabel: 'Azure', color: 0x0078d4 },
		{ pos: POSITIONS.workers[4], label: '', sublabel: 'Kubernetes', color: 0x326ce5 },
	];

	// Animation time
	let time = $state(0);

	useTask((delta) => {
		time += delta;
	});

	// Task cycle duration
	const CYCLE_DURATION = 8;

	// Create connection line points
	function createLineGeometry(points: THREE.Vector3[]): THREE.BufferGeometry {
		return new THREE.BufferGeometry().setFromPoints(points);
	}
</script>

<!-- Orthographic camera for flat look - centered on diagram -->
<T.OrthographicCamera
	makeDefault
	position={[0, -0.8, 10]}
	{zoom}
	near={0.1}
	far={100}
	oncreate={(ref) => {
		ref.lookAt(0, -0.8, 0);
	}}
/>

<!-- Soft lighting -->
<T.AmbientLight intensity={1} />

<!-- Dark background -->
<T.Color attach="background" args={[0x08080c]} />

<!-- Connection: Client -> Server -->
<T.Line
	geometry={createLineGeometry([
		new THREE.Vector3(...POSITIONS.client),
		new THREE.Vector3(...POSITIONS.server),
	])}
>
	<T.LineBasicMaterial color={0x333340} />
</T.Line>

<!-- Connection: Server -> Queues (internal) -->
{#each QUEUES as queue}
	<T.Line
		geometry={createLineGeometry([
			new THREE.Vector3(POSITIONS.server[0] + 0.8, POSITIONS.server[1], 0),
			new THREE.Vector3(queue.pos[0] - 0.5, queue.pos[1], 0),
		])}
	>
		<T.LineBasicMaterial color={0x2a2a35} />
	</T.Line>
{/each}

<!-- Connection: Queues -> Workers -->
<!-- queue_x -> On-Prem & AWS -->
<T.Line geometry={createLineGeometry([new THREE.Vector3(POSITIONS.queues[0][0] + 0.5, POSITIONS.queues[0][1], 0), new THREE.Vector3(...POSITIONS.workers[0])])}>
	<T.LineBasicMaterial color={0x333340} />
</T.Line>
<T.Line geometry={createLineGeometry([new THREE.Vector3(POSITIONS.queues[0][0] + 0.5, POSITIONS.queues[0][1], 0), new THREE.Vector3(...POSITIONS.workers[1])])}>
	<T.LineBasicMaterial color={0x333340} />
</T.Line>

<!-- queue_y -> GCP & Azure -->
<T.Line geometry={createLineGeometry([new THREE.Vector3(POSITIONS.queues[1][0] + 0.5, POSITIONS.queues[1][1], 0), new THREE.Vector3(...POSITIONS.workers[2])])}>
	<T.LineBasicMaterial color={0x333340} />
</T.Line>
<T.Line geometry={createLineGeometry([new THREE.Vector3(POSITIONS.queues[1][0] + 0.5, POSITIONS.queues[1][1], 0), new THREE.Vector3(...POSITIONS.workers[3])])}>
	<T.LineBasicMaterial color={0x333340} />
</T.Line>

<!-- queue_z -> Kubernetes -->
<T.Line geometry={createLineGeometry([new THREE.Vector3(POSITIONS.queues[2][0] + 0.5, POSITIONS.queues[2][1], 0), new THREE.Vector3(...POSITIONS.workers[4])])}>
	<T.LineBasicMaterial color={0x333340} />
</T.Line>

<!-- Return paths (below) - spans from rightmost worker to client -->
<T.Line
	geometry={createLineGeometry([
		new THREE.Vector3(13.5, -6, 0),
		new THREE.Vector3(POSITIONS.client[0], -6, 0),
	])}
>
	<T.LineDashedMaterial color={0x252530} dashSize={0.2} gapSize={0.15} />
</T.Line>

<!-- Vertical connectors for return -->
{#each WORKERS as worker}
	<T.Line
		geometry={createLineGeometry([
			new THREE.Vector3(worker.pos[0], worker.pos[1] - 0.7, 0),
			new THREE.Vector3(worker.pos[0], -6, 0),
		])}
	>
		<T.LineBasicMaterial color={0x252530} />
	</T.Line>
{/each}
<T.Line
	geometry={createLineGeometry([
		new THREE.Vector3(POSITIONS.client[0], -6, 0),
		new THREE.Vector3(POSITIONS.client[0], POSITIONS.client[1] - 0.8, 0),
	])}
>
	<T.LineBasicMaterial color={0x252530} />
</T.Line>

<!-- Server Frame (contains server + queues) -->
<ServerFrame position={POSITIONS.serverFrame} width={5} height={5.8} />

<!-- Nodes -->
<FlatNode position={POSITIONS.client} label="Client" color={COLORS.client} icon="app" />
<FlatNode position={POSITIONS.server} label="runqy" color={COLORS.server} icon="server" size={0.85} />

<!-- Queues (abstract design) -->
{#each QUEUES as queue, i}
	<QueueNode position={queue.pos} label={queue.label} color={queue.color} queueIndex={i} {time} />
{/each}

<!-- Workers -->
{#each WORKERS as worker}
	<FlatNode
		position={worker.pos}
		label={worker.label}
		sublabel={worker.sublabel}
		color={worker.color}
		icon="worker"
		size={0.75}
	/>
{/each}

<!-- Shared "Workers" label under all workers -->
<HTML position={POSITIONS.workersLabel} center transform={false}>
	<div class="workers-label">Workers</div>
</HTML>

<!-- Animated task particles -->
<!-- Path 1: queue_x -> On-Prem -->
<TaskParticle
	{time}
	cycleDuration={CYCLE_DURATION}
	offset={0}
	path={[
		POSITIONS.client,
		POSITIONS.server,
		POSITIONS.queues[0],
		POSITIONS.workers[0],
		[POSITIONS.workers[0][0], -6, 0],
		[POSITIONS.client[0], -6, 0],
		POSITIONS.client,
	]}
/>

<!-- Path 2: queue_x -> AWS -->
<TaskParticle
	{time}
	cycleDuration={CYCLE_DURATION}
	offset={0.2}
	path={[
		POSITIONS.client,
		POSITIONS.server,
		POSITIONS.queues[0],
		POSITIONS.workers[1],
		[POSITIONS.workers[1][0], -6, 0],
		[POSITIONS.client[0], -6, 0],
		POSITIONS.client,
	]}
/>

<!-- Path 3: queue_y -> GCP -->
<TaskParticle
	{time}
	cycleDuration={CYCLE_DURATION}
	offset={0.4}
	path={[
		POSITIONS.client,
		POSITIONS.server,
		POSITIONS.queues[1],
		POSITIONS.workers[2],
		[POSITIONS.workers[2][0], -6, 0],
		[POSITIONS.client[0], -6, 0],
		POSITIONS.client,
	]}
/>

<!-- Path 4: queue_y -> Azure -->
<TaskParticle
	{time}
	cycleDuration={CYCLE_DURATION}
	offset={0.6}
	path={[
		POSITIONS.client,
		POSITIONS.server,
		POSITIONS.queues[1],
		POSITIONS.workers[3],
		[POSITIONS.workers[3][0], -6, 0],
		[POSITIONS.client[0], -6, 0],
		POSITIONS.client,
	]}
/>

<!-- Path 5: queue_z -> Kubernetes -->
<TaskParticle
	{time}
	cycleDuration={CYCLE_DURATION}
	offset={0.8}
	path={[
		POSITIONS.client,
		POSITIONS.server,
		POSITIONS.queues[2],
		POSITIONS.workers[4],
		[POSITIONS.workers[4][0], -6, 0],
		[POSITIONS.client[0], -6, 0],
		POSITIONS.client,
	]}
/>

<style>
	.workers-label {
		font-family: system-ui, -apple-system, sans-serif;
		font-size: 16px;
		font-weight: 600;
		color: #ffffff;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
		white-space: nowrap;
		pointer-events: none;
	}
</style>
