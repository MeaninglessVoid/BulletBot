const moment = require("moment");

module.exports = {
  agree: function(message) {
    // member id: 306234601817505793
    // test id: 388157472885571584
    const member = message.guild.roles.get("306234601817505793");

    var days = moment().diff(message.author.createdAt, "days");

    if (days <= 7) {
      message.reply(
        "Your account is too young to be given the member role automatically, please contact <@&306234269435691008> or <@&322941932848283662> to resolve this issue, thank you!"
      );
      return;
    }

    message.member.addRole(member);

    message.delete();
  },
  invite: function(message) {
    message.reply("https://discord.gg/bulletbarry");
  },
  request: function(message, bot, Discord) {
    var embed = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.avatarURL())
      .setColor("#9400ff")
      .setFooter("This action was performed automatically")
      .setTimestamp();
    embed.addField("Request", message.content.substring(8), false);

    bot.guilds
      .first()
      .members.get("208801766496534528")
      .send({ embed })
      .catch(err => console.error(err));

    message.delete();
  },
  version: function(message, bot, Discord) {
    var embed = new Discord.MessageEmbed()
      .setAuthor("Bot Version", message.author.avatarURL())
      .setColor("#9400ff")
      .setThumbnail(bot.user.avatarURL())
      .setFooter("This action was performed automatically")
      .setTimestamp();
    var pjson = require("../package.json");
    embed.addField("Version", pjson.version, false);
    embed.addField(
      "Github Repository",
      "https://github.com/MeaninglessVoid/BulletBot",
      false
    );

    message.channel.send({ embed }).catch(err => console.error(err));
  }
};
