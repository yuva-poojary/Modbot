const Command = require("../base/Command.js");
const Discord = require("discord.js");

class say extends Command {
  constructor (client) {
    super(client, {
      name: "say",
      description: "Simply its sends messages in current channel",
      usage: "say <your message>",
      permLevel: "MM",
      aliases: ["tell"]
    });
  }

  async run (message, args, level) { // eslint-disable-line no-unused-vars
    
    
    
    	message.delete();
    let Discord = require("discord.js");
    let embed = new Discord.RichEmbed()
    .setColor("#ff0000")
    .addField("title", `\` ${message.author.username} \` `)
    
  
 message.channel.send(embed);
    
    
}
}


module.exports = say;