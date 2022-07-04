import type { ModalSubmitInteraction } from 'discord.js';
import type { InteractionInterface } from '../client/interfaces/interaction.js';
import logger from '../utils/logger.js';

export default class ExampleModalSubmitInteraction implements InteractionInterface {
	public readonly name = `Example Modal Submit`;
	public readonly customId = `modalId`;

	/**
	 * Example modal submit interaction executer.
	 *
	 * @param {ModalSubmitInteraction} interaction
	 */
	public async execute(interaction: ModalSubmitInteraction<`cached`>) {
		try {
			const short_ = interaction.fields.getTextInputValue(`short`);
			const paragraph_ = interaction.fields.getTextInputValue(`paragraph`);

			await interaction.reply({
				content: `Modal Submitted ${interaction.customId}\nShort: ${short_}\nParagraph:${paragraph_}`,
				ephemeral: true,
			});
		} catch (e) {
			const error = e as Error;
			logger.error(error, error.message);
		}
	}
}
