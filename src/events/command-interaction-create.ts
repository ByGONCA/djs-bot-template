import { ChatInputCommandInteraction, Client, InteractionType } from 'discord.js';
import { inject, injectable } from 'tsyringe';
import type { Command } from '../client/interfaces/command.js';
import type { Event } from '../client/interfaces/event.js';
import { commandsToken } from '../client/tokens.js';

@injectable()
export default class CommandInteractionCreateEvent implements Event {
	public constructor(
		private readonly client: Client<true>,
		@inject(commandsToken) private readonly commands: Map<string, Command>,
	) {}
	public name = `Command Interaction Create`;
	public event = `interactionCreate`;

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
				console.error(error, error.message);
			}
		});
	}
}
