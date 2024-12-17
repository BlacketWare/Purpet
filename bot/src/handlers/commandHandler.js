export default function (interaction) {
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) return;
	console.log(`${interaction.user.tag} (${interaction.user.id}) in #${interaction.channel.name} (${interaction.channel.id}) triggered an interaction with command ${command.data.name}`);

	try {
		command.execute(interaction);
	} catch (error) {
		console.error(error);
		// TODO: make this reply properly to deferred interactions
		interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
}