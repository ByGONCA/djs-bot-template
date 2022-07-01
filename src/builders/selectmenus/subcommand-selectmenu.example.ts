import { SelectMenuBuilder, SelectMenuOptionBuilder } from 'discord.js';

/**
 * Example subcommand select menu.
 *
 * @returns {SelectMenuBuilder}
 */
export function exampleSubcommandSelectMenu(): SelectMenuBuilder {
	return new SelectMenuBuilder()
		.setCustomId(`selectMenuId`)
		.setPlaceholder(`Subcommand Select Menu`)
		.setMinValues(1)
		.setMaxValues(3)
		.addOptions(
			new SelectMenuOptionBuilder()
				.setLabel(`Option One`)
				.setValue(`one`)
				.setDescription(`Option One Description`)
				.setDefault(true),
			new SelectMenuOptionBuilder()
				.setLabel(`Option Two`)
				.setValue(`two`)
				.setDescription(`Option Two Description`)
				.setDefault(false),
			new SelectMenuOptionBuilder()
				.setLabel(`Option Three`)
				.setValue(`three`)
				.setDescription(`Option Three Description`)
				.setDefault(false)
				.setEmoji({ name: `🎐` }),
		);
}
