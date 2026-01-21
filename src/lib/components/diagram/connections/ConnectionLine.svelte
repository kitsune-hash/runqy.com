<script lang="ts">
	import { T } from '@threlte/core';
	import * as THREE from 'three';
	import { COLORS } from '../utils/colors';

	interface Props {
		curve: THREE.CatmullRomCurve3;
	}

	let { curve }: Props = $props();

	// Create tube geometry from the curve (reactive to prop changes)
	const tubeGeometry = $derived(new THREE.TubeGeometry(curve, 32, 0.03, 8, false));
</script>

<T.Mesh geometry={tubeGeometry}>
	<T.MeshStandardMaterial
		color={COLORS.connectionLine}
		transparent
		opacity={0.4}
		roughness={0.8}
		metalness={0.1}
	/>
</T.Mesh>
