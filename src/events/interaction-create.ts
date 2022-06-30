// * ============================ *
// * This file is safe to delete. *
// * ============================ *

import { Client, Interaction, InteractionType } from 'discord.js';
import { injectable } from 'tsyringe';
import type { Event } from '../client/interfaces/event.js';

@injectable()
export default class InteractionCreateEvent implements Event {
	public name = `Interaction Create`;
	public event = `interactionCreate`;

	public constructor(private readonly client: Client<true>) {}

	public async execute() {
		this.client.on(this.event, async (interaction: Interaction<`cached`>) => {
			try {
				console.debug(`\nInteraction Name:`, interaction.constructor.name);
				console.debug(`Interaction Type:`, interaction.type);

				switch (interaction.type) {
					case InteractionType.ApplicationCommand:
						console.debug(`Command Type:`, interaction.commandType);
						break;
					case InteractionType.MessageComponent:
						console.debug(`Component Type:`, interaction.componentType);
						break;
				}

				console.debug(`🎐 isButton:`, interaction.isButton());
				console.debug(`🎐 isChatInputCommand:`, interaction.isChatInputCommand());
				console.debug(`🎐 isRepliable:`, interaction.isRepliable());
				console.debug(`🎐 isSelectMenu:`, interaction.isSelectMenu());
				console.debug(`🎐 isContextMenuCommand:`, interaction.isContextMenuCommand());
				console.debug(`🎐 isMessageContextMenuCommand:`, interaction.isMessageContextMenuCommand());
				console.debug(`🎐 isUserContextMenuCommand:`, interaction.isUserContextMenuCommand());
				// console.debug(interaction);
			} catch (e) {
				const error = e as Error;
				console.error(error, error.message);
			}
		});
	}
}
