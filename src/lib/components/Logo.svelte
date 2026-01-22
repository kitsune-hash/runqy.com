<script lang="ts">
	interface Props {
		size?: number;
		class?: string;
		centerColor?: string;
		lineColor?: string;
		dotColor?: string;
	}

	let {
		size = 32,
		class: className = '',
		centerColor = '#3B82F6',  // blue
		lineColor = '#64748B',    // slate
		dotColor = '#E2E8F0'      // white
	}: Props = $props();
</script>

<svg
	viewBox="0 0 100 100"
	width={size}
	height={size}
	class={className}
	xmlns="http://www.w3.org/2000/svg"
	aria-label="runqy logo"
>
	<!-- Distribution lines -->
	<line x1="32" y1="50" x2="72" y2="22" stroke={lineColor} stroke-width="3" stroke-linecap="round" />
	<line x1="32" y1="50" x2="78" y2="50" stroke={lineColor} stroke-width="3" stroke-linecap="round" />
	<line x1="32" y1="50" x2="72" y2="78" stroke={lineColor} stroke-width="3" stroke-linecap="round" />

	<!-- Central node (task source) -->
	<circle cx="32" cy="50" r="14" fill={centerColor} />

	<!-- Worker nodes -->
	<circle cx="72" cy="22" r="9" fill={dotColor} />
	<circle cx="78" cy="50" r="9" fill={dotColor} />
	<circle cx="72" cy="78" r="9" fill={dotColor} />
</svg>
