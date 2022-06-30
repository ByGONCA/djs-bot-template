// * ============================ *
// * This file is safe to delete. *
// * ============================ *

import { Client, Interaction, InteractionType } from 'discord.js';
import { injectable } from 'tsyringe';
import type { Event } from '../client/interfaces/event.js';
import logger from '../utils/logger.js';

@injectable()
export default class InteractionCreateEvent implements Event {
	public name = `Interaction Create`;
	public event = `interactionCreate`;

	public constructor(private readonly client: Client<true>) {}

	public async execute() {
		this.client.on(this.event, async (interaction: Interaction<`cached`>) => {
			try {
				logger.debug(`Interaction Name: ${interaction.constructor.name}`);
				logger.debug(`Interaction Type: ${interaction.type}`);

				switch (interaction.type) {
					case InteractionType.ApplicationCommand:
						logger.debug(`Command Type: ${interaction.commandType}`);
						break;
					case InteractionType.MessageComponent:
						logger.debug(`Component Type: ${interaction.componentType}`);
						break;
				}

				logger.debug(`-> isButton: ${interaction.isButton()}`);
				logger.debug(`-> isChatInputCommand: ${interaction.isChatInputCommand()}`);
				logger.debug(`-> isRepliable: ${interaction.isRepliable()}`);
				logger.debug(`-> isSelectMenu: ${interaction.isSelectMenu()}`);
				logger.debug(`-> isContextMenuCommand: ${interaction.isContextMenuCommand()}`);
				logger.debug(`-> isMessageContextMenuCommand: ${interaction.isMessageContextMenuCommand()}`);
				logger.debug(`-> isUserContextMenuCommand: ${interaction.isUserContextMenuCommand()}`);
				// logger.debug(interaction);
			} catch (e) {
				const error = e as Error;
				logger.error(error, error.message);
			}
		});
	}
}
