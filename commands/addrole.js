
const Command = require("../base/Command.js");
const Discord = require("discord.js");

class addrole extends Command {
  constructor (client) {
    super(client, {
      name: "addrole",
      category: "Moderation",
      description: "To give a role to user",
      usage: "addrole @user @role",
      permLevel: "MR", 
      aliases: ["role","r"]
    });
  }

  async run (message, args, level) {
    

    let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
    if(!rMember) return message.channel.send("Please provide a user to add a role too.")
    let role = message.guild.roles.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first()
    if(!role) return message.channel.send("Please provide a role.") 
    

    if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to perform this command.")

    if(rMember.roles.has(role.id)) {
        return message.channel.send(`${rMember.displayName}, already has the role!`)
    } else {
        await rMember.addRole(role.id).catch(e => console.log(e.message))
  message.channel.send(`**${rMember}was given the ${role} role**`);
      let ar = new Discord.RichEmbed()
      
      .setColor("#ff0000")
      .addField("Moderation", "Addrole")
      .addField("Given to", rMember.user.username)
      .addField("Given by", message.author.username)
      .addField("Role", role)
      .addField("Date", message.createdAt.toLocaleString())
     let log = message.guild.channels.find('name',message.settings.modLogChannel)
     log.send(ar);
    
  }
}
}

  
module.exports = addrole;