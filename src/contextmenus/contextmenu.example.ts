import type { ContextMenuCommandInteraction } from 'discord.js';
import { injectable } from 'tsyringe';
import { exampleContextMenu } from '../builders/contextmenus/contextmenu.example.js';
import type { ContextMenu } from '../client/interfaces/contextmenu.js';
import { config } from '../utils/config.js';

@injectable()
export default class ExampleContextMenuContextMenu implements ContextMenu {
	public data = exampleContextMenu();
	public global = false;

	public async execute(interaction: ContextMenuCommandInteraction<`cached`>) {
		try {
			return await interaction.reply({ content: `${config().app.name} Context Menu` });
		} catch (e) {
			const error = e as Error;
			return console.error(error, error.message);
		}
	}
}
