// Source: https://github.com/microsoft/TypeScript/blob/main/lib/lib.dom.d.ts#L17317-L17340
interface Console {
	error(...data: any[]): void
	debug(...data: any[]): void
	info(...data: any[]): void
	log(...data: any[]): void
	warn(...data: any[]): void
}

declare var console: Console
