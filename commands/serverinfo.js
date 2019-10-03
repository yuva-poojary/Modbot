const Command = require("../base/Command.js");
const Discord = require("discord.js");

class serverinfo extends Command {
  constructor (client) {
    super(client, {
      name: "serverinfo",
      description: "Simply its shows the info about server",
      usage: "serverinfo",
      aliases: ["si"]
    });
  }

  async run (message, args, level) { // eslint-disable-line no-unused-vars
    
    
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);

    message.channel.send(serverembed);
    	
  }
}

module.exports = serverinfo;
