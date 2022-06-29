import { ButtonBuilder, ButtonStyle } from 'discord.js';

export function exampleButton(): ButtonBuilder {
	const btn_ = new ButtonBuilder();

	btn_.setCustomId(`buttonId`);
	btn_.setDisabled(false);
	btn_.setEmoji({ name: '🎐' });
	btn_.setLabel(`Button Label`);
	btn_.setStyle(ButtonStyle.Secondary);

	return btn_;
}
