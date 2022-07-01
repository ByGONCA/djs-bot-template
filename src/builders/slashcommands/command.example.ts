import { SlashCommandBuilder } from 'discord.js';

/**
 * Example command slashcommand.
 *
 * @returns {Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">}
 */
export function exampleCommandSlashCommand(): Omit<SlashCommandBuilder, `addSubcommand` | `addSubcommandGroup`> {
	return new SlashCommandBuilder()
		.setName(`command`)
		.setDescription(`Example application command`)
		.addStringOption((option_) => option_.setName(`string`).setDescription(`String`).setRequired(true))
		.addIntegerOption((option_) => option_.setName(`integer`).setDescription(`Integer`))
		.addNumberOption((option_) => option_.setName(`number`).setDescription(`Number`))
		.addBooleanOption((option_) => option_.setName(`boolean`).setDescription(`Boolean`))
		.addUserOption((option_) => option_.setName(`user`).setDescription(`User`))
		.addChannelOption((option_) => option_.setName(`channel`).setDescription(`Channel`))
		.addRoleOption((option_) => option_.setName(`role`).setDescription(`Role`))
		.addMentionableOption((option_) => option_.setName(`mentionable`).setDescription(`Mentionable`))
		.addStringOption((option_) =>
			option_.setName(`choice`).setDescription(`Choice`).addChoices(
				{
					name: `Choice One`,
					value: `one`,
				},
				{
					name: `Choice Two`,
					value: `two`,
				},
				{
					name: `Choice Three`,
					value: `three`,
				},
			),
		);
}
