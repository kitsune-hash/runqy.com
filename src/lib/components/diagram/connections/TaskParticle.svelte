<script lang="ts">
	import { T } from '@threlte/core';
	import * as THREE from 'three';

	interface Props {
		time: number;
		cycleDuration: number;
		offset: number;
		path: [number, number, number][];
		queueIndex?: number;
		workerIndex?: number;
	}

	let { time, cycleDuration, offset, path, queueIndex = 0, workerIndex = 0 }: Props = $props();

	// Time allocation for each phase (total = 1.0)
	// Client -> Server: 0.08
	// Server -> Queue: 0.05
	// WAIT in Queue: 0.15 (longer pause)
	// Queue -> Worker: 0.10
	// PROCESSING at Worker: 0.20 (longer pause with animation)
	// Worker -> Return start: 0.05
	// Return path: 0.25
	// Return end -> Client: 0.07
	// Pause at client: 0.05
	const PHASES = {
		toServer: 0.08,
		toQueue: 0.05,
		inQueue: 0.15,
		toWorker: 0.10,
		processing: 0.20,
		toReturn: 0.05,
		returning: 0.25,
		toClient: 0.07,
		atClient: 0.05,
	};

	// Calculate position based on time
	const position = $derived.by(() => {
		const t = ((time / cycleDuration) + offset) % 1;

		let phase = 0;
		let x: number, y: number;

		// Phase 1: Client -> Server
		if (t < (phase += PHASES.toServer)) {
			const segT = t / PHASES.toServer;
			x = THREE.MathUtils.lerp(path[0][0], path[1][0], easeInOut(segT));
			y = THREE.MathUtils.lerp(path[0][1], path[1][1], easeInOut(segT));
		}
		// Phase 2: Server -> Queue
		else if (t < (phase += PHASES.toQueue)) {
			const segT = (t - (phase - PHASES.toQueue)) / PHASES.toQueue;
			x = THREE.MathUtils.lerp(path[1][0], path[2][0], easeInOut(segT));
			y = THREE.MathUtils.lerp(path[1][1], path[2][1], easeInOut(segT));
		}
		// Phase 3: Waiting in Queue (with slight bobbing)
		else if (t < (phase += PHASES.inQueue)) {
			const segT = (t - (phase - PHASES.inQueue)) / PHASES.inQueue;
			x = path[2][0] + Math.sin(segT * Math.PI * 4) * 0.03;
			y = path[2][1] + Math.cos(segT * Math.PI * 2) * 0.02;
		}
		// Phase 4: Queue -> Worker
		else if (t < (phase += PHASES.toWorker)) {
			const segT = (t - (phase - PHASES.toWorker)) / PHASES.toWorker;
			x = THREE.MathUtils.lerp(path[2][0], path[3][0], easeInOut(segT));
			y = THREE.MathUtils.lerp(path[2][1], path[3][1], easeInOut(segT));
		}
		// Phase 5: Processing at Worker (gentle pulse, no spinning)
		else if (t < (phase += PHASES.processing)) {
			const segT = (t - (phase - PHASES.processing)) / PHASES.processing;
			// Gentle floating motion instead of spinning
			const floatX = Math.sin(segT * Math.PI * 2) * 0.05;
			const floatY = Math.cos(segT * Math.PI * 2) * 0.03;
			x = path[3][0] + floatX;
			y = path[3][1] + floatY;
		}
		// Phase 6: Worker -> Return start (down)
		else if (t < (phase += PHASES.toReturn)) {
			const segT = (t - (phase - PHASES.toReturn)) / PHASES.toReturn;
			x = THREE.MathUtils.lerp(path[3][0], path[4][0], easeInOut(segT));
			y = THREE.MathUtils.lerp(path[3][1], path[4][1], easeInOut(segT));
		}
		// Phase 7: Return path
		else if (t < (phase += PHASES.returning)) {
			const segT = (t - (phase - PHASES.returning)) / PHASES.returning;
			x = THREE.MathUtils.lerp(path[4][0], path[5][0], easeInOut(segT));
			y = THREE.MathUtils.lerp(path[4][1], path[5][1], easeInOut(segT));
		}
		// Phase 8: Return end -> Client (up)
		else if (t < (phase += PHASES.toClient)) {
			const segT = (t - (phase - PHASES.toClient)) / PHASES.toClient;
			x = THREE.MathUtils.lerp(path[5][0], path[6][0], easeInOut(segT));
			y = THREE.MathUtils.lerp(path[5][1], path[6][1], easeInOut(segT));
		}
		// Phase 9: Pause at client
		else {
			x = path[6][0];
			y = path[6][1];
		}

		return [x, y, 0.15] as [number, number, number];
	});

	function easeInOut(t: number): number {
		return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
	}

	// Determine if in processing phase for special effects
	const isProcessing = $derived.by(() => {
		const t = ((time / cycleDuration) + offset) % 1;
		const processingStart = PHASES.toServer + PHASES.toQueue + PHASES.inQueue + PHASES.toWorker;
		const processingEnd = processingStart + PHASES.processing;
		return t >= processingStart && t < processingEnd;
	});

	// Determine if in queue phase
	const isInQueue = $derived.by(() => {
		const t = ((time / cycleDuration) + offset) % 1;
		const queueStart = PHASES.toServer + PHASES.toQueue;
		const queueEnd = queueStart + PHASES.inQueue;
		return t >= queueStart && t < queueEnd;
	});

	// Color: blue for forward, teal for return, subtle change for processing
	const particleColor = $derived.by(() => {
		const t = ((time / cycleDuration) + offset) % 1;
		const returnStart = PHASES.toServer + PHASES.toQueue + PHASES.inQueue + PHASES.toWorker + PHASES.processing;

		if (isProcessing) {
			// Subtle brightness change during processing (no harsh flashing)
			return 0x7b8bfb; // Slightly brighter blue
		} else if (t < returnStart) {
			return 0x5b6bdb; // Blue for forward
		} else {
			return 0x3dcfbc; // Teal for return
		}
	});

	// Size varies based on state
	const baseSize = 0.18;
	const scale = $derived.by(() => {
		if (isProcessing) {
			// Gentle pulse during processing (less dramatic)
			return baseSize * (1.1 + Math.sin(time * 3) * 0.1);
		} else if (isInQueue) {
			// Slightly smaller when waiting
			return baseSize * 0.9;
		}
		return baseSize + Math.sin(time * 5) * 0.02;
	});
