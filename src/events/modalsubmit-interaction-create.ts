import { Client, InteractionType, ModalSubmitInteraction } from 'discord.js';
import { inject, injectable } from 'tsyringe';
import type { Event } from '../client/interfaces/event.js';
import type { Interaction } from '../client/interfaces/interaction.js';
import { INTERACTIONS } from '../client/tokens.js';
import logger from '../utils/logger.js';

@injectable()
export default class ModalSubmitInteractionCreateEvent implements Event {
	public name = `Modal Submit Interaction Create`;
	public event = `interactionCreate`;

	public constructor(
		private readonly client: Client<true>,
		@inject(INTERACTIONS) private readonly interactions: Map<string, Interaction>,
	) {}

	public async execute() {
		this.client.on(this.event, async (interaction: ModalSubmitInteraction<`cached`>) => {
			try {
				if (interaction.type !== InteractionType.ModalSubmit) {
					return;
				}

				const modal_ = this.interactions.get(interaction.customId);

				if (!modal_) {
					return;
				}

				await modal_.execute(interaction);
			} catch (e) {
				const error = e as Error;
				logger.error(error, error.message);
			}
		});
	}
}
