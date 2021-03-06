const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('battle')
		.setDescription('Roll two lovely people and pick your date.')
    .addSubcommand(subcommand =>
      subcommand
        .setName('a')
        .setDescription('Roll two lovely people and pick your date. (all names)'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('f')
        .setDescription('Roll two lovely people and pick your date. (traditionally female names)'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('m')
        .setDescription('Roll two lovely people and pick your date. (traditionally male names)')),
	async execute(interaction, rolls) {
    const embed = new MessageEmbed()
      .setColor('#D42525')
      .setDescription('*Who would you rather date?*')
      .setThumbnail('https://imgur.com/OgAhxoH.png')
      .addFields(
        { name: `${rolls[0].name} š\n\u200B`, value: `š³ļø\n${rolls[0].whiteFlagA}\n\nš³ļø\n${rolls[0].whiteFlagB}\n\nš©\n${rolls[0].redFlag}\n\u200B`, inline: true },
        { name: `${rolls[1].name} š\n\u200B`, value: `š³ļø\n${rolls[1].whiteFlagA}\n\nš³ļø\n${rolls[1].whiteFlagB}\n\nš©\n${rolls[1].redFlag}\n\u200B`, inline: true },
        { name: '\u200B', value: '\u200B', inline: true }
      )
      .setFooter({ text: `š for ${rolls[0].name} | š for ${rolls[1].name}`});
		const message = await interaction.reply({embeds: [embed], fetchReply: true });
    message.react('š');
    message.react('š');
	},
};