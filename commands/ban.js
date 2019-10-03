const Command = require("../base/Command.js");
const { RichEmbed} = require("discord.js");
class ban extends Command {
  constructor (client) {
    super(client, {
      name: "ban",
      description: "To ban a user from this server.",
      category: "Moderation",
      usage: "ban @user <reason>",
      permLevel: "BM",
      aliases: ["ban"]
    });
  }

  async run (message, args, level) { // eslint-disable-line no-unused-vars
    
    
   let banMember = message.mentions.members.first() || message.guild.members.get(args[0]) 
   if(!banMember) return message.channel.send("Please provide a user to ban!")

   let reason = args.slice(1).join(" ");
   if(!reason) reason = "No reason given!"

   if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to perform this command")

   banMember.send(`Hello, you have been banned from ${message.guild.name} for: ${reason}`).then(() =>
   message.guild.ban(banMember, { days: 1, reason: reason})).catch(err => console.log(err))

   message.channel.send(`**${banMember.user.tag}** has been banned`).then(m => m.delete(5000))
    let logo = message.author.iconURL

    let embed = new RichEmbed()
    .setTimestamp()
    .setColor("#ff0000")
    .addField("Moderation", "Ban")
    .addField("Banned User:", banMember.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    
    
        let sChannel = message.guild.channels.find(c => c.name === message.settings.modLogChannel)
        sChannel.send(embed)
  }
}

module.exports = ban;
