import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import config from '../../utils/config.js';

export function exampleCommandEmbed(interaction: ChatInputCommandInteraction<`cached`>): EmbedBuilder {
	const embed_ = new EmbedBuilder();
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

	embed_.setColor(config.color.primary);

	embed_.setAuthor({
		name: `${config.app.name} Command`,
		iconURL: interaction.client.user!.avatarURL(config.image.options)!,
	});

	embed_.addFields(
		{ name: `String`, value: `${string_}`, inline: true },
		{ name: `Integer`, value: `${integer_}`, inline: true },
		{ name: `Number`, value: `${number_}`, inline: true },
		{ name: `Boolean`, value: `${boolean_.toString()}`, inline: true },
		{ name: `User`, value: `${user_.tag}`, inline: true },
		{ name: `Member`, value: `${member_.user.tag}`, inline: true },
		{ name: `Channel`, value: `${channel_.name}`, inline: true },
		{ name: `Role`, value: `${role_.name}`, inline: true },
		{ name: `Mentionable`, value: `${mentionable_.toString()}`, inline: true },
		{ name: `Choice`, value: `${choice_}`, inline: true },
	);

	return embed_;
}
