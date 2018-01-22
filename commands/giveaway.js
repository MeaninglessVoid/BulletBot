module.exports = {
  winners: (winners = []),
  giveaway: function(message, Discord) {
    if (
      message.member.roles.has("306234174321328129") || //check if owner
      message.member.roles.has("368484031458705409") || //check if dungeon master
      message.member.roles.has("388167285077966859") || //check if SS
      message.author.id == "340002869912666114" //check if void
    ) {
      let argsL = message.content.split(" ").slice(1);
      if (argsL[0] == undefined) {
        var embed = new Discord.RichEmbed()
          .setAuthor("Giveaway Help", message.author.displayAvatarURL)
          .setColor("#9400ff")
          .setThumbnail(bot.user.displayAvatarURL)
          .setTimestamp()
          .addField(
            "!giveaway start",
            "This command will start a new giveaway, and create the necessary channels!"
          )
          .addField(
            "!giveaway choose",
            "This command will choose a winner, and add them to the winner vc!"
          )
          .addField(
            "!giveaway end",
            "This command will end the giveaway and delete all the channels!"
          );
      } else if (argsL[0].toLowerCase() == "start") {
        message.guild
          .createChannel("🎉 • Giveaway •", "category", [
            {
              id: message.guild.roles.get("306234601817505793"),
              allow: ["VIEW_CHANNEL", "CONNECT", "SPEAK"]
            }
          ])
          .then(channel => channel.setPosition(0))
          .catch(console.error);

        var giveawayCategory = message.guild.channels.find(
          "name",
          "🎉 • Giveaway •"
        );

        message.guild
          .createChannel("Giveaway Entry", "voice", [
            {
              id: message.guild.roles.get("306234601817505793"),
              allow: ["VIEW_CHANNEL", "CONNECT"],
              deny: ["SPEAK"]
            }
          ])
          .then(channel => channel.setParent(giveawayCategory))
          .catch(console.error);

        message.guild
          .createChannel("Giveaway Winners", "voice", [
            {
              id: message.guild.roles.get("306234601817505793"),
              allow: ["VIEW_CHANNEL", "SPEAK"],
              deny: ["CONNECT"]
            }
          ])
          .then(channel => channel.setParent(giveawayCategory))
          .catch(console.error);
      } else if (argsL[0].toLowerCase() == "choose") {
        var channelPool = message.guild.channels.find("name", "Giveaway Entry");

        var winner = channelPool.members.random();

        winner.setVoiceChannel(channelPool);

        winners.push(winner.id);
      } else if (argsL[0].toLowerCase() == "end") {
        var giveawayCat = message.guild.channels.find(
          "name",
          "🎉 • Giveaway •"
        );

        giveawayCat.children.forEach(channel =>
          channel.delete().catch(console.error)
        );

        giveawayCat.delete().catch(console.error);
      }
    } else {
      message.reply("You don't have permission to use this command.");
    }
    message.delete();
  }
};
