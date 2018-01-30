const Discord = require("discord.js");

module.exports = {
  help: function(message, bot) {
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
  },
  modhelp: function(message, bot) {
    var embed = new Discord.RichEmbed()
      .setAuthor("Help", message.author.displayAvatarURL)
      .setColor("#9400ff")
      .setThumbnail(bot.user.displayAvatarURL)
      .setFooter("This action was preformed automatically")
      .setTimestamp()
      .addField(
        "!clear <number of messages to delete> @user",
        `Will delete a certain number of messages from mentioned user, if the user is ommited, will delete the previous x number of mentions
        Ex: '!clear 10' will delete last 10 messages
        WARNING: you can only delete up to 99 messages per command
        ROLES: Mod+`,
        false
      )
      .addField(
        "!shutdown",
        `This command will shutoff the bot and delete all the created voice channels
        WARNING: may not work effectively if the bot is being hosted using pm2
        Roles: Head Admin+`,
        false
      )

    message.channel
      .send({
        embed
      })
      .catch(console.error);
    message.delete();

  }
};
