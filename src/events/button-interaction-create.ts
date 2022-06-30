import { ButtonInteraction, Client, InteractionType } from 'discord.js';
import { inject, injectable } from 'tsyringe';
import type { Event } from '../client/interfaces/event.js';
import type { Interaction } from '../client/interfaces/interaction.js';
import { INTERACTIONS } from '../client/tokens.js';

@injectable()
export default class ButtonInteractionCreateEvent implements Event {
	public name = `Button Interaction Create`;
	public event = `interactionCreate`;

	public constructor(
		private readonly client: Client<true>,
		@inject(INTERACTIONS) private readonly interactions: Map<string, Interaction>,
	) {}

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
