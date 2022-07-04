// * ============================ *
// * This file is safe to delete. *
// * ============================ *

import { Client, Events, Interaction, InteractionType } from 'discord.js';
import { injectable } from 'tsyringe';
import type { EventInterface } from '../client/interfaces/event.js';
import logger from '../utils/logger.js';

@injectable()
export default class InteractionCreateEvent implements EventInterface {
	public readonly name = `Interaction Create`;
	public readonly event = Events.InteractionCreate as string;

	public constructor(private readonly client: Client<true>) {}

	/**
	 * Interaction create event executer.
	 */
	public execute() {
		this.client.on(this.event, (interaction: Interaction<`cached`>) => {
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
					default:
						break;
				}

				logger.debug(`-> isButton: ${interaction.isButton().toString()}`);
				logger.debug(`-> isChatInputCommand: ${interaction.isChatInputCommand().toString()}`);
				logger.debug(`-> isRepliable: ${interaction.isRepliable().toString()}`);
				logger.debug(`-> isSelectMenu: ${interaction.isSelectMenu().toString()}`);
				logger.debug(`-> isContextMenuCommand: ${interaction.isContextMenuCommand().toString()}`);
				logger.debug(`-> isMessageContextMenuCommand: ${interaction.isMessageContextMenuCommand().toString()}`);
				logger.debug(`-> isUserContextMenuCommand: ${interaction.isUserContextMenuCommand().toString()}`);
				// logger.debug(interaction);
			} catch (e) {
				const error = e as Error;
				logger.error(error, error.message);
			}
		});
	}
}
