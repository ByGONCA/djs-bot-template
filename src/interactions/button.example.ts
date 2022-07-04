import type { ButtonInteraction } from 'discord.js';
import type { InteractionInterface } from '../client/interfaces/interaction.js';
import logger from '../utils/logger.js';

export default class ExampleButtonInteraction implements InteractionInterface {
	public readonly name = `Example Button`;
	public readonly customId = `buttonId`;

	/**
	 * Example button interaction executer.
	 *
	 * @param {ButtonInteraction} interaction
	 */
	public async execute(interaction: ButtonInteraction<`cached`>) {
		try {
			await interaction.reply({ content: `Button Clicked ${interaction.customId}`, ephemeral: true });
		} catch (e) {
			const error = e as Error;
			logger.error(error, error.message);
		}
	}
}
