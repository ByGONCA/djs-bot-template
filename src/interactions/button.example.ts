import type { ButtonInteraction } from 'discord.js';
import type { Interaction } from '../client/interfaces/interaction.js';
import logger from '../utils/logger.js';

export default class ExampleButtonInteraction implements Interaction {
	public name = `Example Button`;
	public customId = `buttonId`;

	public async execute(interaction: ButtonInteraction<`cached`>) {
		try {
			await interaction.reply({ content: `Button Clicked ${interaction.customId}` });
		} catch (e) {
			const error = e as Error;
			logger.error(error, error.message);
		}
	}
}
