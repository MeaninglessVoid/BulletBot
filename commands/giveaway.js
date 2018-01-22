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
        message.guild.createChannel("🎉 • Giveaway •", "category", [
          {
            id: message.guild.roles.get("306234601817505793"),
            allow: ["VIEW_CHANNEL", "CONNECT", "SPEAK"],
          }
        ]);
      } else if (argsL[0].toLowerCase() == "choose") {
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
//         message.author.send(
//           "Please use either `!giveaway start` to start the giveaway, `!giveaway choose` to choose a lucky winner, or `!giveaway end` to end the giveaway and delete both channels"
//         );
//       } else if (argsL[0].toLowerCase() == "start") {
//         message.guild
//           .createChannel("🎉 GIVEAWAY!", "category")
//           .then(channel => {
//             channel.setPosition(3);
//             channel.overwritePermissions(
//               message.guild.roles.get("306234601817505793"),
//               {
//                 VIEW_CHANNEL: true,
//                 CONNECT: true
//               }
//             );
//           });

//         message.guild
//           .createChannel("Giveaway Entry!", "voice")
//           .then(channel => {
//             channel.overwritePermissions(
//               message.guild.roles.get("306234601817505793"),
//               {
//                 VIEW_CHANNEL: true,
//                 CONNECT: true
//               }
//             );
//           });

//         message.guild
//           .createChannel("Giveaway Winners!", "voice")
//           .then(channel => {
//             channel.overwritePermissions(
//               message.guild.roles.get("306234601817505793"),
//               {
//                 VIEW_CHANNEL: true,
//                 CONNECT: false,
//                 SPEAK: true
//               }
//             );
//           });

//         setTimeout(function() {
//           message.guild.channels
//             .find("name", "Giveaway Entry!")
//             .setParent(message.guild.channels.find("name", "🎉 GIVEAWAY!"));
//           message.guild.channels
//             .find("name", "Giveaway Winners!")
//             .setParent(message.guild.channels.find("name", "🎉 GIVEAWAY!"));
//         }, 1000);
//       } else if (argsL[0].toLowerCase() == "choose") {
//         var winner = message.guild.channels
//           .find("name", "Giveaway Entry!")
//           .members.random(1)[0];

//         winner.setVoiceChannel(
//           message.guild.channels.find("name", "Giveaway Winners!")
//         );

//         winners.push(winner.id);
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
