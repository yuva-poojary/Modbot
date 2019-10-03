const Command = require("../base/Command.js");
const Discord = require("discord.js");

class kick extends Command {
  constructor (client) {
    super(client, {
      name: "kick",
      description: "Kick a user from the server",
      category: "Moderation",
      usage: "kick @user <reason>",
      permLevel: "KM",
      aliases: ["kk"]
    });
  }

  async run (message, args, level) { // eslint-disable-line no-unused-vars
    
    
    let kickMember = message.mentions.members.first() || message.guild.members.get(args[0]) 
    if(!kickMember) return message.channel.send("Please provide a user to kick!")

    let reason = args.slice(1).join(" ")
    if(!reason) reason = "No reason given!"

    if(!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to do this!")

    kickMember.send(`Hello, you have been kicked from ${message.guild.name} for: ${reason}`).then(() => 
    kickMember.kick()).catch(err => console.log(err))

    message.channel.send(`**${kickMember.user.tag}** has been kicked`).then(m => m.delete(5000));

    let embed = new Discord.RichEmbed()
    .setColor("#ff0000")

    .addField("Moderation:", "kick")
    .addField("Kicked user:", kickMember.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())
    
        let sChannel = message.guild.channels.find(c => c.name === message.settings.modLogChannel)
        sChannel.send(embed)
  }
}

module.exports = kick;
