<script lang="ts">
	// SVG/CSS animated architecture diagram - works on all devices without memory issues
</script>

<div class="diagram-container">
	<div class="diagram-wrapper">
		<svg viewBox="0 0 560 280" xmlns="http://www.w3.org/2000/svg" class="architecture-svg">
			<!-- Connection lines (drawn first, behind everything) -->
			<!-- Client to Server -->
			<line x1="70" y1="140" x2="105" y2="140" class="connection-line" />

			<!-- Server to Queues -->
			<line x1="175" y1="140" x2="210" y2="75" class="connection-line internal" />
			<line x1="175" y1="140" x2="210" y2="140" class="connection-line internal" />
			<line x1="175" y1="140" x2="210" y2="205" class="connection-line internal" />

			<!-- Queues to Workers (spread out) -->
			<!-- queue_x -> On-Prem & AWS -->
			<line x1="245" y1="75" x2="310" y2="55" class="connection-line" />
			<line x1="245" y1="75" x2="420" y2="48" class="connection-line" />

			<!-- queue_y -> GCP & Azure -->
			<line x1="245" y1="140" x2="365" y2="118" class="connection-line" />
			<line x1="245" y1="140" x2="500" y2="140" class="connection-line" />

			<!-- queue_z -> Kubernetes -->
			<line x1="245" y1="205" x2="400" y2="205" class="connection-line" />

			<!-- Return path (dashed, at bottom) -->
			<line x1="55" y1="255" x2="530" y2="255" class="return-line" />

			<!-- Vertical return connectors -->
			<line x1="55" y1="165" x2="55" y2="255" class="return-connector" />
			<line x1="325" y1="75" x2="325" y2="255" class="return-connector" />
			<line x1="435" y1="68" x2="435" y2="255" class="return-connector" />
			<line x1="380" y1="138" x2="380" y2="255" class="return-connector" />
			<line x1="530" y1="160" x2="530" y2="255" class="return-connector" />
			<line x1="415" y1="225" x2="415" y2="255" class="return-connector" />

			<!-- Server Frame (highlighted) -->
			<rect x="100" y="30" width="155" height="220" rx="10" class="server-frame" />
			<rect x="100" y="30" width="155" height="220" rx="10" class="server-frame-glow" />
			<text x="177" y="265" class="frame-label">runqy Server</text>

			<!-- Client Node -->
			<g class="node client-node">
				<rect x="30" y="115" width="45" height="50" rx="6" />
				<text x="52" y="180">Client</text>
			</g>

			<!-- Server Node (inside frame, bigger) -->
			<g class="node server-node">
				<rect x="115" y="100" width="55" height="80" rx="6" />
				<text x="142" y="150">runqy</text>
			</g>

			<!-- Queue Nodes (inside frame, small) -->
			<g class="node queue-node queue-x">
				<rect x="205" y="58" width="35" height="30" rx="4" />
				<text x="222" y="98" class="small-label">queue_x</text>
			</g>
			<g class="node queue-node queue-y">
				<rect x="205" y="125" width="35" height="30" rx="4" />
				<text x="222" y="165" class="small-label">queue_y</text>
			</g>
			<g class="node queue-node queue-z">
				<rect x="205" y="192" width="35" height="30" rx="4" />
				<text x="222" y="232" class="small-label">queue_z</text>
			</g>

			<!-- Worker Nodes (smaller, spread out) -->
			<g class="node worker-node worker-onprem">
				<rect x="300" y="35" width="50" height="35" rx="5" />
				<text x="325" y="82">On-Prem</text>
			</g>
			<g class="node worker-node worker-aws">
				<rect x="410" y="28" width="50" height="35" rx="5" />
				<text x="435" y="75">AWS</text>
			</g>
			<g class="node worker-node worker-gcp">
				<rect x="355" y="98" width="50" height="35" rx="5" />
				<text x="380" y="145">GCP</text>
			</g>
			<g class="node worker-node worker-azure">
				<rect x="505" y="120" width="50" height="35" rx="5" />
				<text x="530" y="167">Azure</text>
			</g>
			<g class="node worker-node worker-k8s">
				<rect x="390" y="185" width="50" height="35" rx="5" />
				<text x="415" y="232">K8s</text>
			</g>

			<!-- Workers label -->
			<text x="420" y="12" class="workers-label">Workers</text>

			<!-- Animated Particles (5 paths) -->
			<!-- Particle 1: queue_x -> On-Prem -->
			<g class="particle particle-1">
				<circle r="6" class="particle-glow" />
				<circle r="4" class="particle-core" />
				<circle r="2" class="particle-center" />
			</g>

			<!-- Particle 2: queue_x -> AWS -->
			<g class="particle particle-2">
				<circle r="6" class="particle-glow" />
				<circle r="4" class="particle-core" />
				<circle r="2" class="particle-center" />
			</g>

			<!-- Particle 3: queue_y -> GCP -->
			<g class="particle particle-3">
				<circle r="6" class="particle-glow" />
				<circle r="4" class="particle-core" />
				<circle r="2" class="particle-center" />
			</g>

			<!-- Particle 4: queue_y -> Azure -->
			<g class="particle particle-4">
				<circle r="6" class="particle-glow" />
				<circle r="4" class="particle-core" />
				<circle r="2" class="particle-center" />
			</g>

			<!-- Particle 5: queue_z -> K8s -->
			<g class="particle particle-5">
				<circle r="6" class="particle-glow" />
				<circle r="4" class="particle-core" />
				<circle r="2" class="particle-center" />
			</g>
		</svg>
	</div>

	<!-- Legend for task flow -->
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

	.diagram-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
		padding-bottom: 60px;
	}

	.architecture-svg {
		width: 100%;
		height: 100%;
		max-width: 1100px;
	}

	/* Connection lines */
	.connection-line {
		stroke: #333340;
		stroke-width: 1.5;
		fill: none;
	}

	.connection-line.internal {
		stroke: #2a2a35;
	}

	.return-line {
		stroke: #252530;
		stroke-width: 1.5;
		stroke-dasharray: 4 3;
		fill: none;
	}

	.return-connector {
		stroke: #252530;
		stroke-width: 1;
		fill: none;
	}

	/* Server frame (highlighted) */
	.server-frame {
		fill: rgba(25, 25, 45, 0.7);
		stroke: #3a3a55;
		stroke-width: 2;
	}

	.server-frame-glow {
		fill: none;
		stroke: #5b6bdb;
		stroke-width: 1;
		opacity: 0.3;
		filter: blur(3px);
	}

	.frame-label {
		fill: #8888aa;
		font-size: 14px;
		font-weight: 600;
		font-family: system-ui, -apple-system, sans-serif;
		text-anchor: middle;
	}

	.workers-label {
		fill: #666;
		font-size: 11px;
		font-weight: 600;
		font-family: system-ui, -apple-system, sans-serif;
		text-anchor: middle;
	}

	/* Nodes */
	.node rect {
		stroke-width: 1.5;
	}

	.node text {
		fill: #888;
		font-size: 11px;
		font-family: system-ui, -apple-system, sans-serif;
		text-anchor: middle;
	}

	.node .small-label {
		font-size: 9px;
	}

	/* Client node */
	.client-node rect {
		fill: #1a1a22;
		stroke: #585858;
	}

	/* Server node (prominent) */
	.server-node rect {
		fill: #1a1a35;
		stroke: #5b6bdb;
		stroke-width: 2;
	}

	.server-node text {
		fill: #aaa;
		font-size: 12px;
		font-weight: 500;
	}

	/* Queue nodes */
	.queue-x rect {
		fill: #1a1a20;
		stroke: #d4b940;
	}

	.queue-y rect {
		fill: #1a1a30;
		stroke: #5b6bdb;
	}

	.queue-z rect {
		fill: #1a1a25;
		stroke: #e05a6d;
	}

	/* Worker nodes (smaller) */
	.worker-node rect {
		stroke-width: 1.2;
	}

	.worker-node text {
		font-size: 9px;
	}

	.worker-onprem rect {
		fill: #1a1a28;
		stroke: #7c4dbd;
	}

	.worker-aws rect {
		fill: #1a2020;
		stroke: #ff9900;
	}

	.worker-gcp rect {
		fill: #1a1a25;
		stroke: #4285f4;
	}

	.worker-azure rect {
		fill: #1a1a28;
		stroke: #0078d4;
	}

	.worker-k8s rect {
		fill: #1a1a2a;
		stroke: #326ce5;
	}

	/* Particles */
	.particle-glow {
		fill: #5b6bdb;
		opacity: 0.25;
	}

	.particle-core {
		fill: #5b6bdb;
		opacity: 0.9;
	}

	.particle-center {
		fill: #ffffff;
		opacity: 0.8;
	}

	/* Animation timing: 8s total cycle */

	/* Particle 1: Client -> queue_x -> On-Prem */
	.particle-1 {
		animation: particle1-path 8s ease-in-out infinite;
	}
	.particle-1 .particle-glow,
	.particle-1 .particle-core {
		animation: particle-color 8s ease-in-out infinite;
	}

	@keyframes particle1-path {
		0% { transform: translate(52px, 140px); }
		8% { transform: translate(142px, 140px); }
		13% { transform: translate(222px, 73px); }
		18% { transform: translate(224px, 71px); }
		23% { transform: translate(220px, 75px); }
		28% { transform: translate(222px, 73px); }
		38% { transform: translate(325px, 52px); }
		45% { transform: translate(327px, 50px); }
		52% { transform: translate(323px, 54px); }
		58% { transform: translate(325px, 52px); }
		63% { transform: translate(325px, 255px); }
		88% { transform: translate(55px, 255px); }
		95% { transform: translate(55px, 140px); }
		100% { transform: translate(52px, 140px); }
	}

	/* Particle 2: Client -> queue_x -> AWS (offset 0.2) */
	.particle-2 {
		animation: particle2-path 8s ease-in-out infinite;
		animation-delay: -6.4s;
	}
	.particle-2 .particle-glow,
	.particle-2 .particle-core {
		animation: particle-color 8s ease-in-out infinite;
		animation-delay: -6.4s;
	}

	@keyframes particle2-path {
		0% { transform: translate(52px, 140px); }
		8% { transform: translate(142px, 140px); }
		13% { transform: translate(222px, 73px); }
		18% { transform: translate(224px, 71px); }
		23% { transform: translate(220px, 75px); }
		28% { transform: translate(222px, 73px); }
		38% { transform: translate(435px, 45px); }
		45% { transform: translate(437px, 43px); }
		52% { transform: translate(433px, 47px); }
		58% { transform: translate(435px, 45px); }
		63% { transform: translate(435px, 255px); }
		88% { transform: translate(55px, 255px); }
		95% { transform: translate(55px, 140px); }
		100% { transform: translate(52px, 140px); }
	}

	/* Particle 3: Client -> queue_y -> GCP (offset 0.4) */
	.particle-3 {
		animation: particle3-path 8s ease-in-out infinite;
		animation-delay: -4.8s;
	}
	.particle-3 .particle-glow,
	.particle-3 .particle-core {
		animation: particle-color 8s ease-in-out infinite;
		animation-delay: -4.8s;
	}

	@keyframes particle3-path {
		0% { transform: translate(52px, 140px); }
		8% { transform: translate(142px, 140px); }
		13% { transform: translate(222px, 140px); }
		18% { transform: translate(224px, 138px); }
		23% { transform: translate(220px, 142px); }
		28% { transform: translate(222px, 140px); }
		38% { transform: translate(380px, 115px); }
		45% { transform: translate(382px, 113px); }
		52% { transform: translate(378px, 117px); }
		58% { transform: translate(380px, 115px); }
		63% { transform: translate(380px, 255px); }
		88% { transform: translate(55px, 255px); }
		95% { transform: translate(55px, 140px); }
		100% { transform: translate(52px, 140px); }
	}

	/* Particle 4: Client -> queue_y -> Azure (offset 0.6) */
	.particle-4 {
		animation: particle4-path 8s ease-in-out infinite;
		animation-delay: -3.2s;
	}
	.particle-4 .particle-glow,
	.particle-4 .particle-core {
		animation: particle-color 8s ease-in-out infinite;
		animation-delay: -3.2s;
	}

	@keyframes particle4-path {
		0% { transform: translate(52px, 140px); }
		8% { transform: translate(142px, 140px); }
		13% { transform: translate(222px, 140px); }
		18% { transform: translate(224px, 138px); }
		23% { transform: translate(220px, 142px); }
		28% { transform: translate(222px, 140px); }
		38% { transform: translate(530px, 137px); }
		45% { transform: translate(532px, 135px); }
		52% { transform: translate(528px, 139px); }
		58% { transform: translate(530px, 137px); }
		63% { transform: translate(530px, 255px); }
		88% { transform: translate(55px, 255px); }
		95% { transform: translate(55px, 140px); }
		100% { transform: translate(52px, 140px); }
	}

	/* Particle 5: Client -> queue_z -> K8s (offset 0.8) */
	.particle-5 {
		animation: particle5-path 8s ease-in-out infinite;
		animation-delay: -1.6s;
	}
	.particle-5 .particle-glow,
	.particle-5 .particle-core {
		animation: particle-color 8s ease-in-out infinite;
		animation-delay: -1.6s;
	}

	@keyframes particle5-path {
		0% { transform: translate(52px, 140px); }
		8% { transform: translate(142px, 140px); }
		13% { transform: translate(222px, 207px); }
		18% { transform: translate(224px, 205px); }
		23% { transform: translate(220px, 209px); }
		28% { transform: translate(222px, 207px); }
		38% { transform: translate(415px, 202px); }
		45% { transform: translate(417px, 200px); }
		52% { transform: translate(413px, 204px); }
		58% { transform: translate(415px, 202px); }
		63% { transform: translate(415px, 255px); }
		88% { transform: translate(55px, 255px); }
		95% { transform: translate(55px, 140px); }
		100% { transform: translate(52px, 140px); }
	}

	/* Shared color animation */
	@keyframes particle-color {
		0%, 28% { fill: #5b6bdb; }
		38%, 58% { fill: #7b8bfb; }
		58.1%, 100% { fill: #3dcfbc; }
	}

	/* Processing pulse effect */
	.particle-1 .particle-core,
	.particle-2 .particle-core,
	.particle-3 .particle-core,
	.particle-4 .particle-core,
	.particle-5 .particle-core {
		animation: particle-color 8s ease-in-out infinite, pulse-scale 8s ease-in-out infinite;
	}
	.particle-2 .particle-core { animation-delay: -6.4s; }
	.particle-3 .particle-core { animation-delay: -4.8s; }
	.particle-4 .particle-core { animation-delay: -3.2s; }
	.particle-5 .particle-core { animation-delay: -1.6s; }

	@keyframes pulse-scale {
		0%, 28%, 58%, 100% { transform: scale(1); }
		40%, 52% { transform: scale(1.3); }
	}

	/* Legend */
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

	/* Responsive adjustments */
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
			height: 380px;
			border-radius: 12px;
		}

		.diagram-wrapper {
			padding: 15px;
			padding-bottom: 55px;
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
			height: 280px;
			border-radius: 8px;
		}

		.diagram-wrapper {
			padding: 10px;
			padding-bottom: 50px;
		}

		.legend {
			bottom: 10px;
			gap: 10px;
			padding: 6px 10px;
		}

		.legend-item {
			font-size: 10px;
			gap: 6px;
		}
	}
</style>
