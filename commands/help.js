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
      .addField("!flip", "flips a coin!", false)
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
  modhelp: function(message, bot, isTest) {
    var dungeonMaster = message.guild.roles.get("368484031458705409");
    var headAdmin = message.guild.roles.get("354392788424589342");
    var admin = message.guild.roles.get("322941932848283662");
    var mod = message.guild.roles.get("306234269435691008");
    var helper = message.guild.roles.get("385995809461764096");

    if (
      message.member.roles.has(dungeonMaster.id) ||
      message.member.roles.has(headAdmin.id) ||
      message.member.roles.has(admin.id) ||
      message.member.roles.has(mod.id) ||
      message.member.roles.has(helper.id) ||
      isTest
    ) {
      var embed = new Discord.RichEmbed()
        .setAuthor("Help", message.author.displayAvatarURL)
        .setColor("#9400ff")
        .setThumbnail(bot.user.displayAvatarURL)
        .setFooter("This action was preformed automatically")
        .setTimestamp()
        .addField(
          "!clear <number of messages to delete> @user",
          `Will delete a certain number of messages from mentioned user, if the user is ommited, will delete the previous x number of messages
        Ex: '!clear 10' will delete last 10 messages
        Roles: Mod+
        WARNING: you can only delete up to 99 messages per use`,
          false
        )
        .addField(
          "!shutdown",
          `This command will shutoff the bot and delete all the created voice channels
        Roles: Head Admin+
        WARNING: may not work effectively if the bot is being hosted using pm2`,
          false
        );

      message.channel
        .send({
          embed
        })
        .catch(console.error);
      message.delete();
    }
  }
};
