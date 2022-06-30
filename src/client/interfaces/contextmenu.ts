import type { ContextMenuCommandBuilder, ContextMenuCommandInteraction } from 'discord.js';

export interface ContextMenuInterface {
	data: ContextMenuCommandBuilder;
	global?: boolean;
	execute: (interaction: ContextMenuCommandInteraction<`cached`>) => unknown | Promise<unknown>;
}
