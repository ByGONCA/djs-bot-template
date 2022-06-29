import { SlashCommandBuilder } from 'discord.js';

export function exampleSubcommandSlashCommand(): SlashCommandBuilder {
	const cmd_ = new SlashCommandBuilder();

	cmd_.setName(`subcommand`);
	cmd_.setDescription(`Subcommand`);

	cmd_.addSubcommand((subcommand_) => {
		subcommand_.setName(`button`);
		subcommand_.setDescription(`Button`);
		return subcommand_;
	});

	cmd_.addSubcommand((subcommand_) => {
		subcommand_.setName(`selectmenu`);
		subcommand_.setDescription(`Select Menu`);
		return subcommand_;
	});

	cmd_.addSubcommand((subcommand_) => {
		subcommand_.setName(`modal`);
		subcommand_.setDescription(`Modal`);
		return subcommand_;
	});

	return cmd_;
}
