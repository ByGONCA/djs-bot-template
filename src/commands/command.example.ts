import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { injectable } from 'tsyringe';
import { exampleSlashCommand } from '../builders/slashcommands/command.example.js';
import { Modules } from '../enums/modules.js';
import type { Command } from '../interfaces/command.js';
import { config } from '../utils/config.js';

@injectable()
export default class ExampleCommandCommand implements Command {
	public module = Modules.Miscellaneous;
	public data = exampleSlashCommand();
	public global = false;

	public async execute(interaction: ChatInputCommandInteraction<`cached`>) {
		try {
			const string_ = interaction.options.getString(`string`)!;
			const integer_ = interaction.options.getInteger(`integer`)!;
			const number_ = interaction.options.getNumber(`number`)!;
			const boolean_ = interaction.options.getBoolean(`boolean`)!;
			const user_ = interaction.options.getUser(`user`)!;
			const member_ = interaction.options.getMember(`user`)!;
			const channel_ = interaction.options.getChannel(`channel`)!;
			const role_ = interaction.options.getRole(`role`)!;
			const mentionable_ = interaction.options.getMentionable(`mentionable`)!;
			const choice_ = interaction.options.getNumber(`choice`)!;

			const embed_ = new EmbedBuilder();

			embed_.setColor(config().color.primary);

			embed_.setAuthor({
				name: `${config().app.name} Command`,
				iconURL: interaction.client.user?.avatarURL(config().image.options)!,
			});

			embed_.addFields(
				{ name: `String`, value: `${string_}`, inline: true },
				{ name: `Integer`, value: `${integer_}`, inline: true },
				{ name: `Number`, value: `${number_}`, inline: true },
				{ name: `Boolean`, value: `${boolean_}`, inline: true },
				{ name: `User`, value: `${user_}`, inline: true },
				{ name: `Member`, value: `${member_}`, inline: true },
				{ name: `Channel`, value: `${channel_}`, inline: true },
				{ name: `Role`, value: `${role_}`, inline: true },
				{ name: `Mentionable`, value: `${mentionable_}`, inline: true },
				{ name: `Choice`, value: `${choice_}`, inline: true },
			);

			return await interaction.reply({
				content: `${config().app.name} Command`,
				embeds: [embed_],
			});
		} catch (e) {
			const error = e as Error;
			return console.error(error, error.message);
		}
	}
}
