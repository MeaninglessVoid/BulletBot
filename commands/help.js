const Discord = require("discord.js");

module.exports = {
  help: function(bot, message) {
    var embed = new Discord.RichEmbed()
      .setAuthor("Help", message.author.displayAvatarURL)
      .setColor("#9400ff")
      .setThumbnail(bot.user.displayAvatarURL)
      .setFooter("This action was preformed automatically")
      .setTimestamp()
      .addField(
        "!userinfo or !ui",
        "gives you basic information on yourself!",
        false
      )
      .addField(
        "!invite or !inv",
        "gives you an invite to share with your friends!",
        false
      )
      .addField(
        "!vc <room limit>",
        "create a temporary voice channel for you and your friends!",
        false
      )
      .addField(
        "!flip",
        "flips a coin!",
        false
      )
      .addField(
        "!8ball <question>",
        "gets the magic 8-ball to answer your question",
        false
      )
      .addField(
        "!version or !v",
        "gives you basic information on the bot such as verison number and github repository",
        false
      )
      .addField(
        "!request <feature you want added>",
        "sends a request to add a feature to me!",
        false
      )
      .addField("OwO", "more to come soon!", false);

    message.author
      .send({
        embed
      })
      .catch(console.error);
    message.delete();
  }
};
