import { REST, Routes } from 'discord.js';

export default async function (client) {
	if (process.env.NODE_ENV !== 'development') return;

	const rest = new REST().setToken(process.env.TOKEN);

	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(client.user.id, process.env.GUILD_ID),
			{ body: client.commands.map(command => command.data.toJSON()) },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
}