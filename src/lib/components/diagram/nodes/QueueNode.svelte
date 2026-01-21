<script lang="ts">
	import { T } from '@threlte/core';
	import { HTML } from '@threlte/extras';
	import * as THREE from 'three';

	interface Props {
		position: [number, number, number];
		label: string;
		color: number;
		queueIndex: number;
		time: number;
	}

	let { position, label, color, queueIndex, time }: Props = $props();

	// Convert hex color to CSS
	const cssColor = `#${color.toString(16).padStart(6, '0')}`;

	// Queue slot animation - simulate tasks waiting
	const slotOpacities = $derived.by(() => {
		const phase = (time * 0.5 + queueIndex * 2) % 4;
		return [
			phase > 0.5 ? 0.8 : 0.2,
			phase > 1.5 ? 0.8 : 0.2,
			phase > 2.5 ? 0.8 : 0.2,
		];
	});
</script>

<T.Group position={position}>
	<!-- Queue container (abstract list-like design) -->
	<!-- Outer border -->
	<T.Mesh>
		<T.PlaneGeometry args={[1.1, 1.4]} />
		<T.MeshBasicMaterial color={0x12121a} />
	</T.Mesh>

	<!-- Colored left accent bar -->
	<T.Mesh position={[-0.5, 0, 0.01]}>
		<T.PlaneGeometry args={[0.08, 1.3]} />
		<T.MeshBasicMaterial {color} />
	</T.Mesh>

	<!-- Queue slots (represent waiting tasks) -->
	{#each [0.4, 0, -0.4] as yOffset, i}
		<!-- Slot background -->
		<T.Mesh position={[0.08, yOffset, 0.01]}>
			<T.PlaneGeometry args={[0.85, 0.32]} />
			<T.MeshBasicMaterial color={0x1a1a24} />
		</T.Mesh>

		<!-- Task indicator (animated) -->
		<T.Mesh position={[-0.2, yOffset, 0.02]}>
			<T.CircleGeometry args={[0.08, 16]} />
			<T.MeshBasicMaterial {color} transparent opacity={slotOpacities[i]} />
		</T.Mesh>

		<!-- Slot lines (represent task data) -->
		<T.Mesh position={[0.18, yOffset + 0.04, 0.02]}>
			<T.PlaneGeometry args={[0.4, 0.06]} />
			<T.MeshBasicMaterial color={0x2a2a35} transparent opacity={slotOpacities[i] * 0.8} />
		</T.Mesh>
		<T.Mesh position={[0.08, yOffset - 0.06, 0.02]}>
			<T.PlaneGeometry args={[0.25, 0.04]} />
			<T.MeshBasicMaterial color={0x222230} transparent opacity={slotOpacities[i] * 0.6} />
		</T.Mesh>
	{/each}

	<!-- Queue count indicator -->
	<T.Mesh position={[0.42, 0.55, 0.02]}>
		<T.CircleGeometry args={[0.12, 16]} />
		<T.MeshBasicMaterial {color} transparent opacity={0.3} />
	</T.Mesh>

	<!-- Label -->
	<HTML position={[0, -0.9, 0]} center transform={false}>
		<div class="queue-label" style="--accent-color: {cssColor}">
			{label}
		</div>
	</HTML>
</T.Group>

<style>
	.queue-label {
		font-family: system-ui, -apple-system, sans-serif;
		font-size: 11px;
		font-weight: 500;
		color: #aaaaaa;
		white-space: nowrap;
		pointer-events: none;
	}
</style>
