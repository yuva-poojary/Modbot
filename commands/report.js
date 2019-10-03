
const Command = require("../base/Command.js");
const Discord = require("discord.js");

class report extends Command {
  constructor (client) {
    super(client, {
      name: "report",
      description: "To delte no of message",
      category: "Moderation",
      usage: "clear <no of message>",
      aliases: ["rp"]
    });
  }

  async run (message, args, level) { // eslint-disable-line no-unused-vars
    
  message.delete();
    if(args[0] == "help"){
      message.reply("Usage: !report <user> <reason>");
      return;
    }
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Cant find that user");
    let rreason = args.join(" ").slice(22);
    if(!rreason) return message.channel.send("supply a reason");

    let reportEmbed = new Discord.RichEmbed()
    
    .setColor("#ff0000")
    .addField("Moderation", "Reports")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", rreason);

    let reportschannel = message.guild.channels.find("name", message.settings.modLogChannel);
    if(!reportschannel) return message.channel.send(`Couldn't find ${message.settings.modLogChannel} channel`);
    reportschannel.send(reportEmbed);
  }
}
module.exports = report;