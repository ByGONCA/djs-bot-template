import type { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import type { Module } from '../typings/module.js';

export interface Command {
	module: Module;
	data: SlashCommandBuilder;
	global?: boolean;
	execute: (interaction: ChatInputCommandInteraction<`cached`>) => unknown | Promise<unknown>;
}
