const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const spacer = '\u3000'.repeat(7) + '\u200B';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Roll a balanced human being with two white flags and one red flag.')
    .addSubcommand(subcommand =>
      subcommand
        .setName('a')
        .setDescription('Roll a balanced human being with two white flags and one red flag. (all names)'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('f')
        .setDescription('Roll a balanced human being with two white flags and one red flag. (traditionally female names)'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('m')
        .setDescription('Roll a balanced human being with two white flags and one red flag. (traditionally male names)')),
	async execute(interaction, rolls) {
    const embed = new MessageEmbed()
    .setColor('#D42525')
    .setDescription('*Would you date this person?*')
    .setThumbnail('https://imgur.com/OgAhxoH.png')
    .addFields(
      { name: rolls[0].name, value: '\u200B', inline: false },
      { name: '🏳️' + spacer, value: rolls[0].whiteFlagA + '\n\u200B', inline: true },
      { name: '🏳️' + spacer, value: rolls[0].whiteFlagB + '\n\u200B', inline: true },
      { name: '🚩' + spacer, value: rolls[0].redFlag + '\n\u200B', inline: true }
    )
    .setFooter({ text: '💖 Oh yeah! | 💔 No way!'});
		const message = await interaction.reply({embeds: [embed], fetchReply: true });
    message.react('💖');
    message.react('💔');
	},
};