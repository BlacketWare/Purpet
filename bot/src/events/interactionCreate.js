import { CommandHandler } from '../handlers/index.js';

export default {
	name: 'interactionCreate',
	execute(interaction) {
		if (interaction.isCommand()) CommandHandler(interaction);
	},
}