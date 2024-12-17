import { DeployHandler } from '../handlers/index.js';
import { ActivityType, PresenceUpdateStatus } from 'discord.js';

const presences = [
	{
		name: 'purpet.xyz',
		type: ActivityType.Watching,
		status: PresenceUpdateStatus.DoNotDisturb,
	},
	{
		name: 'Purpet',
		type: ActivityType.Playing,
		status: PresenceUpdateStatus.DoNotDisturb,
	}
]

// create function to grab random from presences object and put into format of { activities: [{ name: 'with discord.js', type: 'PLAYING' }], status: 'idle' }
const randomPresence = (client) => {
	const random = Math.floor(Math.random() * presences.length);

	const presence = presences[random];
	const presenceData = {
		activities: [{ name: presence.name, type: presence.type }],
		status: presence.status,
	};

	client.user.setPresence(presenceData);
}

export default {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		DeployHandler(client);

		randomPresence(client);
		setInterval(randomPresence, 1 * 60 * 1000, client);
	},
}