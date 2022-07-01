import { ContextMenuCommandBuilder, ApplicationCommandType, PermissionFlagsBits } from 'discord.js';

/**
 * Example context menu.
 *
 * @returns {ContextMenuCommandBuilder}
 */
export function exampleContextMenu(): ContextMenuCommandBuilder {
	return new ContextMenuCommandBuilder()
		.setName(`Context Menu`)
		.setType(ApplicationCommandType.Message)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false);
}
