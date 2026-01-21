<script lang="ts">
	import { onMount } from 'svelte';
	import { Canvas } from '@threlte/core';
	import { shouldRender3D } from './utils/webgl';
	import Scene from './Scene.svelte';

	// Check if we should render 3D
	let canRender3D = $state(false);
	let isLoading = $state(true);

	onMount(() => {
		canRender3D = shouldRender3D();
		isLoading = false;

		// Handle resize to switch between 3D and static
		const handleResize = () => {
			canRender3D = shouldRender3D();
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});
</script>

<div class="diagram-container">
	{#if isLoading}
		<!-- Loading placeholder -->
		<div class="loading-placeholder">
			<div class="loading-spinner"></div>
		</div>
	{:else if canRender3D}
		<!-- 3D Canvas -->
		<Canvas>
			<Scene />
		</Canvas>
	{:else}
		<!-- Static fallback for mobile/no WebGL -->
		<div class="fallback-diagram">
			<img
				src="/images/architecture-diagram.png"
				alt="runqy Architecture Diagram"
				class="fallback-image"
			/>
		</div>
	{/if}

	<!-- Simplified legend for task flow -->
	<div class="legend">
		<div class="legend-item">
			<span class="legend-dot request"></span>
			<span>Task Request</span>
		</div>
		<div class="legend-item">
			<span class="legend-dot response"></span>
			<span>Task Response</span>
		</div>
	</div>
</div>

<style>
	.diagram-container {
		width: 100%;
		height: 500px;
		position: relative;
		background: #0a0a0f;
		border-radius: 16px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.loading-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.loading-spinner {
		width: 40px;
		height: 40px;
		border: 3px solid #1a1a24;
		border-top-color: #5b6bdb;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.fallback-diagram {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
	}

	.fallback-image {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}

	.legend {
		position: absolute;
		bottom: 16px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		align-items: center;
		gap: 24px;
		padding: 10px 24px;
		background: rgba(10, 10, 15, 0.95);
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(8px);
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 12px;
		color: #888;
		font-family: system-ui, -apple-system, sans-serif;
	}

	.legend-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		box-shadow: 0 0 10px currentColor;
	}

	.legend-dot.request {
		background: #5b6bdb;
		color: #5b6bdb;
	}

	.legend-dot.response {
		background: #3dcfbc;
		color: #3dcfbc;
	}

	@media (max-width: 1024px) {
		.diagram-container {
			height: 450px;
		}

		.legend {
			gap: 16px;
			padding: 8px 16px;
		}
	}

	@media (max-width: 768px) {
		.diagram-container {
			height: 400px;
			border-radius: 12px;
		}

		.legend {
			gap: 12px;
			padding: 8px 12px;
		}

		.legend-item {
			font-size: 11px;
		}

		.legend-dot {
			width: 8px;
			height: 8px;
		}
	}

	@media (max-width: 640px) {
		.diagram-container {
			height: 300px;
			border-radius: 8px;
		}

		.legend {
			bottom: 12px;
			gap: 10px;
			padding: 6px 10px;
		}

		.legend-item {
			font-size: 10px;
			gap: 6px;
		}
	}
</style>
