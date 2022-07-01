import { ButtonBuilder, ButtonStyle } from 'discord.js';

/**
 * Example subcommand button.
 *
 * @returns {ButtonBuilder}
 */
export function exampleSubcommandButton(): ButtonBuilder {
	return new ButtonBuilder()
		.setCustomId(`buttonId`)
		.setDisabled(false)
		.setEmoji({ name: `🚀` })
		.setLabel(`Subcommand Button`)
		.setStyle(ButtonStyle.Secondary);
}
