const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('white')
		.setDescription('Add a white flag to the list.')
    .addStringOption(option =>
      option.setName('flag')
        .setDescription('You would date a person who [insert white flag here].')
        .setRequired(true)),
	async execute(interaction) {
    await interaction.reply({content: 'Successfully added white flag 🏳️: ' + interaction.options.getString('flag')});
	},
};