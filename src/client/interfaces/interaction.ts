export interface Interaction {
	name: string;
	customId: string;
	execute: (...args: any) => unknown | Promise<unknown>;
}
