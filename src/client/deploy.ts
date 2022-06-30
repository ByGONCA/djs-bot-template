import 'reflect-metadata';
import { URL, fileURLToPath, pathToFileURL } from 'node:url';
import { REST } from '@discordjs/rest';
import { RESTPostAPIApplicationCommandsJSONBody, Routes } from 'discord-api-types/v10';
import readdirp from 'readdirp';
import { container } from 'tsyringe';
import type { CommandInterface } from './interfaces/command.js';
import type { ContextMenuInterface } from './interfaces/contextmenu.js';
import config from '../utils/config.js';
import logger from '../utils/logger.js';

export class Deploy {
	public constructor(
		private readonly applicationGuildCommands: Array<RESTPostAPIApplicationCommandsJSONBody> = [],
		private readonly applicationGlobalCommands: Array<RESTPostAPIApplicationCommandsJSONBody> = [],
		private readonly rest = new REST({ version: `10` }).setToken(config.token),
	) {
		console.clear();
	}

	public async deleteApplicationCommands() {
		await this.rest.put(Routes.applicationCommands(config.app.clientId), { body: [] });
		await this.rest.put(Routes.applicationGuildCommands(config.app.clientId, config.app.guildId), { body: [] });
	}

	public async applicationCommandsHandler() {
		let count = 0;
		const files = readdirp(fileURLToPath(new URL(`../commands`, import.meta.url)), { fileFilter: `*.js` });

		logger.info(`Command Handler: Deploying command(s)`);

		for await (const file of files) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
			const cmd_ = container.resolve<CommandInterface>((await import(pathToFileURL(file.fullPath).href)).default);

			if (cmd_.global) {
				logger.debug(`Command Handler: -> ${cmd_.data.name} (Global)`);
				this.applicationGlobalCommands.push(cmd_.data.toJSON());
			} else {
				logger.debug(`Command Handler: -> ${cmd_.data.name} (Guild)`);
				this.applicationGuildCommands.push(cmd_.data.toJSON());
			}

			count++;
		}

		logger.info(`Command Handler: Deployed ${count} command(s)`);
	}

	public async applicationContextMenusHandler() {
		let count = 0;
		const files = readdirp(fileURLToPath(new URL(`../contextmenus`, import.meta.url)), { fileFilter: `*.js` });

		logger.info(`Context Menu Handler: Deploying context menu(s)`);

		for await (const file of files) {
			const ctxmenu_ = container.resolve<ContextMenuInterface>(
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
				(await import(pathToFileURL(file.fullPath).href)).default,
			);

			if (ctxmenu_.global) {
				logger.debug(`Context Menu Handler: -> ${ctxmenu_.data.name} (Global)`);
				this.applicationGlobalCommands.push(ctxmenu_.data.toJSON());
			} else {
				logger.debug(`Context Menu Handler: -> ${ctxmenu_.data.name} (Guild)`);
				this.applicationGuildCommands.push(ctxmenu_.data.toJSON());
			}

			count++;
		}

		logger.info(`Context Menu Handler: Deployed ${count} context menu(s)`);
	}

	public async run() {
		try {
			logger.info(`Started deploying command(s) and context menu(s).`);

			await this.deleteApplicationCommands();
			await this.applicationCommandsHandler();
			await this.applicationContextMenusHandler();

			if (this.applicationGlobalCommands.length > 0) {
				await this.rest.put(Routes.applicationCommands(config.app.clientId), {
					body: this.applicationGlobalCommands,
				});
			}

			if (this.applicationGuildCommands.length > 0) {
				await this.rest.put(Routes.applicationGuildCommands(config.app.clientId, config.app.guildId), {
					body: this.applicationGuildCommands,
				});
			}

			logger.info(`Successfully deployed command(s) and context menu(s).`);
		} catch (e) {
			const error = e as Error;
			logger.error(error, error.message);
		}
	}
}
