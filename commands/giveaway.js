module.exports = {
  winners: (winners = []),
  giveaway: function(message, Discord, bot) {
    if (
      message.member.roles.has("306234174321328129") || //check if owner
      message.member.roles.has("368484031458705409") || //check if dungeon master
      message.member.roles.has("388167285077966859") || //check if SS
      message.author.id == "340002869912666114" //check if void
    ) {
      let argsL = message.content.split(" ").shift();
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
        message.channel.send({ embed }).catch(console.error);
      } else if (argsL[0].toLowerCase() == "start") {
        message.guild
          .createChannel("🎉 • Giveaway •", "category", [
            {
              id: message.guild.roles.get("306234601817505793"),
              allow: ["VIEW_CHANNEL", "CONNECT", "SPEAK"]
            }
          ])
          .then(channel => {
            channel.setPosition(0);
            message.guild
              .createChannel("Giveaway Entry", "voice", [
                {
                  id: message.guild.roles.get("306234601817505793"),
                  allow: ["VIEW_CHANNEL", "CONNECT"],
                  deny: ["SPEAK"]
                }
              ])
              .then(subChannel => subChannel.setParent(channel))
              .catch(console.error);

            message.guild
              .createChannel("Giveaway Winners", "voice", [
                {
                  id: message.guild.roles.get("306234601817505793"),
                  allow: ["VIEW_CHANNEL", "SPEAK"],
                  deny: ["CONNECT"]
                }
              ])
              .then(subChannel => subChannel.setParent(channel))
              .catch(console.error);
          })
          .catch(console.error);
      } else if (argsL[0].toLowerCase() == "choose") {
        var channelPool = message.guild.channels.find("name", "Giveaway Entry");
        var winningChannel = message.guild.channels.find(
          "name",
          "Giveaway Winners"
        );

        channelPool.members
          .random()
          .setVoiceChannel(winningChannel)
          .then(member => {
            winners.push(member.id);
            console.log(winners);
          });

        // winners.push(winner.id);
      } else if (argsL[0].toLowerCase() == "end") {
        message.guild.channels
          .find("name", "🎉 • Giveaway •")
          .children.forEach(channel => channel.delete().catch(console.error));

        message.guild.channels.find("name", "🎉 • Giveaway •").delete().catch(console.error);
        winners = [];
      }
    } else {
      message.reply("You don't have permission to use this command.");
    }
    message.delete();
  }
};
