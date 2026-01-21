<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { RoundedBoxGeometry } from '@threlte/extras';
	import * as THREE from 'three';
	import { COLORS, EMISSIVE } from '../utils/colors';

	type WorkerType = 'laptop' | 'cloud' | 'gpu';

	interface Props {
		position: THREE.Vector3;
		type: WorkerType;
	}

	let { position, type }: Props = $props();

	// Get color based on type (reactive to prop changes)
	const colorMap: Record<WorkerType, number> = {
		laptop: COLORS.workerLaptop,
		cloud: COLORS.workerCloud,
		gpu: COLORS.workerGpu
	};

	const color = $derived(colorMap[type]);

	// Pulsing animation
	let pulseIntensity = $state(EMISSIVE.idle);

	useTask(() => {
		// Each worker type pulses at slightly different rates
		const phaseOffset = type === 'laptop' ? 0 : type === 'cloud' ? 2 : 4;
		pulseIntensity = EMISSIVE.idle + Math.sin(Date.now() * 0.002 + phaseOffset) * 0.1;
	});
</script>

<T.Group position={[position.x, position.y, position.z]}>
	{#if type === 'laptop'}
		<!-- Laptop base -->
		<T.Mesh castShadow receiveShadow position={[0, -0.1, 0]}>
			<RoundedBoxGeometry args={[1, 0.1, 0.8]} radius={0.03} smoothness={4} />
			<T.MeshStandardMaterial
				{color}
				emissive={color}
				emissiveIntensity={pulseIntensity}
				roughness={0.4}
				metalness={0.4}
			/>
		</T.Mesh>
		<!-- Laptop screen -->
		<T.Mesh castShadow position={[0, 0.25, -0.35]} rotation={[-0.3, 0, 0]}>
			<RoundedBoxGeometry args={[0.9, 0.6, 0.05]} radius={0.02} smoothness={4} />
			<T.MeshStandardMaterial
				{color}
				emissive={color}
				emissiveIntensity={pulseIntensity}
				roughness={0.4}
				metalness={0.4}
			/>
		</T.Mesh>
		<!-- Screen glow -->
		<T.Mesh position={[0, 0.25, -0.32]} rotation={[-0.3, 0, 0]}>
			<T.PlaneGeometry args={[0.75, 0.45]} />
			<T.MeshBasicMaterial color={0x333344} />
		</T.Mesh>
	{:else if type === 'cloud'}
		<!-- Cloud shape (multiple overlapping spheres) -->
		<T.Group>
			<T.Mesh castShadow position={[-0.3, 0, 0]}>
				<T.SphereGeometry args={[0.35, 16, 16]} />
				<T.MeshStandardMaterial
					{color}
					emissive={color}
					emissiveIntensity={pulseIntensity}
					roughness={0.5}
					metalness={0.2}
				/>
			</T.Mesh>
			<T.Mesh castShadow position={[0, 0.1, 0]}>
				<T.SphereGeometry args={[0.4, 16, 16]} />
				<T.MeshStandardMaterial
					{color}
					emissive={color}
					emissiveIntensity={pulseIntensity}
					roughness={0.5}
					metalness={0.2}
				/>
			</T.Mesh>
			<T.Mesh castShadow position={[0.35, 0, 0]}>
				<T.SphereGeometry args={[0.35, 16, 16]} />
				<T.MeshStandardMaterial
					{color}
					emissive={color}
					emissiveIntensity={pulseIntensity}
					roughness={0.5}
					metalness={0.2}
				/>
			</T.Mesh>
			<T.Mesh castShadow position={[0, -0.15, 0.1]}>
				<T.SphereGeometry args={[0.3, 16, 16]} />
				<T.MeshStandardMaterial
					{color}
					emissive={color}
					emissiveIntensity={pulseIntensity}
					roughness={0.5}
					metalness={0.2}
				/>
			</T.Mesh>
		</T.Group>
	{:else if type === 'gpu'}
		<!-- GPU/Server rack -->
		<T.Mesh castShadow receiveShadow>
			<RoundedBoxGeometry args={[1.2, 0.8, 0.6]} radius={0.05} smoothness={4} />
			<T.MeshStandardMaterial
				{color}
				emissive={color}
				emissiveIntensity={pulseIntensity}
				roughness={0.3}
				metalness={0.6}
			/>
		</T.Mesh>
		<!-- GPU fan vents -->
		{#each [-0.3, 0.3] as xOffset}
			<T.Mesh position={[xOffset, 0, 0.31]}>
				<T.CircleGeometry args={[0.15, 8]} />
				<T.MeshStandardMaterial color={0x222222} />
			</T.Mesh>
			<!-- Fan blades indicator -->
			<T.Mesh position={[xOffset, 0, 0.32]}>
				<T.RingGeometry args={[0.05, 0.12, 6]} />
				<T.MeshBasicMaterial color={0x444444} />
			</T.Mesh>
		{/each}
		<!-- Status LEDs -->
		{#each [0, 1, 2] as i}
			<T.Mesh position={[-0.45 + i * 0.15, 0.3, 0.31]}>
				<T.CircleGeometry args={[0.02, 8]} />
				<T.MeshBasicMaterial color={i === 2 ? 0xff6600 : 0x00ff00} />
			</T.Mesh>
		{/each}
	{/if}
</T.Group>
