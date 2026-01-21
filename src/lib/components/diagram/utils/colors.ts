// Cerberus theme colors for the architecture diagram
// These match the Skeleton UI Cerberus theme

export const COLORS = {
	// Node colors
	client: 0x585858, // surface-600
	server: 0x5b6bdb, // primary-500
	redis: 0xe05a6d, // tertiary-500 (coral/red)
	workerLaptop: 0x7c4dbd, // secondary-500 (purple)
	workerCloud: 0x3dcfbc, // success-500 (teal)
	workerGpu: 0xd4b940, // warning-500 (yellow/gold)

	// Connection colors
	connectionLine: 0x888888, // neutral gray
	particle: 0x5b6bdb, // primary-500 (matches server)

	// Background
	background: 0x0d0d0d // surface-950 (dark background)
} as const;

// Emissive intensities for glow effects
export const EMISSIVE = {
	idle: 0.2,
	active: 0.5,
	pulse: 0.8
} as const;

// Convert hex to CSS color string
export function hexToCSS(hex: number): string {
	return `#${hex.toString(16).padStart(6, '0')}`;
}
