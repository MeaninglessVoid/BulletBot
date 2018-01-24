const gaming = require("./gaming");

module.exports = {
  shutdown: function(message, bot, isTest) {
    var owner = message.guild.roles.get("306234174321328129");
    var dungeonMaster = message.guild.roles.get("368484031458705409");
    var secretServices = message.guild.roles.get("388167285077966859");
    var headAdmin = message.guild.roles.get("354392788424589342");

    if (
      message.member.roles.has(owner.id) ||
      message.member.roles.has(dungeonMaster.id) ||
      message.member.roles.has(secretServices.id) ||
      message.member.roles.has(headAdmin.id) ||
      isTest
    ) {
      gaming.channels.forEach(channelId => {
        message.guild.channels
          .get(channelId.id)
          .delete()
          .catch(console.error);
        gaming.channels.splice(1);
      });

      message.author.send("Shutting down");
      message.delete().catch(console.error);
      bot.destroy().catch(console.error);
    }
  },
  clear: function(message, Discord, bot, isTest) {
    var headAdmin = message.guild.roles.get("354392788424589342");
    var admin = message.guild.roles.get("322941932848283662");
    var mod = message.guild.roles.get("306234269435691008");
    // var helper = message.guild.roles.get("385995809461764096");

    if (
      message.member.roles.has(headAdmin.id) ||
      message.member.roles.has(admin.id) ||
      message.member.roles.has(mod.id) ||
      isTest
    ) {
      let argsL = message.content.split(" ").splice(1);

      var times = parseInt(argsL[0]);

      if (isNaN(times)) {
        times = 1;
      }

      if (times > 99) {
        message.reply("You may only delete 99 messages at a time!");
        return;
      }

      if (message.mentions.members.first() == undefined) {
        message.channel
          .fetchMessages({ limit: times + 1 })
          .then(messages => message.channel.bulkDelete(messages, true))
          .catch(console.error);
      } else {
        var userMessages;
        message.mentions.members.forEach(member => {
          message.channel
            .fetchMessages({ limit: 100 })
            .then(messages => {
              userMessages = messages.filter(
                message => member.id == message.member.id
              );
              message.channel.bulkDelete(userMessages.first(times), true);
            })
            .catch(console.error);
        });
        message.delete();
      }
    } else {
      message.reply("you don't have permissions to use this command!");
    }
  },
  playing: function(message, bot, isTest) {
    var owner = message.guild.roles.get("306234174321328129");
    var dungeonMaster = message.guild.roles.get("368484031458705409");
    var secretServices = message.guild.roles.get("388167285077966859");
    var headAdmin = message.guild.roles.get("354392788424589342");

    if (
      message.member.roles.has(owner.id) ||
      message.member.roles.has(dungeonMaster.id) ||
      message.member.roles.has(secretServices.id) ||
      message.member.roles.has(headAdmin.id) ||
      isTest
    ) {
      let argsL = message.content.split(" ").splice(1)
      var game = argsL.join(" ");

      bot.user.setActivity(game, { type: "PLAYING" });

      message.delete().catch(console.error)
    }
  },
  watching: function(message, bot, isTest) {
    var owner = message.guild.roles.get("306234174321328129");
    var dungeonMaster = message.guild.roles.get("368484031458705409");
    var secretServices = message.guild.roles.get("388167285077966859");
    var headAdmin = message.guild.roles.get("354392788424589342");

    if (
      message.member.roles.has(owner.id) ||
      message.member.roles.has(dungeonMaster.id) ||
      message.member.roles.has(secretServices.id) ||
      message.member.roles.has(headAdmin.id) ||
      isTest
    ) {
      let argsL = message.content.split(" ").splice(1)
      var game = argsL.join(" ");

      bot.user.setActivity(game, { type: "WATCHING" });

      message.delete().catch(console.error)
    }
  },
  listening: function(message, bot, isTest) {
    var owner = message.guild.roles.get("306234174321328129");
    var dungeonMaster = message.guild.roles.get("368484031458705409");
    var secretServices = message.guild.roles.get("388167285077966859");
    var headAdmin = message.guild.roles.get("354392788424589342");

    if (
      message.member.roles.has(owner.id) ||
      message.member.roles.has(dungeonMaster.id) ||
      message.member.roles.has(secretServices.id) ||
      message.member.roles.has(headAdmin.id) ||
      isTest
    ) {
      let argsL = message.content.split(" ").splice(1)
      var game = argsL.join(" ");

      bot.user.setActivity(game, { type: "LISTENING" });

      message.delete().catch(console.error)
    }
  },
  streaming: function(message, bot, isTest) {
    var owner = message.guild.roles.get("306234174321328129");
    var dungeonMaster = message.guild.roles.get("368484031458705409");
    var secretServices = message.guild.roles.get("388167285077966859");
    var headAdmin = message.guild.roles.get("354392788424589342");

    if (
      message.member.roles.has(owner.id) ||
      message.member.roles.has(dungeonMaster.id) ||
      message.member.roles.has(secretServices.id) ||
      message.member.roles.has(headAdmin.id) ||
      isTest
    ) {
      let argsL = message.content.split(" ").splice(1)
      var game = argsL.join(" ");

      bot.user.setActivity(game, { type: "STREAMING" });

      message.delete().catch(console.error)
    }
  }
};
