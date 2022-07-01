import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import config from '../../utils/config.js';

/**
 * Example command embed.
 *
 * @param {ChatInputCommandInteraction} interaction
 * @returns {EmbedBuilder}
 */
export function exampleCommandEmbed(interaction: ChatInputCommandInteraction<`cached`>): EmbedBuilder {
	const options_ = interaction.options;

	const string_: string = options_.getString(`string`)!;
	const integer_: string = options_.getInteger(`integer`)?.toString() ?? `n/a`;
	const number_: string = options_.getNumber(`number`)?.toString() ?? `n/a`;
	const boolean_: string = options_.getBoolean(`boolean`)?.toString() ?? `n/a`;
	const user_: string = options_.getUser(`user`)?.toString() ?? `n/a`;
	const member_: string = options_.getMember(`user`)?.toString() ?? `n/a`;
	const channel_: string = options_.getChannel(`channel`)?.toString() ?? `n/a`;
	const role_: string = options_.getRole(`role`)?.toString() ?? `n/a`;
	const mentionable_: string = options_.getMentionable(`mentionable`)?.toString() ?? `n/a`;
	const choice_: string = options_.getString(`choice`) ?? `n/a`;

	return new EmbedBuilder()
		.setColor(config.color.primary)
		.setAuthor({
			name: `${config.app.name} Command`,
			iconURL: interaction.client.user!.avatarURL(config.image.options)!,
		})
		.addFields(
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
}
