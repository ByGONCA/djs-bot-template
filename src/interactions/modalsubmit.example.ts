import type { ModalSubmitInteraction } from 'discord.js';
import type { InteractionInterface } from '../client/interfaces/interaction.js';
import logger from '../utils/logger.js';

export default class ExampleModalSubmitInteraction implements InteractionInterface {
	public name = `Example Modal Submit`;
	public customId = `modalId`;

	public async execute(interaction: ModalSubmitInteraction<`cached`>) {
		try {
			const short_ = interaction.fields.getTextInputValue(`short`);
			const paragraph_ = interaction.fields.getTextInputValue(`paragraph`);

			await interaction.reply({
				content: `Modal Submitted ${interaction.customId}\nShort: ${short_}\nParagraph:${paragraph_}`,
			});
		} catch (e) {
			const error = e as Error;
			logger.error(error, error.message);
		}
	}
}
