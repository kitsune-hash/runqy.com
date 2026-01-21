<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { RoundedBoxGeometry } from '@threlte/extras';
	import * as THREE from 'three';
	import { COLORS, EMISSIVE } from '../utils/colors';

	interface Props {
		position: THREE.Vector3;
	}

	let { position }: Props = $props();

	// Pulsing animation for the server
	let pulseIntensity = $state(EMISSIVE.idle);

	useTask((delta) => {
		pulseIntensity = EMISSIVE.idle + Math.sin(Date.now() * 0.003) * 0.15;
	});
</script>

<T.Group position={[position.x, position.y, position.z]}>
	<!-- Server rack (main unit) -->
	<T.Mesh castShadow receiveShadow>
		<RoundedBoxGeometry args={[1.5, 1.2, 1]} radius={0.08} smoothness={4} />
		<T.MeshStandardMaterial
			color={COLORS.server}
			emissive={COLORS.server}
			emissiveIntensity={pulseIntensity}
			roughness={0.3}
			metalness={0.5}
		/>
	</T.Mesh>

	<!-- Server slots/drives -->
	{#each [-0.3, 0, 0.3] as yOffset}
		<T.Mesh position={[0, yOffset, 0.51]}>
			<T.PlaneGeometry args={[1.2, 0.15]} />
			<T.MeshStandardMaterial color={0x222222} />
		</T.Mesh>
		<!-- Status LED -->
		<T.Mesh position={[0.5, yOffset, 0.52]}>
			<T.CircleGeometry args={[0.03, 16]} />
			<T.MeshBasicMaterial color={0x00ff00} />
		</T.Mesh>
	{/each}

	<!-- Redis indicator (smaller box attached) -->
	<T.Mesh position={[0, -0.8, 0]} castShadow>
		<RoundedBoxGeometry args={[0.8, 0.4, 0.6]} radius={0.05} smoothness={4} />
		<T.MeshStandardMaterial
			color={COLORS.redis}
			emissive={COLORS.redis}
			emissiveIntensity={pulseIntensity * 0.8}
			roughness={0.4}
			metalness={0.3}
		/>
	</T.Mesh>
</T.Group>
