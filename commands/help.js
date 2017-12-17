const Discord = require("discord.js");

module.exports = {
  help: function(bot, message) {
    var embed = new Discord.MessageEmbed()
      .setAuthor("Help", message.author.avatarURL())
      .setColor("#9400ff")
      .setThumbnail(bot.user.avatarURL())
      .setFooter("This action was preformed automatically")
      .setTimestamp()
      //.addField('Construction', "This command is under construction, try again later!", false)
      .addField("!ui", "gives you basic information on yourself!", false)
      .addField(
        "!invite",
        "gives you an invite to share with your friends!",
        false
      )
      .addField(
        "!vc",
        "create a temporary voice channel for you and your friends!",
        false
      )
      .addField(
        "!version",
        "gives you basic information on the bot such as verison number and github repository",
        false
      )
      .addField("OwO", "more to come soon!", false);

    message.author
      .send({
        embed
      })
      .catch(err => {
        conosle.error(err);
      });
    message.delete();
  }
};
