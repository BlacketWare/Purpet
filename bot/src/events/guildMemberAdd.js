import { EmbedBuilder } from 'discord.js';

const addSuffix = (num) => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = num % 100;
    return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}

export default {
    name: 'guildMemberAdd',
    async execute(guildMember) {
        // <client>.channels
        // All of the BaseChannels that the client is currently handling, mapped by their ids - as long as sharding isn't being used, this will be *every* channel in *every* guild the bot is a member of.
        // Note that DM channels will not be initially cached, and thus not be present in the Manager without their explicit fetching or use.
        const channel = await guildMember.client.channels.fetch('1199861594709041172');
        const channelEmbed = new EmbedBuilder()
            .setThumbnail('https://cdn.purpet.xyz/global/favicon.png')
            .setTitle('Welcome to Purpet!')
            .setDescription(`Welcome to Purpet, ${guildMember}! We're glad to have you here!\nYou are the ${addSuffix(guildMember.guild.memberCount)} member!`)
            .addFields(
                {
                    name: 'What is Purpet?',
                    value: '<#1196226667903991939>',
                    inline: true
                },
                {
                    name: 'Rules',
                    value: '<#1196213201545732156>',
                    inline: true
                }
            )
            .setColor(0x00f905);

        channel.send({ embeds: [channelEmbed] });

        try {
            const directMessageEmbed = new EmbedBuilder()
                .setThumbnail('https://cdn.purpet.xyz/global/favicon.png')
                .setTitle('Getting Started')
                .setDescription(`Hey ${guildMember}! Welcome to Purpet! We're glad to have you here!\n\nTo get started, please read the <#1196213201545732156> and <#1196226667903991939> channels.\n\nIf you have any questions, feel free to ask in <#1199894632797061250>.\n\nEnjoy your stay!`)
                
                .setColor(0x00f905);

            guildMember.send({ embeds: [directMessageEmbed] });
        } catch (err) { }
    }
}