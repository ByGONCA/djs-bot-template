import { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

export function exampleModal(): ModalBuilder {
	const modal_ = new ModalBuilder();

	modal_.setCustomId(`modalId`);
	modal_.setTitle(`Modal`);

	modal_.addComponents(
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

	return modal_;
}
