<script lang="ts">
	// SVG/CSS animated bootstrap flow diagram
</script>

<div class="diagram-container">
	<div class="diagram-wrapper">
		<svg viewBox="0 0 600 120" xmlns="http://www.w3.org/2000/svg" class="bootstrap-svg">
			<!-- Connection lines -->
			<line x1="120" y1="50" x2="170" y2="50" class="connection-line" />
			<line x1="270" y1="50" x2="320" y2="50" class="connection-line" />
			<line x1="420" y1="50" x2="470" y2="50" class="connection-line" />

			<!-- Step 1: Worker Starts -->
			<g class="node step-node step-1">
				<rect x="20" y="20" width="100" height="60" rx="8" />
				<text x="70" y="45" class="step-number">1</text>
				<text x="70" y="62" class="step-label">Worker starts</text>
			</g>

			<!-- Step 2: Pull from GitHub -->
			<g class="node step-node step-2">
				<rect x="170" y="20" width="100" height="60" rx="8" />
				<text x="220" y="45" class="step-number">2</text>
				<text x="220" y="62" class="step-label">Pull from Git</text>
			</g>

			<!-- Step 3: Install deps -->
			<g class="node step-node step-3">
				<rect x="320" y="20" width="100" height="60" rx="8" />
				<text x="370" y="45" class="step-number">3</text>
				<text x="370" y="62" class="step-label">Install deps</text>
			</g>

			<!-- Step 4: Ready -->
			<g class="node step-node step-4">
				<rect x="470" y="20" width="110" height="60" rx="8" />
				<text x="525" y="45" class="step-number">4</text>
				<text x="525" y="62" class="step-label">Ready to work</text>
			</g>

			<!-- Animated particle -->
			<g class="particle">
				<circle r="8" class="particle-glow" />
				<circle r="5" class="particle-core" />
				<circle r="2.5" class="particle-center" />
			</g>

			<!-- Arrow heads -->
			<polygon points="165,50 155,45 155,55" class="arrow" />
			<polygon points="315,50 305,45 305,55" class="arrow" />
			<polygon points="465,50 455,45 455,55" class="arrow" />
		</svg>
	</div>

	<!-- Step descriptions -->
	<div class="steps-description">
		<div class="step-desc">
			<span class="step-icon">&#8594;</span>
			<span>Connects to Runqy server, receives Redis creds + repo URL</span>
		</div>
		<div class="step-desc">
			<span class="step-icon">&#8594;</span>
			<span>Automatically clones your code, creates virtualenv</span>
		</div>
		<div class="step-desc">
			<span class="step-icon">&#8594;</span>
			<span>Automatically runs pip install, executes startup script</span>
		</div>
		<div class="step-desc">
			<span class="step-icon">&#10003;</span>
			<span>Signals ready, starts listening for tasks</span>
		</div>
	</div>
</div>

<style>
	.diagram-container {
		width: 100%;
		position: relative;
		background: #0a0a0f;
		border-radius: 16px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.05);
		padding-bottom: 20px;
	}

	.diagram-wrapper {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 30px 20px 20px;
	}

	.bootstrap-svg {
		width: 100%;
		height: auto;
		max-width: 700px;
	}

	/* Connection lines */
	.connection-line {
		stroke: #333340;
		stroke-width: 2;
		fill: none;
	}

	.arrow {
		fill: #333340;
	}

	/* Step nodes */
	.step-node rect {
		fill: #1a1a25;
		stroke: #3a3a55;
		stroke-width: 1.5;
		transition: stroke 0.3s ease;
	}

	.step-1 rect { stroke: #5b6bdb; }
	.step-2 rect { stroke: #7c4dbd; }
	.step-3 rect { stroke: #d4b940; }
	.step-4 rect { stroke: #3dcfbc; }

	.step-number {
		fill: #666;
		font-size: 12px;
		font-weight: 700;
		font-family: system-ui, -apple-system, sans-serif;
		text-anchor: middle;
	}

	.step-label {
		fill: #aaa;
		font-size: 11px;
		font-family: system-ui, -apple-system, sans-serif;
		text-anchor: middle;
	}

	/* Animated particle */
	.particle {
		animation: particle-flow 4s ease-in-out infinite;
	}

	.particle-glow {
		fill: #5b6bdb;
		opacity: 0.3;
	}

	.particle-core {
		fill: #5b6bdb;
		opacity: 0.9;
		animation: particle-color-change 4s ease-in-out infinite;
	}

	.particle-center {
		fill: #ffffff;
		opacity: 0.9;
	}

	@keyframes particle-flow {
		0% { transform: translate(70px, 50px); opacity: 0; }
		5% { opacity: 1; }
		20% { transform: translate(220px, 50px); }
		40% { transform: translate(370px, 50px); }
		60% { transform: translate(525px, 50px); }
		80% { transform: translate(525px, 50px); opacity: 1; }
		90% { opacity: 0; }
		100% { transform: translate(525px, 50px); opacity: 0; }
	}

	@keyframes particle-color-change {
		0%, 15% { fill: #5b6bdb; }
		20%, 35% { fill: #7c4dbd; }
		40%, 55% { fill: #d4b940; }
		60%, 100% { fill: #3dcfbc; }
	}

	/* Step descriptions */
	.steps-description {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 10px;
		padding: 0 20px;
		max-width: 700px;
		margin: 0 auto;
	}

	.step-desc {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 4px;
		font-size: 11px;
		color: #666;
		font-family: system-ui, -apple-system, sans-serif;
	}

	.step-icon {
		font-size: 14px;
		color: #5b6bdb;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.diagram-container {
			border-radius: 12px;
		}

		.diagram-wrapper {
			padding: 20px 15px 15px;
		}

		.steps-description {
			grid-template-columns: repeat(2, 1fr);
			gap: 12px;
		}

		.step-desc {
			font-size: 10px;
		}
	}

	@media (max-width: 480px) {
		.diagram-container {
			border-radius: 8px;
		}

		.diagram-wrapper {
			padding: 15px 10px 10px;
		}

		.steps-description {
			grid-template-columns: 1fr;
			gap: 8px;
		}

		.step-desc {
			flex-direction: row;
			text-align: left;
			gap: 8px;
		}
	}
</style>
