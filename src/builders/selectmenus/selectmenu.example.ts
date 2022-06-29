import { SelectMenuBuilder, SelectMenuOptionBuilder } from 'discord.js';

export function exampleSelectMenu(): SelectMenuBuilder {
	const select_ = new SelectMenuBuilder();

	select_.setCustomId(`selectMenuId`);
	select_.setPlaceholder(`Select Menu`);
	select_.setMinValues(1);
	select_.setMaxValues(3);
	select_.addOptions(
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

	return select_;
}
