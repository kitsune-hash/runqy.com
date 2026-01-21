<script lang="ts">
	import { T } from '@threlte/core';
	import * as THREE from 'three';
	import { COLORS } from '../utils/colors';

	interface Props {
		curve: THREE.CatmullRomCurve3;
		time: number;
		particleCount?: number;
		offset?: number;
	}

	let { curve, time, particleCount = 5, offset = 0 }: Props = $props();

	// Create geometry and buffers reactively
	const geometry = $derived.by(() => {
		const positions = new Float32Array(particleCount * 3);
		const sizes = new Float32Array(particleCount);

		// Initialize sizes
		for (let i = 0; i < particleCount; i++) {
			sizes[i] = 0.08 + Math.random() * 0.04;
		}

		const geom = new THREE.BufferGeometry();
		geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geom.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

		return geom;
	});

	// Update particle positions based on time
	$effect(() => {
		const positionAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
		const array = positionAttr.array as Float32Array;

		for (let i = 0; i < particleCount; i++) {
			// Calculate t position along curve (0-1)
			const t = (time + offset + (i / particleCount)) % 1;
			const point = curve.getPoint(t);

			array[i * 3] = point.x;
			array[i * 3 + 1] = point.y;
			array[i * 3 + 2] = point.z;
		}

		positionAttr.needsUpdate = true;
	});

	// Custom shader material for glowing particles
	const particleMaterial = new THREE.PointsMaterial({
		color: COLORS.particle,
		size: 0.12,
		transparent: true,
		opacity: 0.8,
		sizeAttenuation: true,
		blending: THREE.AdditiveBlending
	});
</script>

<T.Points {geometry} material={particleMaterial} />
