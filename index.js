// Require the necessary discord.js classes
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const keepAlive = require('./server');
const loadFile = require('./load-file')

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

var redFlags = loadFile('./red-flags.csv');
var whiteFlags = loadFile('./white-flags.csv');
// entry 172 is start of custom white flags
// entry 222 is start of custom red flags
var fNames =  loadFile('./fem-names.csv');
var mNames =  loadFile('./masc-names.csv');

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log("flagzbot is ONLINE!");
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

	if (!command) return;

  var args;

  if (interaction.commandName === "battle" || interaction.commandName === "roll") {
    args = {whiteFlags: whiteFlags, redFlags: redFlags, fNames: fNames, mNames: mNames};
  } else if (interaction.commandName === "red" || interaction.commandName === "white") {
    args = './' + interaction.commandName + '-flags.csv';
  }
    /*
    try {
      await command.execute(interaction, whiteFlags, redFlags, fNames, mNames);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
    
  } else if (interaction.commandName === "red" || interaction.commandName === "white") {
    var flag = interaction.options.getString('flag').trim();
    if (flag.includes("$") ||
        flag.includes("`") ||
        flag.includes("{") ||
        flag.includes("}") ||
        flag.includes("\\")) {
      await interaction.reply({ content: 'Flag not accepted: No special characters allowed ($, `, {, }, \\)' });
      return;
    }

    if (interaction.commandName === "red") {
      redFlags.push(flag[0].toUpperCase() + flag.slice(1));
      fs.appendFile('./red-flags.csv', '\n' + flag[0].toUpperCase() + flag.slice(1), function (err) {
        if (err) throw err;
      });
    } else if (interaction.commandName === "white") {
      whiteFlags.push(flag[0].toUpperCase() + flag.slice(1));
      fs.appendFile('./white-flags.csv', '\n' + flag[0].toUpperCase() + flag.slice(1), function (err) {
        if (err) throw err;
      });
    }*/

  try {
    await command.execute(interaction, args);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

keepAlive();
// Login to Discord with your client's token
client.login(process.env['TOKEN']);