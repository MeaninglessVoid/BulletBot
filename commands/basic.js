const moment = require("moment");

module.exports = {
  agree: function(message) {

    var days = moment().diff(message.author.createdAt, "days");

    if (days <= 7) {
      message.reply(
        "Your account is too young to be given the member role automatically, please contact <@&306234269435691008> or <@&322941932848283662> to resolve this issue, thank you!"
      );
      return;
    }

    if (message.member != undefined) {
      message.member.addRole("306234601817505793").catch(console.error); //add member role
    } else {
      message.channel.send(`I am having trouble giving this member the member role, may you please do so manually. @Mod @Admin`)
    }

    message.delete();
  },
  invite: function(message) {
    message.reply("https://discord.gg/bulletbarry");
  },
  request: function(message, bot, Discord) {
    var embed = new Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setColor("#9400ff")
      .setFooter("This action was performed automatically")
      .setTimestamp();
    embed.addField("Request", message.content.substring(8), false);

    bot.guilds
      .first()
      .members.get("208801766496534528")
      .send({ embed })
      .catch(console.error);

    message.delete();
  },
  version: function(message, bot, Discord) {
    var embed = new Discord.RichEmbed()
      .setAuthor("Bot Version", message.author.displayAvatarURL)
      .setColor("#9400ff")
      .setThumbnail(bot.user.displayAvatarURL)
      .setFooter("This action was performed automatically")
      .setTimestamp();
    var pjson = require("../package.json");
    embed.addField("Version", `v${pjson.version}`, false);
    embed.addField(
      "Github Repository",
      "https://github.com/MeaninglessVoid/BulletBot",
      false
    );

    message.channel.send({ embed }).catch(console.error);
  }
};
