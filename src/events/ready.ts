import { ActivityType, Client, Events } from 'discord.js';
import { injectable } from 'tsyringe';
import type { EventInterface } from '../client/interfaces/event.js';
import logger from '../utils/logger.js';

@injectable()
export default class ReadyEvent implements EventInterface {
	public readonly name = `Ready`;
	public readonly event = Events.ClientReady as string;

	public constructor(private readonly client: Client<true>) {}

	/**
	 * Ready event executer.
	 */
	public execute() {
		this.client.once(this.event, () => {
			this.client.user.setPresence({
				status: `online`,
				activities: [
					{
						name: `Twiistrz#5866`,
						type: ActivityType.Watching,
					},
				],
			});

			logger.info(`${this.client.user.tag}: Client Ready!`);
		});
	}
}
