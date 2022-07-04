import type { Events } from 'discord.js';

export interface EventInterface {
	name: string;
	event: string;
	disabled?: boolean;
	execute: (...args: any) => unknown | Promise<unknown>;
}
