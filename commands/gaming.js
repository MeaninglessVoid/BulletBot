module.exports = {
  channels: (channels = []),
  vc: function(message) {
    if (message.member.voiceChannel == undefined) {
      message.reply(
        "You must already be in a voice channel to use this command"
      );
      message.delete();
      return;
    }

    message.delete();

    game = `🎮 ${message.author.username}'s Gaming Channel`;

    let argsL = message.content.split(" ").splice(1);

    var userLimit = parseInt(argsL[0]);

    if (isNaN(userLimit) || userLimit > 99) userLimit = 99;

    message.guild
      .createChannel(game, "voice", [
        {
          id: message.guild.roles.get("306234601817505793"),
          allow: ["VIEW_CHANNEL", "CONNECT", "SPEAK"]
        }
      ])
      .then(channel => {
        channel.setParent("358347251900350464");
        channel.setUserLimit(userLimit);
        channels.push({
          id: channel.id,
          owner: message.author.id
        });
        message.member.setVoiceChannel(channel);
      })
      .catch(console.error);
  },
  maria: function(message) {
    if (
      message.author.id != "148847883632902151" &&
      message.author.id != "340002869912666114"
    ) {
      return;
    }

    message.delete();

    game = `🎮 ${message.author.username}'s Gaming Channel`;

    let argsL = message.content.split(" ").splice(1);

    var userLimit = parseInt(argsL[0]);

    if (isNaN(userLimit) || userLimit > 99) userLimit = 99;

    message.guild
      .createChannel(game, "voice", [
        {
          id: message.guild.roles.get("306234601817505793"),
          allow: ["VIEW_CHANNEL", "CONNECT", "SPEAK"]
        }
      ])
      .then(channel => {
        channel.setParent("358347251900350464");
        channel.setUserLimit(userLimit);
        channels.push({
          id: channel.id,
          owner: message.author.id
        });
        message.member.setVoiceChannel(channel);
      })
      .catch(console.error);
  }
};
