import { Client, Events, Interaction } from 'discord.js';
import { inject, injectable } from 'tsyringe';
import type { EventInterface } from '../client/interfaces/event.js';
import type { InteractionInterface } from '../client/interfaces/interaction.js';
import { INTERACTIONS } from '../client/tokens.js';
import logger from '../utils/logger.js';

@injectable()
export default class SelectMenuInteractionCreateEvent implements EventInterface {
	public readonly name = `Select Menu Interaction Create`;
	public readonly event = Events.InteractionCreate as string;

	public constructor(
		private readonly client: Client<true>,
		@inject(INTERACTIONS) private readonly interactions: Map<string, InteractionInterface>,
	) {}

	/**
	 * Select menu interaction create event executer.
	 */
	public execute() {
		this.client.on(this.event, async (interaction: Interaction<`cached`>) => {
			try {
				if (!interaction.isSelectMenu()) {
					return;
				}

				const menu_ = this.interactions.get(interaction.customId);

				if (!menu_) {
					return;
				}

				await menu_.execute(interaction);
			} catch (e) {
				const error = e as Error;
				logger.error(error, error.message);
			}
		});
	}
}
