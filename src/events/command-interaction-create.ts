import { ChatInputCommandInteraction, Client, InteractionType } from 'discord.js';
import { inject, injectable } from 'tsyringe';
import type { Command } from '../client/interfaces/command.js';
import type { Event } from '../client/interfaces/event.js';
import { COMMANDS } from '../client/tokens.js';
import logger from '../utils/logger.js';

@injectable()
export default class CommandInteractionCreateEvent implements Event {
	public name = `Command Interaction Create`;
	public event = `interactionCreate`;

	public constructor(
		private readonly client: Client<true>,
		@inject(COMMANDS) private readonly commands: Map<string, Command>,
	) {}

	public async execute() {
		this.client.on(this.event, async (interaction: ChatInputCommandInteraction<`cached`>) => {
			try {
				if (interaction.type !== InteractionType.ApplicationCommand || !interaction.isChatInputCommand()) {
					return;
				}

				const cmd_ = this.commands.get(interaction.commandName);

				if (!cmd_) {
					return;
				}

				await cmd_.execute(interaction);
			} catch (e) {
				const error = e as Error;
				logger.error(error, error.message);
			}
		});
	}
}
