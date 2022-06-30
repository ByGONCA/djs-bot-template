import 'reflect-metadata';
import { RESTPostAPIApplicationCommandsJSONBody, Routes } from 'discord-api-types/v10';
import { config } from '../utils/config.js';
import readdirp from 'readdirp';
import { URL, fileURLToPath, pathToFileURL } from 'node:url';
import type { Command } from './interfaces/command.js';
import { container } from 'tsyringe';
import { REST } from '@discordjs/rest';
import type { ContextMenu } from './interfaces/contextmenu.js';

export class Deploy {
	public constructor(
		private readonly applicationGuildCommands: Array<RESTPostAPIApplicationCommandsJSONBody> = [],
		private readonly applicationGlobalCommands: Array<RESTPostAPIApplicationCommandsJSONBody> = [],
		private readonly rest = new REST({ version: `10` }).setToken(config().token),
	) {
		console.clear();
	}

	public async deleteApplicationCommands() {
		await this.rest.put(Routes.applicationCommands(config().app.clientId), { body: [] });
		await this.rest.put(Routes.applicationGuildCommands(config().app.clientId, config().app.guildId), { body: [] });
	}

	public async applicationCommandsHandler() {
		let count = 0;
		const files = readdirp(fileURLToPath(new URL(`../commands`, import.meta.url)), { fileFilter: `*.js` });

		console.info(`Command Handler: Deploying command(s)`);

		for await (const file of files) {
			const cmd_ = container.resolve<Command>((await import(pathToFileURL(file.fullPath).href)).default);

			if (cmd_.global) {
				console.info(`Command Handler: -> ${cmd_.data.name} (Global)`);
				this.applicationGlobalCommands.push(cmd_.data.toJSON());
			} else {
				console.info(`Command Handler: -> ${cmd_.data.name} (Guild)`);
				this.applicationGuildCommands.push(cmd_.data.toJSON());
			}

			count++;
		}

		console.info(`Command Handler: Deployed ${count} command(s)`);
	}

	public async applicationContextMenusHandler() {
		let count = 0;
		const files = readdirp(fileURLToPath(new URL(`../contextmenus`, import.meta.url)), { fileFilter: `*.js` });

		console.info(`Context Menu Handler: Deploying context menu(s)`);

		for await (const file of files) {
			const ctxmenu_ = container.resolve<ContextMenu>((await import(pathToFileURL(file.fullPath).href)).default);

			if (ctxmenu_.global) {
				console.info(`Context Menu Handler: -> ${ctxmenu_.data.name} (Global)`);
				this.applicationGlobalCommands.push(ctxmenu_.data.toJSON());
			} else {
				console.info(`Context Menu Handler: -> ${ctxmenu_.data.name} (Guild)`);
				this.applicationGuildCommands.push(ctxmenu_.data.toJSON());
			}

			count++;
		}

		console.info(`Context Menu Handler: Deployed ${count} context menu(s)`);
	}

	public async run() {
		try {
			console.info(`Started deploying command(s) and context menu(s).`);

			await this.deleteApplicationCommands();
			await this.applicationCommandsHandler();
			await this.applicationContextMenusHandler();

			if (this.applicationGlobalCommands.length > 0) {
				await this.rest.put(Routes.applicationCommands(config().app.clientId), {
					body: this.applicationGlobalCommands,
				});
			}

			if (this.applicationGuildCommands.length > 0) {
				await this.rest.put(Routes.applicationGuildCommands(config().app.clientId, config().app.guildId), {
					body: this.applicationGuildCommands,
				});
			}

			console.info(`Successfully deployed command(s) and context menu(s).`);
		} catch (e) {
			const error = e as Error;
			console.error(error, error.message);
		}
	}
}
