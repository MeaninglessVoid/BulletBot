module.exports = {
  winners: (winners = []),
  giveaway: function(message) {
    var owner = message.guild.roles.get("306234174321328129");
    if (
      message.member.roles.has(owner.id) ||
      message.author.id == "340002869912666114"
    ) {
      let argsL = message.content.split(" ").slice(1);
      if (argsL[0] == undefined) {
        message.author.send(
          "Please use either `!giveaway start` to start the giveaway, `!giveaway choose` to choose a lucky winner, or `!giveaway end` to end the giveaway and delete both channels"
        );
      } else if (argsL[0].toLowerCase() == "start") {
        message.guild.createChannel("Giveaway", "voice").then(channel => {
          channel.overwritePermissions(
            message.guild.roles.get("306234601817505793"),
            {
              VIEW_CHANNEL: true,
              CONNECT: true
            }
          );
          channel.setParent(message.guild.channels.get("358336988014706689"));
          channel.setPosition(0);
        });
        message.guild
          .createChannel("Giveaway Winners!", "voice")
          .then(channel => {
            channel.overwritePermissions(
              message.guild.roles.get("306234601817505793"),
              {
                VIEW_CHANNEL: true,
                SPEAK: true
              }
            );
            channel.setParent(message.guild.channels.get("358336988014706689"));
            channel.setPosition(1);
          });
      } else if (argsL[0].toLowerCase() == "choose") {
        var winner = message.guild.channels
          .find("name", "Giveaway")
          .members.random(1)[0];

        winner.setVoiceChannel(
          message.guild.channels.find("name", "Giveaway Winners!")
        );

        winners.push(winner.id);
      } else if (argsL[0].toLowerCase() == "end") {
        message.guild.channels.find("name", "Giveaway").delete();
        message.guild.channels.find("name", "Giveaway Winners!").delete();
        winners = [];
      }
    } else {
      message.reply("You don't have permission to use this command.");
    }
    message.delete();
  }
};
