import 'dotenv/config';
import { Client, Collection, IntentsBitField } from 'discord.js';
import fs from 'fs';

const client = new Client({ intents: new IntentsBitField(131071) });

client.commands = new Collection();

fs.readdir('./src/commands/', (err, files) => {
	if (err) return console.error(err);
	files.filter(f => f.endsWith('.js')).forEach(async (file) => {
		const command = (await import(`./commands/${file}`)).default;
		if (!command || !command.data) return console.error(`Command ${file} is invalid`);
		client.commands.set(command.data.name, command);
		console.log(`Command ${command.data.name} loaded`);
	});
});

fs.readdir('./src/events/', (err, files) => {
	if (err) return console.error(err);
	files.filter(f => f.endsWith('.js')).forEach(async (file) => {
		const event = (await import(`./events/${file}`)).default;
		if (!event || !event.name) return console.error(`Event ${file} is invalid`);
		if (event.once) client.once(event.name, (...args) => event.execute(...args));
		else client.on(event.name, (...args) => event.execute(...args));
		console.log(`Event ${event.name} loaded`);
	});
});

client.login(process.env.TOKEN);