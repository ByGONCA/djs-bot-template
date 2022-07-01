import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from 'discord.js';

/**
 * Example subcommand slashcommand.
 *
 * @returns {SlashCommandSubcommandsOnlyBuilder}
 */
export function exampleSubcommandSlashCommand(): SlashCommandSubcommandsOnlyBuilder {
	return new SlashCommandBuilder()
		.setName(`subcommand`)
		.setDescription(`Example subcommand`)
		.addSubcommand((subcommand_) => subcommand_.setName(`button`).setDescription(`Example subcommand Button`))
		.addSubcommand((subcommand_) => subcommand_.setName(`selectmenu`).setDescription(`Example subcommand Select Menu`))
		.addSubcommand((subcommand_) => subcommand_.setName(`modal`).setDescription(`Example subcommand Modal`));
}
