import * as THREE from 'three';

// Node positions (matching the layout in the plan)
export const POSITIONS = {
	client: new THREE.Vector3(-5, 0, 0),
	server: new THREE.Vector3(0, 0, 0),
	workerLaptop: new THREE.Vector3(5, 0, -2),
	workerCloud: new THREE.Vector3(5, 0, 0),
	workerGpu: new THREE.Vector3(5, 0, 2)
} as const;

// Create a curved path between two points
export function createCurve(start: THREE.Vector3, end: THREE.Vector3): THREE.CatmullRomCurve3 {
	const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
	// Add a slight upward arc
	mid.y += 0.5;

	return new THREE.CatmullRomCurve3([start.clone(), mid, end.clone()]);
}

// Define all connection paths
export function getConnectionCurves(): THREE.CatmullRomCurve3[] {
	const curves: THREE.CatmullRomCurve3[] = [];

	// Client -> Server
	curves.push(createCurve(POSITIONS.client, POSITIONS.server));

	// Server -> Workers
	curves.push(createCurve(POSITIONS.server, POSITIONS.workerLaptop));
	curves.push(createCurve(POSITIONS.server, POSITIONS.workerCloud));
	curves.push(createCurve(POSITIONS.server, POSITIONS.workerGpu));

	return curves;
}

// Get a point along a curve with looping
export function getPointOnCurve(
	curve: THREE.CatmullRomCurve3,
	t: number,
	offset: number = 0
): THREE.Vector3 {
	const adjustedT = (t + offset) % 1;
	return curve.getPoint(adjustedT);
}
