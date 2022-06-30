import type { ContextMenuCommandBuilder, ContextMenuCommandInteraction } from 'discord.js';

export interface ContextMenu {
	data: ContextMenuCommandBuilder;
	global?: boolean;
	execute: (interaction: ContextMenuCommandInteraction<`cached`>) => unknown | Promise<unknown>;
}
