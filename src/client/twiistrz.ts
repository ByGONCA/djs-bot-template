import 'reflect-metadata';
import { URL, fileURLToPath, pathToFileURL } from 'node:url';
import { Client, GatewayIntentBits, Options, Partials } from 'discord.js';
import readdirp from 'readdirp';
import { container } from 'tsyringe';
import type { CommandInterface } from './interfaces/command.js';
import type { ContextMenuInterface } from './interfaces/contextmenu.js';
import type { EventInterface } from './interfaces/event.js';
import type { InteractionInterface } from './interfaces/interaction.js';
import { COMMANDS, CONTEXTMENUS, INTERACTIONS } from './tokens.js';
import config from '../utils/config.js';
import logger from '../utils/logger.js';

export class Twiistrz extends Client {
	public constructor(
		private readonly commands = new Map<string, CommandInterface>(),
		private readonly contextmenus = new Map<string, ContextMenuInterface>(),
		private readonly interactions = new Map<string, InteractionInterface>(),
	) {
		super({
			// * Just add what intents you need to use.
			intents: [
				GatewayIntentBits.DirectMessageReactions,
				GatewayIntentBits.DirectMessageTyping,
				GatewayIntentBits.DirectMessages,
				GatewayIntentBits.GuildBans,
				GatewayIntentBits.GuildEmojisAndStickers,
				GatewayIntentBits.GuildIntegrations,
				GatewayIntentBits.GuildInvites,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.GuildMessageReactions,
				GatewayIntentBits.GuildMessageTyping,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.GuildPresences,
				GatewayIntentBits.GuildScheduledEvents,
				GatewayIntentBits.GuildVoiceStates,
				GatewayIntentBits.GuildWebhooks,
				GatewayIntentBits.Guilds,
				GatewayIntentBits.MessageContent,
			],
			// * Just add what partials you need to use.
			partials: [
				Partials.Channel,
				Partials.GuildMember,
				Partials.GuildScheduledEvent,
				Partials.Message,
				Partials.Reaction,
				Partials.ThreadMember,
				Partials.User,
			],
			makeCache: Options.cacheWithLimits({
				MessageManager: 100,
				StageInstanceManager: 10,
				VoiceStateManager: 10,
			}),
		});

		super.setMaxListeners(20);

		container.register(Client, { useValue: this });
		container.register(COMMANDS, { useValue: this.commands });
		container.register(CONTEXTMENUS, { useValue: this.contextmenus });
		container.register(INTERACTIONS, { useValue: this.interactions });

		console.clear();
	}

	public async commandsHandler() {
		let count = 0;
		const files = readdirp(fileURLToPath(new URL(`../commands`, import.meta.url)), { fileFilter: `*.js` });

		logger.info(`Command Handler: Loading command(s)`);

		for await (const file of files) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
			const cmd_ = container.resolve<CommandInterface>((await import(pathToFileURL(file.fullPath).href)).default);

			logger.debug(`Command Handler: -> ${cmd_.data.name}`);
			count++;

			this.commands.set(cmd_.data.name, cmd_);
		}

		logger.info(`Command Handler: Loaded ${count} command(s)`);
	}

	public async contextMenuHandler() {
		let count = 0;
		const files = readdirp(fileURLToPath(new URL(`../contextmenus`, import.meta.url)), { fileFilter: `*.js` });

		logger.info(`Context Menu Handler: Loading context menu(s)`);

		for await (const file of files) {
			const ctxmenu_ = container.resolve<ContextMenuInterface>(
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
				(await import(pathToFileURL(file.fullPath).href)).default,
			);

			logger.debug(`Context Menu Handler: -> ${ctxmenu_.data.name}`);
			count++;

			this.contextmenus.set(ctxmenu_.data.name, ctxmenu_);
		}

		logger.info(`Context Menu Handler: Loaded ${count} context menu(s)`);
	}

	public async interactionsHandler() {
		let count = 0;
		const files = readdirp(fileURLToPath(new URL(`../interactions`, import.meta.url)), { fileFilter: `*.js` });

		logger.info(`Interaction Handler: Loading interaction(s)`);

		for await (const file of files) {
			const interaction_ = container.resolve<InteractionInterface>(
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
				(await import(pathToFileURL(file.fullPath).href)).default,
			);

			logger.debug(`Interaction Handler: -> ${interaction_.name}`);
			count++;

			this.interactions.set(interaction_.customId, interaction_);
		}

		logger.info(`Interaction Handler: Loaded ${count} interaction(s)`);
	}

	public async eventsHandler() {
		let count = 0;
		const files = readdirp(fileURLToPath(new URL(`../events`, import.meta.url)), { fileFilter: `*.js` });

		logger.info(`Event Handler: Loading event(s)`);

		for await (const file of files) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
			const event_ = container.resolve<EventInterface>((await import(pathToFileURL(file.fullPath).href)).default);

			if (event_.disabled) {
				continue;
			}

			logger.debug(`Event Handler: -> ${event_.name}`);
			count++;

			await event_.execute();
		}

		logger.info(`Event Handler: Loaded ${count} event(s)`);
	}

	public async start() {
		try {
			await this.commandsHandler();
			await this.contextMenuHandler();
			await this.interactionsHandler();
			await this.eventsHandler();

			await super.login(config.token);
		} catch (e) {
			const error = e as Error;
			logger.error(error, error.message);
		}
	}
}
