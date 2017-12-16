const moment = require("moment");

module.exports = {
  agree: function(message) {
    //member id: 306234601817505793
    //test id: 388157472885571584
    const member = message.guild.roles.get("306234601817505793");

    var days = moment().diff(message.author.createdAt, "days");

    if (days <= 7) {
      message.reply(
        "Your account is too young to be given the member role automatically, please contact <@&322941932848283662> or <@&306234269435691008> to resolve this issue, thank you!"
      );
      return;
    }

    message.member.addRole(member);

    message.delete();
  },
  invite: function(message) {
    message.reply("https://discord.gg/bulletbarry");
  },
  version: function(message, bot, Discord) {
    var embed = new Discord.RichEmbed()
      .setAuthor("Bot Version", message.author.displayAvatarURL)
      .setColor("#9400ff")
      .setThumbnail(bot.user.displayAvatarURL)
      .setFooter("This action was preformed automatically")
      .setTimestamp();
    var pjson = require("../package.json");
    embed.addField("Version", pjson.version, false);
    embed.addField(
      "Github Repository",
      "https://github.com/SamuelDub/BulletBot",
      false
    );

    message.reply({ embed }).catch(err => console.error(err));
  }
};
