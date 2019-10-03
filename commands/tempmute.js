const Command = require("../base/Command.js");
const Discord = require("discord.js");
const ms = require("ms");



class tempmute extends Command {
  constructor (client) {
    super(client, {
      name: "tempmute",
      description: "To mute a user for given time",
      category: "Moderation",
      usage: "tempmute @user <reason>",
      permLevel: "MR",
      aliases: ["mute"]
    });
  }

  async run (message, args, level) { // eslint-disable-line no-unused-vars
    
    message.delete();
  if(args[0] == "help"){
    message.reply("Usage: !tempmute <user> <1s/m/h/d>");
    return;
  }
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("MANAGE_GUILD")) return message.reply("Can't mute moderator!");
  let reason = args.slice(2).join(" ");
  if(!reason) return message.reply("Please supply a reason.");

  let muterole = message.guild.roles.find(`name`, "Muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  let servername = message.guild.name
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!");

  message.delete().catch(O_o=>{});

  try{
    await tomute.send(`Hi! You've been muted for ${mutetime} in __${servername}__ server for ${reason} `);
  }catch(e){
    message.channel.send(`A user has been muted... but their DMs are locked. They will be muted for ${mutetime}`)
  }

  let muteembed = new Discord.RichEmbed()
  .setColor("#ff0000")
  .addField("Moderation", "Muted")
  .addField("Muted User", tomute)
  .addField("Modertor", message.author.username)
  .addField("Muted in", message.channel)
  .addField("Time", message.createdAt)
  .addField("Length", mutetime)
  .addField("Reason", reason);

  let incidentschannel = message.guild.channels.find(`name`, message.settings.modLogChannel);
  
  incidentschannel.send(muteembed);
  message.channel.send(`✅ <@${tomute.id}> has been muted for ${mutetime}`);

  await(tomute.addRole(muterole.id));

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));



    
  }
}

module.exports = tempmute;
