
const Command = require("../base/Command.js");
const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

class Stats extends Command {
  constructor (client) {
    super(client, {
      name: "stats",
      description: "Gives some useful bot statistics.",
      permLevel: "Bot Owner",
      usage: "stats",
      Category: "System",
    });
  }

  async run (message, args, level) { // eslint-disable-line no-unused-vars
    const duration = moment.duration(this.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    const stats = new Discord.RichEmbed()
    .setDescription("Bot Statastics")
    .setColor("#fff000")
    .addField(" Mem Usage ", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,true)
    .addField(" Uptime", `${duration}`,true)
    .addField(" Users", `${this.client.users.size.toLocaleString()}`,true)
    .addField("Servers", `${this.client.guilds.size.toLocaleString()}`,true)
     message.channel.send(stats)

  }
}
module.exports = Stats;