const fs = require('fs');

module.exports = async bot => {

  fs.readdirSync('./Commands/').filter(f => f.endsWith(".js")).forEach(async file => {

    let command = require(`../Commands/${file}`);
    if (!command.name || typeof command.name !== "string") throw new TypeError(`la commande ${file.slice(0, file.length -3 )} n'a pas de nom ou le nom n'est pas une chaîne de caractères`);
    bot.commands.set(command.name, command);
    console.log(`Commande chargée: ${file}`);

  });
};