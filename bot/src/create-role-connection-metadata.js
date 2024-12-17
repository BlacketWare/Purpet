import 'dotenv/config';
import { REST, Routes } from 'discord.js';

const rest = new REST().setToken(process.env.TOKEN);

try {
	console.log('Creating role connection metadata.');

	const metadata = [
		{
			type: 7,
			key: 'admin_role',
			name: 'Admin',
			description: 'Purpet Admin'
		}
	];

	await rest.put(
		Routes.applicationRoleConnectionMetadata(process.env.CLIENT_ID),
		{
			headers: {
                'Content-Type': 'application/json'
            },
			body: metadata,
		},
	);

	console.log('Successfully role connection metadata.');
} catch (error) {
	console.error(error);
}