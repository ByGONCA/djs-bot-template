import { ContextMenuCommandBuilder, ApplicationCommandType, PermissionFlagsBits } from 'discord.js';

export function exampleContextMenu(): ContextMenuCommandBuilder {
	const ctxmenu_ = new ContextMenuCommandBuilder();

	ctxmenu_.setName(`Context Menu`);
	ctxmenu_.setType(ApplicationCommandType.Message);
	ctxmenu_.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);
	ctxmenu_.setDMPermission(false);

	return ctxmenu_;
}
