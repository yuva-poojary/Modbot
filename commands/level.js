const Command = require("../base/Command.js");
const Discord = require("discord.js");
const xp = require("../xp.json");
const fs = require("fs");
class level extends Command {
  constructor (client) {
    super(client, {
      name: "level",
      description: "To check your xp level in server",
      usage: "level",
      aliases: ["rank"]
    });
  }

  async run (message, args, level) { // eslint-disable-line no-unused-vars
    if(message.settings.levelSystem === "true"){
    
  if(!xp[message.author.id]){
   xp[message.author.id] = {
     xp: 0,
     level: 0
  };
}
  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvlXp = curlvl * 150;
  let difference = nxtLvlXp - curxp;

  let lvlEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#ff0000")
  .addField("Level", curlvl, true)
  .addField("XP", curxp, true)
  .setFooter(`${difference} XP til level up`, message.author.displayAvatarURL);

  message.channel.send(lvlEmbed).then(msg => {msg.delete(5000)});
    
    	
    };
  }
}


module.exports = level;
