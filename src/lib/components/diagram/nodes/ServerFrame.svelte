<script lang="ts">
	import { T } from '@threlte/core';
	import { HTML } from '@threlte/extras';
	import * as THREE from 'three';

	interface Props {
		position: [number, number, number];
		width?: number;
		height?: number;
	}

	let { position, width = 4.2, height = 3.6 }: Props = $props();

	// Create rounded rectangle shape for frame
	function createRoundedRect(w: number, h: number, radius: number): THREE.Shape {
		const shape = new THREE.Shape();
		const x = -w / 2;
		const y = -h / 2;

		shape.moveTo(x + radius, y);
		shape.lineTo(x + w - radius, y);
		shape.quadraticCurveTo(x + w, y, x + w, y + radius);
		shape.lineTo(x + w, y + h - radius);
		shape.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
		shape.lineTo(x + radius, y + h);
		shape.quadraticCurveTo(x, y + h, x, y + h - radius);
		shape.lineTo(x, y + radius);
		shape.quadraticCurveTo(x, y, x + radius, y);

		return shape;
	}

	const frameShape = $derived(createRoundedRect(width, height, 0.2));
	const frameGeometry = $derived(new THREE.ShapeGeometry(frameShape));
	const outlineGeometry = $derived(
		new THREE.BufferGeometry().setFromPoints(
			frameShape.getPoints(50).map(p => new THREE.Vector3(p.x, p.y, 0))
		)
	);
	const innerOutlineGeometry = $derived(
		new THREE.BufferGeometry().setFromPoints(
			createRoundedRect(width - 0.25, height - 0.25, 0.15).getPoints(50).map(p => new THREE.Vector3(p.x, p.y, 0))
		)
	);
</script>

<T.Group position={position}>
	<!-- Frame background (subtle) -->
	<T.Mesh geometry={frameGeometry} position={[0, 0, -0.05]}>
		<T.MeshBasicMaterial color={0x0c0c12} />
	</T.Mesh>

	<!-- Frame border -->
	<T.LineLoop geometry={outlineGeometry} position={[0, 0, -0.04]}>
		<T.LineBasicMaterial color={0x2a2a38} />
	</T.LineLoop>

	<!-- Dashed inner border for visual interest -->
	<T.LineLoop geometry={innerOutlineGeometry} position={[0, 0, -0.03]}>
		<T.LineDashedMaterial color={0x1a1a24} dashSize={0.12} gapSize={0.08} />
	</T.LineLoop>

	<!-- Frame label -->
	<HTML position={[0, height / 2 + 0.22, 0]} center transform={false}>
		<div class="frame-label">runqy server</div>
	</HTML>
</T.Group>

<style>
	.frame-label {
		font-family: system-ui, -apple-system, sans-serif;
		font-size: 9px;
		font-weight: 500;
		color: #4a4a5a;
		text-transform: uppercase;
		letter-spacing: 1px;
		pointer-events: none;
	}
</style>
