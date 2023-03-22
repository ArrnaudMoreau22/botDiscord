const discord = require('discord.js');

module.exports = {
  
  name: "clear",
  description: "Clear le nombre de messages spécifié",
  permissions: discord.PermissionFlagsBits.ManageMessages,
  dm: false,

Options: [
    {
      type: "number",
      name: "nombre",
      description: "Le nombre de messages à supprimer",
      required: true
    },
    {
      name: "salon",
      description: "Le salon dans lequel supprimer les messages",
      type: "channel",
      required: false
    }
  ],

    async run(bot, message, args){

      let channel = args.getChannel("salon")
      if(!channel) channel = message.channel;
      if (channel.id !== message.channel.id && !message.guild.channels.cache.get(channel.id)) return message.reply("Ce salon n'existe pas !");
      
      console.log("channel: " + channel)
      console.log("args: " + JSON.stringify(args))
      let number = args.getNumber("nombre");
      console.log("number: " + number)

      if(parseInt(number) <= 0 || parseInt(number) > 100) return message.reply("Le nombre de messages à supprimer doit être compris entre 1 et 100 !");

      await message.deferReply();

      try{

        let messages = await channel.bulkDelete(parseInt(number));

        await message.followUp({content: `J'ai supprimé ${messages.size} message(s) dans le salon ${channel} !`, ephemeral: true});

      }catch(err){
        let messages = [...(await channel.messages.fetch()).filter(msg => !msg.interaction && (Date.now() - msg.createdAt) <= 1209600000).values()];
        if(messages.length <= 0) return message.followUp("Aucun message à supprimer car ils datent tous de plus de 14 jours !");

        await channel.bulkDelete(messages);
        await message.followUp({content: `J'ai pu supprimer uniquement ${messages.length} message(s) dans le salon ${channel} car les autres dataient de plus de 14 jours !`, ephemeral: true});

        console.log(err);
      }
    }
}  