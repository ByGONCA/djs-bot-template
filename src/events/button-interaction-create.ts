import { ButtonInteraction, Client, InteractionType } from 'discord.js';
import { inject, injectable } from 'tsyringe';
import type { Event } from '../interfaces/event.js';
import type { Interaction } from '../interfaces/interaction.js';
import { interactionsToken } from '../client/tokens.js';

@injectable()
export default class ButtonInteractionCreateEvent implements Event {
	public constructor(
		private readonly client: Client<true>,
		@inject(interactionsToken) private readonly interactions: Map<string, Interaction>,
	) {}
	public name = `Button Interaction Create`;
	public event = `interactionCreate`;

	public async execute() {
		this.client.on(this.event, async (interaction: ButtonInteraction<`cached`>) => {
			try {
				if (interaction.type !== InteractionType.MessageComponent || !interaction.isButton()) {
					return;
				}

				const btn_ = this.interactions.get(interaction.customId);

				if (!btn_) {
					return;
				}

				await btn_.execute(interaction);
			} catch (e) {
				const error = e as Error;
				console.error(error, error.message);
			}
		});
	}
}
