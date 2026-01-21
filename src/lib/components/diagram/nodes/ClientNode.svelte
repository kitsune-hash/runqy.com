<script lang="ts">
	import { T } from '@threlte/core';
	import { RoundedBoxGeometry } from '@threlte/extras';
	import * as THREE from 'three';
	import { COLORS, EMISSIVE } from '../utils/colors';

	interface Props {
		position: THREE.Vector3;
	}

	let { position }: Props = $props();
</script>

<T.Group position={[position.x, position.y, position.z]}>
	<!-- Main box -->
	<T.Mesh castShadow receiveShadow>
		<RoundedBoxGeometry args={[1.2, 0.8, 0.8]} radius={0.1} smoothness={4} />
		<T.MeshStandardMaterial
			color={COLORS.client}
			emissive={COLORS.client}
			emissiveIntensity={EMISSIVE.idle}
			roughness={0.4}
			metalness={0.3}
		/>
	</T.Mesh>

	<!-- Screen indicator -->
	<T.Mesh position={[0, 0.1, 0.41]}>
		<T.PlaneGeometry args={[0.8, 0.4]} />
		<T.MeshStandardMaterial
			color={0x333333}
			emissive={0x5b6bdb}
			emissiveIntensity={0.3}
		/>
	</T.Mesh>

	<!-- Label -->
	<T.Group position={[0, -0.7, 0]}>
		<T.Mesh>
			<T.PlaneGeometry args={[1.4, 0.3]} />
			<T.MeshBasicMaterial color={0x222222} transparent opacity={0.8} />
		</T.Mesh>
	</T.Group>
</T.Group>
