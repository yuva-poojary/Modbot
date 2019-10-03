
const Command = require("../base/Command.js");
const Discord = require("discord.js");

class Clear extends Command {
  constructor (client) {
    super(client, {
      name: "clear",
      description: "To delte no of message",
      category: "Moderation",
      usage: "clear <no of message>",
      permLevel: "MM", 
      aliases: ["purge"]
    });
  }

  async run (message, args, level) { // eslint-disable-line no-unused-vars
    
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(5000));
    
    let embed = new Discord.RichEmbed()
    .setColor("#ff0000")
    .addField("Moderation", "Bulkdelete")
    .addField("Modertor", message.author.username)
              .addField("Channel", message.channel)
    .addField("No of message", args[0])
    let channel = message.guild.channels.find("name", message.settings.modLogChannel)
    channel.send(embed);
    
  
  });
  }
}
module.exports = Clear;