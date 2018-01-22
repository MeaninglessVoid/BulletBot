module.exports = {
  winners: (winners = []),
  giveaway: function(message, Discord) {
    message.reply(
      "This command is being rewritten, please refrain from using it"
    );
    return; //remove this later
    if (
      message.member.roles.has("306234174321328129") || //check if owner
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
      }
    } else {
      message.reply("You don't have permission to use this command.");
    }
    message.delete();
  }
};

// module.exports = {
//   winners: (winners = []),
//   giveaway: function(message) {
//     var owner = message.guild.roles.get("306234174321328129");
//     if (
//       message.member.roles.has(owner.id) ||
//       message.author.id == "340002869912666114"
//     ) {
//       let argsL = message.content.split(" ").slice(1);
//       if (argsL[0] == undefined) {
//       } else if (argsL[0].toLowerCase() == "start") {
//       } else if (argsL[0].toLowerCase() == "choose") {
//       } else if (argsL[0].toLowerCase() == "end") {
//         message.guild.channels.find("name", "🎉 GIVEAWAY!").delete();
//         message.guild.channels.find("name", "Giveaway Entry!").delete();
//         message.guild.channels.find("name", "Giveaway Winners!").delete();
//         winners = [];
//       }
//     } else {
//       message.reply("You don't have permission to use this command.");
//     }
//     message.delete();
//   }
// };
