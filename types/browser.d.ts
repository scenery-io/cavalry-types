// Source: https://github.com/microsoft/TypeScript/blob/main/lib/lib.dom.d.ts#L17317-L17340
interface Console {
	/**
	 * Typically used in testing. Printed in green.
	 */
	log(...data: any[]): void
	/**
	 * Confirm when something expected has happened. Printed in green.
	 */
	info(...data: any[]): void
	/**
	 * Warn a user when they've done something unexpected. Printed in yellow.
	 */
	warn(...data: any[]): void
	/**
	 * Flag when something has gone wrong. Printed in red.
	 */
	error(...data: any[]): void
	/**
	 * Print a message to Terminal/Cmd Prompt.
	 */
	debug(...data: any[]): void
}

declare var console: Console
