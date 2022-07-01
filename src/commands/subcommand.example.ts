import { ChatInputCommandInteraction, ActionRowBuilder, ButtonBuilder } from 'discord.js';
import { injectable } from 'tsyringe';
import { exampleSubcommandButton } from '../builders/buttons/subcommand-button.example.js';
import { exampleSubcommandModal } from '../builders/modals/subcommand-modal.example.js';
import { exampleSubcommandSlashCommand } from '../builders/slashcommands/subcommand.example.js';
import { Modules } from '../client/enums/modules.js';
import type { CommandInterface } from '../client/interfaces/command.js';
import config from '../utils/config.js';
import logger from '../utils/logger.js';

@injectable()
export default class ExampleSubcommandCommand implements CommandInterface {
	public readonly module = Modules.Miscellaneous;
	public readonly data = exampleSubcommandSlashCommand();
	public readonly global = false;

	/**
	 * Example subcommand command executer.
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @returns
	 */
	public async execute(interaction: ChatInputCommandInteraction<`cached`>) {
		try {
			const buttonRow_ = new ActionRowBuilder<ButtonBuilder>().addComponents(exampleSubcommandButton());
			// const selectMenuRow_ = new ActionRowBuilder<SelectMenuBuilder>().addComponents(exampleSubcommandSelectMenu());

			switch (interaction.options.getSubcommand()) {
				case `button`:
					return await interaction.reply({
						content: `${config.app.name} Button Subcommand`,
						components: [buttonRow_],
						ephemeral: true,
					});
				case `selectmenu`:
					return await interaction.reply({
						content: `${config.app.name} Select Menu Subcommand`,
						// ! Confirmed Bug | Has PR #8174
						// ! Wait till https://github.com/discordjs/discord.js/pull/8174 is merged and released.
						// components: [selectMenuRow_],
						ephemeral: true,
					});
				case `modal`:
					return await interaction.showModal(exampleSubcommandModal());
				default:
					return await interaction.reply({ content: `${config.app.name} Subcommand`, ephemeral: true });
			}
		} catch (e) {
			const error = e as Error;
			return logger.error(error, error.message);
		}
	}
}
