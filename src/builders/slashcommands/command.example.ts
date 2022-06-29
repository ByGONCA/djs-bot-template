import { SlashCommandBuilder } from 'discord.js';

export function exampleSlashCommand(): SlashCommandBuilder {
	const cmd_ = new SlashCommandBuilder();

	cmd_.setName(`command`);
	cmd_.setDescription(`Command`);

	cmd_.addStringOption((option_) => {
		option_.setName(`string`);
		option_.setDescription(`String`);
		option_.setRequired(true);
		return option_;
	});

	cmd_.addIntegerOption((option_) => {
		option_.setName(`integer`);
		option_.setDescription(`Integer`);
		return option_;
	});

	cmd_.addNumberOption((option_) => {
		option_.setName(`number`);
		option_.setDescription(`Number`);
		return option_;
	});

	cmd_.addBooleanOption((option_) => {
		option_.setName(`boolean`);
		option_.setDescription(`Boolean`);
		return option_;
	});

	cmd_.addUserOption((option_) => {
		option_.setName(`user`);
		option_.setDescription(`User`);
		return option_;
	});

	cmd_.addChannelOption((option_) => {
		option_.setName(`channel`);
		option_.setDescription(`Channel`);
		return option_;
	});

	cmd_.addRoleOption((option_) => {
		option_.setName(`role`);
		option_.setDescription(`Role`);
		return option_;
	});

	cmd_.addMentionableOption((option_) => {
		option_.setName(`mentionable`);
		option_.setDescription(`Mentionable`);
		return option_;
	});

	cmd_.addStringOption((option_) => {
		option_.setName(`choice`);
		option_.setDescription(`Choice`);
		option_.addChoices(
			{
				name: `Choice One`,
				value: `one`,
			},
			{
				name: `Choice Two`,
				value: `two`,
			},
			{
				name: `Choice Three`,
				value: `three`,
			},
		);
		return option_;
	});

	return cmd_;
}
