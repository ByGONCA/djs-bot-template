import type { ChatInputCommandInteraction } from 'discord.js';
import { injectable } from 'tsyringe';
import { exampleCommandEmbed } from '../builders/embeds/command-embed.example.js';
import { exampleSlashCommand } from '../builders/slashcommands/command.example.js';
import { Modules } from '../client/enums/modules.js';
import type { Command } from '../client/interfaces/command.js';
import config from '../utils/config.js';

@injectable()
export default class ExampleCommandCommand implements Command {
	public module = Modules.Miscellaneous;
	public data = exampleSlashCommand();
	public global = false;

	public async execute(interaction: ChatInputCommandInteraction<`cached`>) {
		try {
			return await interaction.reply({
				content: `${config.app.name} Command`,
				embeds: [exampleCommandEmbed(interaction)],
			});
		} catch (e) {
			const error = e as Error;
			return console.error(error, error.message);
		}
	}
}
