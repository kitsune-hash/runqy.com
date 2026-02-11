export interface Task {
	name: string;
	display_name: string;
	category: 'ai' | 'media' | 'data';
	tags: string[];
	hardware: ('cpu' | 'gpu')[];
	gpu_required: boolean;
	mode: 'long_running' | 'oneshot';
	avg_latency: string;
	memory_mb: number;
	description: string;
	long_description: string;
	models: string[];
	tools: string[];
	use_cases: string[];
	input_example: string;
	output_example: string;
}

export const categoryMeta: Record<Task['category'], { label: string; emoji: string; color: string }> = {
	ai: { label: 'AI / ML', emoji: '🤖', color: 'text-violet-400' },
	media: { label: 'Media', emoji: '🎬', color: 'text-cyan-400' },
	data: { label: 'Data', emoji: '📊', color: 'text-emerald-400' }
};

export const categoryBgMeta: Record<Task['category'], { bg: string; border: string }> = {
	ai: { bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
	media: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
	data: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' }
};

export const taskEmojis: Record<string, string> = {
	'llm-inference': '🤖',
	'image-generation': '🎨',
	'whisper-transcription': '🎙️',
	'content-moderation': '🛡️',
	'text-embeddings': '🔢',
	'video-generation': '🎬',
	'text-to-speech': '🗣️',
	'zero-shot-classification': '🏷️',
	'batch-predictions': '📦',
	'video-transcoding': '🎞️',
	'background-removal': '✂️',
	'ocr': '📄',
	'image-captioning': '💬',
	'image-resize': '🖼️',
	'pdf-generation': '📑',
	'pdf-extraction': '📋',
	'face-detection-blur': '😶‍🌫️',
	'screenshot': '📸',
	'audio-waveform': '🎵',
	'etl-pipeline': '🔄',
	'report-generation': '📊',
	'data-quality': '✅',
	'web-scraping': '🕷️',
	'log-analysis': '📝',
	'time-series-forecast': '📈',
	'data-anonymization': '🔒',
	'database-migration': '🗄️',
	'rss-aggregation': '📰',
	'batch-geocoding': '🗺️'
};
