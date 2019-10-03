const Command = require("../base/Command.js");
const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const { RichEmbed } = require("discord.js");
const { getMember,formatDate } = require("../functions.js");

class whois extends Command {
  constructor (client) {
    super(client, {
      name: "whois",
      description: "Simply its shows a user info",
      usage: "whois @user",
      permLevel: "MM",
      aliases: ["user-info"]
    });
  }

  async run (message, args, level) { // eslint-disable-line no-unused-vars
    
  
        const member = getMember(message, args.join(" "));

        // Member variables
        const joined = formatDate(member.joinedAt);
        const roles = member.roles
            .filter(r => r.id !== message.guild.id)
            .map(r => r).join(", ") || 'none';

        // User variables
        const created = formatDate(member.user.createdAt);

        const embed = new RichEmbed()
            .setFooter(member.displayName, member.user.displayAvatarURL)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)

            .addField('Member information:', stripIndents`**> Display name:** ${member.displayName}
            **> Joined at:** ${joined}
            **> Roles:** ${roles}`, true)

            .addField('User information:', stripIndents`**> ID:** ${member.user.id}
            **> Username**: ${member.user.username}
            **> Tag**: ${member.user.tag}
            **> Created at**: ${created}`, true)
            
            .setTimestamp()

    
          
            
        if (member.user.presence.game) 
            embed.addField('Currently playing', stripIndents`**> Name:** ${member.user.presence.game.name}`);

        message.channel.send(embed);
}
}


module.exports = whois;
