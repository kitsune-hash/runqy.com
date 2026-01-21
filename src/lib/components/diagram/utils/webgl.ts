// WebGL detection utilities

export function isWebGLAvailable(): boolean {
	if (typeof window === 'undefined') return false;

	try {
		const canvas = document.createElement('canvas');
		return !!(
			window.WebGLRenderingContext &&
			(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
		);
	} catch {
		return false;
	}
}

export function isWebGL2Available(): boolean {
	if (typeof window === 'undefined') return false;

	try {
		const canvas = document.createElement('canvas');
		return !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
	} catch {
		return false;
	}
}

// Mobile detection for fallback to static image
export function isMobile(): boolean {
	if (typeof window === 'undefined') return false;

	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	);
}

// Check if viewport is too small for good 3D experience
export function isSmallViewport(): boolean {
	if (typeof window === 'undefined') return false;

	return window.innerWidth < 640;
}

// Check if we should render 3D (WebGL available, not mobile, and adequate viewport)
export function shouldRender3D(): boolean {
	return isWebGLAvailable() && !isMobile() && !isSmallViewport();
}
