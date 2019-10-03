// This event executes when a new guild (server) is left.

module.exports = class {
  constructor (client) {
    this.client = client;
  }

  async run (guild) {

    this.client.user.setActivity(`${this.client.settings.get("default").prefix}help | ${this.client.guilds.size} Servers`);
    // Well they're gone. Let's remove them from the settings and log it!
    this.client.settings.delete(guild.id);
    let { RichEmbed } = require("discord.js");
    let embed = new RichEmbed()
    .setAuthor(`${guild.memberCount} members`, guild.iconURL)
    .setColor("#ff0000")
    .setTimestamp()
    .setFooter("On")
    .addField("Bot Lefted", `${guild.name}`, true)
    .addField("Guild ID", `${guild.id}`, true)
    .addField("Guild Owner", `${guild.owner.user.tag}`, true)
    .addField("Owner ID", `${guild.owner.user.id}`, true)
    this.client.channels.get("624096233455222795").send(embed);
    
  }
};
