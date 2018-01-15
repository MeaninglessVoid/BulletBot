const gaming = require("./gaming");

module.exports = {
  shutdown: function(message, bot) {
    var owner = message.guild.roles.get("306234174321328129");
    var dungeonMaster = message.guild.roles.get("368484031458705409");
    var secretServices = message.guild.roles.get("388167285077966859");
    var headAdmin = message.guild.roles.get("354392788424589342");
    var isVoid = message.guild.members.get("340002869912666114");

    if (
      message.member.roles.has(owner.id) ||
      message.member.roles.has(dungeonMaster.id) ||
      message.member.roles.has(secretServices.id) ||
      message.member.roles.has(headAdmin.id) ||
      message.author.id == isVoid.id
    ) {
      gaming.channels.forEach(channelId => {
        message.guild.channels
          .get(channelId.id)
          .delete()
          .catch(err => {
            console.error(err);
          });
        gaming.channels.shift();
      });

      message.author.send("Shutting down");
      message.delete().catch(err => {
        console.error(err);
      });
      bot.destroy().catch(err => {
        console.error(err);
      });
    }
  },
  clear: function(message, Discord, bot) {
    var headAdmin = message.guild.roles.get("354392788424589342");
    var admin = message.guild.roles.get("322941932848283662");
    var mod = message.guild.roles.get("306234269435691008");
    var helper = message.guild.roles.get("385995809461764096");
    var isVoid = message.guild.members.get("340002869912666114");

    if (
      message.member.roles.has(headAdmin.id) ||
      message.member.roles.has(admin.id) ||
      message.member.roles.has(mod.id) ||
      message.member.roles.has(helper.id) ||
      message.author.id == isVoid.id
    ) {
      let argsL = message.content.split(" ").slice(1);

      var times = parseInt(argsL[0]);

      if (isNaN(times)) {
        times = 1;
      }

      if (times > 99) {
        message.reply("You may only delete 99 messages at a time!");
        return;
      }
      message.channel
        .fetchMessages({ limit: times + 1 })
        .then(messages => cleanLog(messages))
        .catch(err => console.error(err));
    } else {
      message.reply("you don't have permissions to use this command!");
    }
    cleanLog = messages => {
      message.channel.bulkDelete(messages);
      messages.forEach(message => {
        if (message.author.bot || message.content.startsWith("!")) return;
        try {
          var embed = new Discord.RichEmbed()
            .setAuthor("Deleted Message", message.author.displayAvatarURL)
            .setThumbnail(message.author.displayAvatarURL)
            .setColor("#9400ff")
            .setTimestamp()
            .addField("Message Author ID", message.author.id, false)
            .addField("Message Channel ID", message.channel.id, false)
            .addField("Message ID", message.id, false)
            .addField("Message Author", message.author.username, false)
            .addField("Message Channel Name", message.channel.name, false);
          if (message.content != "") {
            embed.addField("Message Content", message.content, false);
          }
          message.attachments.forEach(attachment => {
            embed.addField("Image URL", attachment.url);
          });
          bot.guilds
            .first()
            .channels.get("402246491445657610")
            .send({
              embed
            })
            .catch(err => {
              conosle.error(err);
            });
        } catch (error) {
          console.error(error);
          bot.guilds
            .first()
            .channels.get("402246491445657610")
            .send(
              "You shouldn't be able to see this message, please tell void he is a moron and to fix this already"
            );
        }
      });
    };
  }
};
