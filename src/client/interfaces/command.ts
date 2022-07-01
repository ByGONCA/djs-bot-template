import type { ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from 'discord.js';
import type { Module } from '../typings/module.js';

export interface CommandInterface {
	module: Module;
	data:
		| SlashCommandBuilder
		| SlashCommandSubcommandsOnlyBuilder
		| Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
	global?: boolean;
	execute: (interaction: ChatInputCommandInteraction<`cached`>) => unknown | Promise<unknown>;
}
