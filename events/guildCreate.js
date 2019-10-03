// This event executes when a new guild (server) is joined.

module.exports = class {
  constructor (client) {
    this.client = client;
  }

  async run (guild) {

    this.client.user.setActivity(`${this.client.settings.get("default").prefix}help | ${this.client.guilds.size}`);
    let Discord = require("discord.js");
    let embed = new Discord.RichEmbed()
    .setColor("#fff000")
    .setTimestamp()
    .setAuthor(`${guild.memberCount} members`, guild.iconURL)
    .addField("Bot Joined", `${guild.name}`,true)
    .addField("Guild ID", `${guild.id}`,true)
    .addField("Guild Owner", `${guild.owner.user.tag}`,true)
    .addField("Owner ID", `${guild.owner.user.id}`, true)
    let channel = this.client.channels.get("624096233455222795")
    channel.send(embed);
  }
};
