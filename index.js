require("dotenv").config();
const discord = require('discord.js');
const intents = new discord.IntentsBitField(3276799);
const bot = new discord.Client({intents});
const token = process.env.bot_token_test_perso;
// const token = process.env.bot_token;
const loadCommands = require('./Loaders/loadCommands');
const loadEvents = require('./Loaders/loadEvents');

bot.commands = new discord.Collection();

bot.login(token);
loadCommands(bot);
loadEvents(bot);


