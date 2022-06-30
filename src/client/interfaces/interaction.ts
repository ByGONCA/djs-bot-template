export interface InteractionInterface {
	name: string;
	customId: string;
	execute: (...args: any) => unknown | Promise<unknown>;
}
