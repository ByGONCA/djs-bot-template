import 'reflect-metadata';
import { Client, GatewayIntentBits, Options, Partials } from 'discord.js';
import { container } from 'tsyringe';
import { COMMANDS, CONTEXTMENUS, INTERACTIONS } from './tokens.js';
import config from '../utils/config.js';
import { URL, fileURLToPath, pathToFileURL } from 'node:url';
import type { Command } from './interfaces/command.js';
import type { Interaction } from './interfaces/interaction.js';
import type { ContextMenu } from './interfaces/contextmenu.js';
import type { Event } from './interfaces/event.js';
import readdirp from 'readdirp';

export class Twiistrz extends Client {
	public constructor(
		private readonly commands = new Map<string, Command>(),
		private readonly contextmenus = new Map<string, ContextMenu>(),
		private readonly interactions = new Map<string, Interaction>(),
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

		console.info(`Command Handler: Loading command(s)`);

		for await (const file of files) {
			const cmd_ = container.resolve<Command>((await import(pathToFileURL(file.fullPath).href)).default);

			console.info(`Command Handler: -> ${cmd_.data.name}`);
			count++;

			this.commands.set(cmd_.data.name, cmd_);
		}

		console.info(`Command Handler: Loaded ${count} command(s)`);
	}

	public async contextMenuHandler() {
		let count = 0;
		const files = readdirp(fileURLToPath(new URL(`../contextmenus`, import.meta.url)), { fileFilter: `*.js` });

		console.info(`Context Menu Handler: Loading context menu(s)`);

		for await (const file of files) {
			const ctxmenu_ = container.resolve<ContextMenu>((await import(pathToFileURL(file.fullPath).href)).default);

			console.info(`Context Menu Handler: -> ${ctxmenu_.data.name}`);
			count++;

			this.contextmenus.set(ctxmenu_.data.name, ctxmenu_);
		}

		console.info(`Context Menu Handler: Loaded ${count} context menu(s)`);
	}

	public async interactionsHandler() {
		let count = 0;
		const files = readdirp(fileURLToPath(new URL(`../interactions`, import.meta.url)), { fileFilter: `*.js` });

		console.info(`Interaction Handler: Loading interaction(s)`);

		for await (const file of files) {
			const interaction_ = container.resolve<Interaction>((await import(pathToFileURL(file.fullPath).href)).default);

			console.info(`Interaction Handler: -> ${interaction_.name}`);
			count++;

			this.interactions.set(interaction_.customId!, interaction_);
		}

		console.info(`Interaction Handler: Loaded ${count} interaction(s)`);
	}

	public async eventsHandler() {
		let count = 0;
		const files = readdirp(fileURLToPath(new URL(`../events`, import.meta.url)), { fileFilter: `*.js` });

		console.info(`Event Handler: Loading event(s)`);

		for await (const file of files) {
			const event_ = container.resolve<Event>((await import(pathToFileURL(file.fullPath).href)).default);

			if (event_.disabled) {
				continue;
			}

			console.info(`Event Handler: -> ${event_.name}`);
			count++;

			await event_.execute();
		}

		console.info(`Event Handler: Loaded ${count} event(s)`);
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
			console.error(error, error.message);
		}
	}
}