</script>

<!-- Task particle -->
<T.Group position={position}>
	<!-- Outer glow -->
	<T.Mesh position={[0, 0, -0.03]}>
		<T.CircleGeometry args={[scale * 3, 24]} />
		<T.MeshBasicMaterial color={particleColor} transparent opacity={isProcessing ? 0.12 : 0.08} />
	</T.Mesh>

	<!-- Middle glow -->
	<T.Mesh position={[0, 0, -0.02]}>
		<T.CircleGeometry args={[scale * 2, 24]} />
		<T.MeshBasicMaterial color={particleColor} transparent opacity={isProcessing ? 0.2 : 0.15} />
	</T.Mesh>

	<!-- Inner glow -->
	<T.Mesh position={[0, 0, -0.01]}>
		<T.CircleGeometry args={[scale * 1.3, 24]} />
		<T.MeshBasicMaterial color={particleColor} transparent opacity={0.4} />
	</T.Mesh>

	<!-- Core -->
	<T.Mesh>
		<T.CircleGeometry args={[scale, 24]} />
		<T.MeshBasicMaterial color={particleColor} />
	</T.Mesh>

	<!-- Bright center -->
	<T.Mesh position={[0, 0, 0.01]}>
		<T.CircleGeometry args={[scale * 0.4, 16]} />
		<T.MeshBasicMaterial color={0xffffff} transparent opacity={isProcessing ? 0.9 : 0.7} />
	</T.Mesh>

	<!-- Subtle processing indicator (small dots around particle) -->
	{#if isProcessing}
		<T.Mesh position={[0, 0, 0.02]} rotation={[0, 0, time * 1.5]}>
			<T.RingGeometry args={[scale * 1.4, scale * 1.5, 24]} />
			<T.MeshBasicMaterial color={particleColor} transparent opacity={0.3} />
		</T.Mesh>
	{/if}
</T.Group>
