import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const pong = await interaction.reply({ content: 'Pong!', fetchReply: true });

		const embed = new EmbedBuilder()
			.setTitle('Pong!')
			.setDescription(`🚀 Roundtrip latency: ${pong.createdTimestamp - interaction.createdTimestamp}ms
			💓 WebSocket heartbeat: ${interaction.client.ws.ping == -1 ? 'Unable to check, please try later..' : Math.round(interaction.client.ws.ping) + 'ms'}`)
			.setColor(0x00f905);
		
		interaction.editReply({ content: null, embeds: [ embed ] });
	},
}