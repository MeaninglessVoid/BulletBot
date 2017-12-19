module.exports = {
  ui: function(message, Discord) {
    var person = message.mentions.members.first();

    if (person == undefined) {
      var nick = message.member.nickname;
      var role = message.member.highestRole;

      var embed = new Discord.MessageEmbed()
        .setAuthor("User Info", message.author.displayAvatarURL)
        .setColor("#9400ff")
        .setThumbnail(message.author.displayAvatarURL)
        .setFooter("This action was preformed automatically")
        .setTimestamp()
        .addField("Username", message.author.username, false);
      if (nick == null) nick = message.author.username;
      embed.addField("Nickname", nick, false);
      if (message.member.presence.game != null) {
        embed.addField("Game", message.member.presence.game.name, false);
      }
      embed.addField("Status", message.member.presence.status, false);
      embed.addField("Joined Date", message.member.joinedAt, false);
      embed.addField("Account Creation Date", message.author.createdAt, false);
      if (message.member.highestRole.name == "Secret Services")
        role = message.guild.roles.get("354392788424589342");
      embed.addField("Highest Role", role, false);

      message.channel
        .send({
          embed
        })
        .then((Message, err) => {
          if (err) {
            console.error(err);
          }
        });
    } else {
      message.mentions.members.forEach(function(person) {
        var nick = person.nickname;
        var role = person.highestRole;

        var embed = new Discord.MessageEmbed()
          .setAuthor("User Info", person.user.displayAvatarURL)
          .setColor("#9400ff")
          .setThumbnail(person.user.displayAvatarURL)
          .setFooter("This action was preformed automatically")
          .setTimestamp()
          .addField("Username", person.user.username, false);
        if (nick == null) nick = person.user.username;
        embed.addField("Nickname", nick, false);
        if (person.presence.game != null) {
          embed.addField("Game", "Playing " + person.presence.game.name, false);
        }
        embed.addField("Status", message.member.presence.status, false);
        embed.addField("Joined Date", person.joinedAt, false);
        embed.addField("Account Creation Date", person.user.createdAt, false);
        if (role.name == "Secret Services")
          role = message.guild.roles.get("354392788424589342");
        embed.addField("Highest Role", role, false);

        message.channel
          .send({
            embed
          })
          .then((Message, err) => {
            if (err) {
              console.error(err);
            }
          });
      });
    }
  }
};
