import { ChatInputCommandInteraction, ActionRowBuilder, ButtonBuilder } from 'discord.js';
import { injectable } from 'tsyringe';
import { exampleButton } from '../builders/buttons/button.example.js';
import { exampleModal } from '../builders/modals/modal.example.js';
import { exampleSubcommandSlashCommand } from '../builders/slashcommands/subcommand.example.js';
import { Modules } from '../client/enums/modules.js';
import type { Command } from '../client/interfaces/command.js';
import config from '../utils/config.js';
import logger from '../utils/logger.js';

@injectable()
export default class ExampleSubcommandCommand implements Command {
	public module = Modules.Miscellaneous;
	public data = exampleSubcommandSlashCommand();
	public global = false;

	public async execute(interaction: ChatInputCommandInteraction<`cached`>) {
		try {
			switch (interaction.options.getSubcommand()) {
				case `button`:
					return await interaction.reply({
						content: `${config.app.name} Button Subcommand`,
						components: [new ActionRowBuilder<ButtonBuilder>().addComponents(exampleButton())],
					});
				case `selectmenu`:
					return await interaction.reply({
						content: `${config.app.name} Select Menu Subcommand`,
						// ! Confirmed Bug | Has PR #8174
						// ! Wait till https://github.com/discordjs/discord.js/pull/8174 is merged and released.
						// ! components: [new ActionRowBuilder<SelectMenuBuilder>().addComponents(exampleSelectMenu())],
					});
				case `modal`:
					return await interaction.showModal(exampleModal());
				default:
					return await interaction.reply({ content: `${config.app.name} Subcommand` });
			}
		} catch (e) {
			const error = e as Error;
			return logger.error(error, error.message);
		}
	}
}
