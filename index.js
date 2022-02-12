// Require the necessary discord.js classes
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const keepAlive = require('./server');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

var redFlags = [];
var whiteFlags = [];
// entry 172 is start of custom white flags
// entry 222 is start of custom red flags

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

function uniqueRolls(commandName, subcommand) {
  var rolls = [];
  var nameRolls;
  var whiteFlagRolls;
  var redFlagRolls;

  if (commandName === 'battle') n = 2;
  if (commandName === 'roll') n = 1;
  if (subcommand === 'a') nameRolls = getRandom(names, n)
  if (subcommand === 'f') nameRolls = getRandom(fNames, n);
  if (subcommand === 'm') nameRolls = getRandom(mNames, n);

  whiteFlagRolls = getRandom(whiteFlags, n*2);
  redFlagRolls = getRandom(redFlags, n);

  for (i = 0; i < n; i++) {
    rolls[i] = {name: nameRolls[i], whiteFlagA: whiteFlagRolls[i],
                whiteFlagB: whiteFlagRolls[i + n], redFlag: redFlagRolls[i]}
  };
  return rolls;
}

fs.readFile('./names.csv', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  row = data.split('\n');
  fNames = row[0].split(',');
  mNames = row[1].split(',');
  names = fNames.concat(mNames);
})

fs.readFile('./red-flags.csv', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  redFlags = data.split('\n');
})

fs.readFile('./white-flags.csv', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  whiteFlags = data.split('\n');
})

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log("flagzbot is ONLINE!");
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

	if (!command) return;

  if (interaction.commandName === "battle" || interaction.commandName === "roll") {
    try {
      await command.execute(interaction, uniqueRolls(interaction.commandName, interaction.options.getSubcommand()));
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
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
});

keepAlive();
// Login to Discord with your client's token
client.login(process.env['TOKEN']);