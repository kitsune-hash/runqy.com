<script lang="ts">
	import { T } from '@threlte/core';
	import { HTML } from '@threlte/extras';
	import * as THREE from 'three';

	type IconType = 'app' | 'server' | 'queue' | 'worker';

	interface Props {
		position: [number, number, number];
		label: string;
		sublabel?: string;
		color: number;
		icon: IconType;
		size?: number;
	}

	let { position, label, sublabel = '', color, icon, size = 1 }: Props = $props();

	// Create rounded rectangle shape
	function createRoundedRect(width: number, height: number, radius: number): THREE.Shape {
		const shape = new THREE.Shape();
		const x = -width / 2;
		const y = -height / 2;

		shape.moveTo(x + radius, y);
		shape.lineTo(x + width - radius, y);
		shape.quadraticCurveTo(x + width, y, x + width, y + radius);
		shape.lineTo(x + width, y + height - radius);
		shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
		shape.lineTo(x + radius, y + height);
		shape.quadraticCurveTo(x, y + height, x, y + height - radius);
		shape.lineTo(x, y + radius);
		shape.quadraticCurveTo(x, y, x + radius, y);

		return shape;
	}

	const cardWidth = 1.8 * size;
	const cardHeight = 1.6 * size;
	const cardShape = createRoundedRect(cardWidth, cardHeight, 0.15 * size);
	const cardGeometry = new THREE.ShapeGeometry(cardShape);

	// Convert hex color to CSS
	const cssColor = `#${color.toString(16).padStart(6, '0')}`;
</script>

<T.Group position={position}>
	<!-- Card background -->
	<T.Mesh geometry={cardGeometry}>
		<T.MeshBasicMaterial color={0x1a1a24} />
	</T.Mesh>

	<!-- Colored accent bar at top -->
	<T.Mesh position={[0, cardHeight / 2 - 0.1 * size, 0.01]}>
		<T.PlaneGeometry args={[cardWidth - 0.1, 0.12 * size]} />
		<T.MeshBasicMaterial {color} />
	</T.Mesh>

	<!-- Icon area -->
	<T.Group position={[0, 0.15 * size, 0.01]}>
		{#if icon === 'app'}
			<!-- App icon: rounded square with dot -->
			<T.Mesh>
				<T.RingGeometry args={[0.18 * size, 0.28 * size, 4]} />
				<T.MeshBasicMaterial {color} />
			</T.Mesh>
			<T.Mesh>
				<T.CircleGeometry args={[0.08 * size, 16]} />
				<T.MeshBasicMaterial {color} />
			</T.Mesh>
		{:else if icon === 'server'}
			<!-- Server icon: stacked lines -->
			{#each [-0.15, 0, 0.15] as yOffset}
				<T.Mesh position={[0, yOffset * size, 0]}>
					<T.PlaneGeometry args={[0.45 * size, 0.1 * size]} />
					<T.MeshBasicMaterial {color} />
				</T.Mesh>
			{/each}
		{:else if icon === 'queue'}
			<!-- Queue icon: horizontal bars staggered -->
			{#each [0, 1, 2] as i}
				<T.Mesh position={[-0.1 * size + i * 0.08 * size, 0.12 * size - i * 0.12 * size, 0]}>
					<T.PlaneGeometry args={[0.4 * size, 0.08 * size]} />
					<T.MeshBasicMaterial {color} opacity={1 - i * 0.2} transparent />
				</T.Mesh>
			{/each}
		{:else if icon === 'worker'}
			<!-- Worker icon: gear-like shape -->
			<T.Mesh>
				<T.RingGeometry args={[0.1 * size, 0.22 * size, 6]} />
				<T.MeshBasicMaterial {color} />
			</T.Mesh>
			<T.Mesh>
				<T.CircleGeometry args={[0.06 * size, 16]} />
				<T.MeshBasicMaterial color={0x1a1a24} />
			</T.Mesh>
		{/if}
	</T.Group>

	<!-- HTML labels (rendered as overlay) -->
	<HTML position={[0, -cardHeight / 2 - 0.35 * size, 0]} center transform={false}>
		<div class="label-container" style="--accent-color: {cssColor}">
			<div class="label">{label}</div>
			{#if sublabel}
				<div class="sublabel">{sublabel}</div>
			{/if}
		</div>
	</HTML>
</T.Group>

<style>
	.label-container {
		text-align: center;
		font-family: system-ui, -apple-system, sans-serif;
		pointer-events: none;
		white-space: nowrap;
	}

	.label {
		font-size: 13px;
		font-weight: 600;
		color: #ffffff;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
	}

	.sublabel {
		font-size: 10px;
		color: #888899;
		margin-top: 2px;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
	}
</style>
