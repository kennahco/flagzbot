const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('red')
		.setDescription('Add a red flag to the list.')
    .addStringOption(option =>
      option.setName('flag')
        .setDescription('You would run away from a person who [insert red flag here].')
        .setRequired(true)),
	async execute(interaction) {
    await interaction.reply({content: 'Successfully added red flag 🚩: ' + interaction.options.getString('flag')});
	},
};