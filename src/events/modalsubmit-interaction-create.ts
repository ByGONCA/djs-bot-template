import { Client, InteractionType, ModalSubmitInteraction } from 'discord.js';
import { inject, injectable } from 'tsyringe';
import type { Event } from '../client/interfaces/event.js';
import type { Interaction } from '../client/interfaces/interaction.js';
import { interactionsToken } from '../client/tokens.js';

@injectable()
export default class ModalSubmitInteractionCreateEvent implements Event {
	public constructor(
		private readonly client: Client<true>,
		@inject(interactionsToken) private readonly interactions: Map<string, Interaction>,
	) {}
	public name = `Modal Submit Interaction Create`;
	public event = `interactionCreate`;

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
				console.error(error, error.message);
			}
		});
	}
}
