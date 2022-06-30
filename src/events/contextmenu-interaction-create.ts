import { Client, ContextMenuCommandInteraction, InteractionType } from 'discord.js';
import { inject, injectable } from 'tsyringe';
import type { ContextMenu } from '../client/interfaces/contextmenu.js';
import type { Event } from '../client/interfaces/event.js';
import { CONTEXTMENUS } from '../client/tokens.js';

@injectable()
export default class ContextMenuInteractionCreateEvent implements Event {
	public name = `Context Menu Interaction Create`;
	public event = `interactionCreate`;

	public constructor(
		private readonly client: Client<true>,
		@inject(CONTEXTMENUS) private readonly contextmenus: Map<string, ContextMenu>,
	) {}

	public async execute() {
		this.client.on(this.event, async (interaction: ContextMenuCommandInteraction<`cached`>) => {
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
				console.error(error, error.message);
			}
		});
	}
}
