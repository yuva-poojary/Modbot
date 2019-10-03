
const Command = require("../base/Command.js");
const Discord = require("discord.js");

class removerole extends Command {
  constructor (client) {
    super(client, {
      name: "removerole",
      description: "To remove a role from user",
      usage: "removerole @user @role",
      category: "Moderation",
      permLevel: "MR", 
      aliases: ["rr", "roleremove"]
    });
  }

  async run (message, args, level) {
    

    let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
    if(!rMember) return message.channel.send("Please provide a user to remove a role too.")
    let role = message.guild.roles.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first()
    if(!role) return message.channel.send("Please provide a role to remove from said user.") 
    

    if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to perform this command.")

    if(!rMember.roles.has(role.id)) {
        return message.channel.send(`${rMember.displayName}, doesnt have the role!`)
    } else {
        await rMember.removeRole(role.id).catch(e => console.log(e.message))
        message.channel.send(`The role, ${role.name}, has been removed from ${rMember.displayName}.`)
    }

    let embed = new Discord.RichEmbed()
    .setColor("#ff0000")
    .setDescription("")
    .addField("Moderation:", "Addrole")
    .addField("User:", rMember.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Role", role)
    .addField("Date:", message.createdAt.toLocaleString())
    
        let sChannel = message.guild.channels.find(c => c.name === message.settings.modLogChannel)
        sChannel.send(embed);
     
    
  }
}


  
module.exports = removerole;