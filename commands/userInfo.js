module.exports = {
  ui: function(message, Discord) {
    var person = message.mentions.members.first();

    if (person == undefined) {
      var nick = message.member.nickname;
      var role = message.member.highestRole;
      var roleColor = message.member.displayHexColor;

      if(roleColor == "#000000") roleColor = "#99aab5";

      var embed = new Discord.RichEmbed()
        .setAuthor("User Info", message.author.displayAvatarURL)
        .setColor(roleColor)
        .setThumbnail(message.author.displayAvatarURL)
        .setFooter("This action was performed automatically")
        .setTimestamp()
        .addField("Username", message.author.username, false);
      if (!(nick == null || nick == message.author.username)) {
        embed.addField("Nickname", nick, false);
      }
      if (message.member.presence.activity != null) {
        embed.addField("Game", message.member.presence.activity.name, false);
      }
      embed.addField("Status", message.member.presence.status, false);
      embed.addField("Joined Date", message.member.joinedAt, false);
      embed.addField("Account Creation Date", message.author.createdAt, false);
      if (message.member.highestRole.name == "Secret Services") {
        role = message.guild.roles.get("354392788424589342");
      }
      embed.addField("Highest Role", role, false);

      message.channel
        .send({
          embed
        })
        .catch(console.error);
    } else {
      message.mentions.members.forEach(person => {
        var nick = person.nickname;
        var role = person.highestRole;
        var roleColor = person.displayHexColor;
  
        if(roleColor == "#000000") roleColor = "#99aab5";
        
        var embed = new Discord.RichEmbed()
          .setAuthor("User Info", person.user.displayAvatarURL)
          .setColor(roleColor)
          .setThumbnail(person.user.displayAvatarURL)
          .setFooter("This action was performed automatically")
          .setTimestamp()
          .addField("Username", person.user.username, false);
        if (!(nick == null || nick == message.author.username)) {
          embed.addField("Nickname", nick, false);
        }
        if (person.presence.activity != null) {
          embed.addField("Game", person.presence.activity.name, false);
        }
        embed.addField("Status", message.member.presence.status, false);
        embed.addField("Joined Date", person.joinedAt, false);
        embed.addField("Account Creation Date", person.user.createdAt, false);
        if (role.name == "Secret Services") {
          role = message.guild.roles.get("354392788424589342");
        }
        embed.addField("Highest Role", role, false);

        message.channel
          .send({
            embed
          }).catch(console.error)
      });
    }
  }
};
