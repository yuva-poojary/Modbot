const Command = require("../base/Command.js");
const Discord = require("discord.js");

class Reboot extends Command {
  constructor (client) {
    super(client, {
      name: "reboot",
      description: "If running under PM2, bot will restart.",
      category: "System",
      usage: "reboot",
      permLevel: "Bot Owner",
      aliases: ["update"]
    });
  }

  async run (message, args, level) { // eslint-disable-line no-unused-vars
  
       await message.channel.send(`> <a:emoji_4:623926975567757341> Bot is restarting`).then(m => {m.delete(5000)});
   
      this.client.commands.forEach(async cmd => {
       await this.client.unloadCommand(cmd);
      });
      process.exit(1);
    
    
  }
}

module.exports = Reboot;
