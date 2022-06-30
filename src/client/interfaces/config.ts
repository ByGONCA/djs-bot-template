import type { ImageURLOptions } from '@discordjs/rest';
import type { ColorResolvable } from 'discord.js';

export interface ConfigInterface {
	token: string;
	env: string;

	app: {
		name: string;
		clientId: string;
		guildId: string;
	};

	color: {
		primary: ColorResolvable;
		secondary: ColorResolvable;
		danger: ColorResolvable;
		success: ColorResolvable;
	};

	image: {
		options: ImageURLOptions;
	};

	link: {
		repository: string;
		invite: string;
		support: string;
	};
}
