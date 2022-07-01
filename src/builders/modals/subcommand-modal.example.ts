import { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

/**
 * Example subcommand modal.
 *
 * @returns {ModalBuilder}
 */
export function exampleSubcommandModal(): ModalBuilder {
	return new ModalBuilder()
		.setCustomId(`modalId`)
		.setTitle(`Subcommand Modal`)
		.addComponents(
			new ActionRowBuilder<TextInputBuilder>().addComponents(
				new TextInputBuilder()
					.setCustomId('short')
					.setRequired(true)
					.setMinLength(1)
					.setMaxLength(50)
					.setLabel('Short')
					.setStyle(TextInputStyle.Short)
					.setPlaceholder('Short'),
			),
			new ActionRowBuilder<TextInputBuilder>().addComponents(
				new TextInputBuilder()
					.setCustomId('paragraph')
					.setRequired(false)
					.setMinLength(1)
					.setMaxLength(500)
					.setLabel('Paragraph')
					.setStyle(TextInputStyle.Paragraph)
					.setPlaceholder('Paragraph'),
			),
		);
}
