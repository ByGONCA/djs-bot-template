import type { SelectMenuInteraction } from 'discord.js';
import type { InteractionInterface } from '../client/interfaces/interaction.js';
import logger from '../utils/logger.js';

export default class ExampleSelectMenuInteraction implements InteractionInterface {
	public readonly name = `Example Select Menu`;
	public readonly customId = `selectMenuId`;

	public async execute(interaction: SelectMenuInteraction<`cached`>) {
		try {
			const values_ = interaction.values;

			await interaction.reply({
				content: `${values_.join(`\n`)}`,
				ephemeral: true,
			});
		} catch (e) {
			const error = e as Error;
			logger.error(error, error.message);
		}
	}
}
