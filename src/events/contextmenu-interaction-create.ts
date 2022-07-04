import { Client, Interaction, InteractionType } from 'discord.js';
import { inject, injectable } from 'tsyringe';
import type { ContextMenuInterface } from '../client/interfaces/contextmenu.js';
import type { EventInterface } from '../client/interfaces/event.js';
import { CONTEXTMENUS } from '../client/tokens.js';
import logger from '../utils/logger.js';

@injectable()
export default class ContextMenuInteractionCreateEvent implements EventInterface {
	public name = `Context Menu Interaction Create`;
	public event = `interactionCreate`;

	public constructor(
		private readonly client: Client<true>,
		@inject(CONTEXTMENUS) private readonly contextmenus: Map<string, ContextMenuInterface>,
	) {}

	/**
	 * Context menu interaction create event executer.
	 */
	public execute() {
		this.client.on(this.event, async (interaction: Interaction<`cached`>) => {
			try {
				if (interaction.type !== InteractionType.ApplicationCommand || !interaction.isContextMenuCommand()) {
					return;
				}

				const ctxmenu_ = this.contextmenus.get(interaction.commandName);

				if (!ctxmenu_) {
					return;
				}

				await ctxmenu_.execute(interaction);
			} catch (e) {
				const error = e as Error;
				logger.error(error, error.message);
			}
		});
	}
}
