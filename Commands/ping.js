const discord = require('discord.js');

module.exports = {
    name: "ping",
    description: "Affiche le ping du bot",
    permission: "Aucune",
    dm: true,
    // options: [],

    async run(bot, message) {
      await message.reply(`Ping : ${bot.ws.ping}ms`);
    }
}