import { ActivityType, Client } from 'discord.js';
import { injectable } from 'tsyringe';
import type { Event } from '../client/interfaces/event.js';

@injectable()
export default class ReadyEvent implements Event {
	public constructor(private readonly client: Client<true>) {}
	public name = `Ready`;
	public event = `ready`;

	public async execute() {
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

			console.info(`${this.client.user.tag}: Client Ready!`);
		});
	}
}
