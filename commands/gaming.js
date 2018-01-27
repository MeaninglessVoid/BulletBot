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
  },
  coinflip: function(message, Discord) {
    var headsOrTails = Math.floor(Math.random() * 2);

    if (headsOrTails) {
      headsOrTails = "heads";
    } else {
      headsOrTails = "tails";
    }

    var embed = new Discord.RichEmbed()
      .setAuthor("Coinflip", message.author.displayAvatarURL)
      .setColor(message.member.displayHexColor)
      .setTimestamp()
      .setDescription("I am flipping a coin...");

    message.channel
      .send({ embed })
      .then(toEdit => {
        setTimeout(() => {
          var embed = new Discord.RichEmbed()
            .setAuthor("Coinflip", message.author.displayAvatarURL)
            .setColor(message.member.displayHexColor)
            .setTimestamp()
            .setDescription(`You flipped a ${headsOrTails}`);
          toEdit.edit({ embed }).catch(console.error);
        }, 2000);
      })
      .catch(console.error);
  },
  eightBall: function(message, Discord) {
    var responses = [
      "It is certain",
      "It is decidedly so",
      "Without a doubt",
      "Yes definitely",
      "You may rely on it",
      "As I see it, yes",
      "Most likely",
      "Outlook good",
      "Yes",
      "Signs point to yes",
      "Reply hazy try again",
      "Ask again later",
      "Better not tell you now",
      "Cannot predict now",
      "Concentrate and ask again",
      "Don't count on it",
      "My reply is no",
      "My sources say no",
      "Outlook not so good",
      "Very doubtfuls"
    ];

    var response = responses[Math.floor(Math.random() * responses.length)];

    var embed = new Discord.RichEmbed()
      .setAuthor(`8ball`, message.author.displayAvatarURL)
      .setColor(message.member.displayHexColor)
      .setDescription(`The magic 8-ball says: ${response}`);

    message.channel.send({ embed }).catch(console.error);
  }
};
