module.exports = {
  test: function test(message, Discord) {
    //0⃣ 1⃣ 2⃣ 3⃣ 4⃣ 5⃣ 6⃣ 7⃣ 8⃣ 9⃣ 🔟
    var embed = new Discord.RichEmbed()
      .setAuthor("Help", message.author.displayAvatarURL)
      .setColor("#9400ff")
      .setThumbnail(bot.user.displayAvatarURL)
      .setFooter("This action was preformed automatically")
      .setTimestamp()
      // .addField('Construction', "This command is under construction, try again later!", false)
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
      .then(message => {
        message
          .react("1⃣")
          .then(() =>
            message
              .react("2⃣")
              .then(() => message.react("3⃣").then(() => message.react("4⃣")))
          );

        const filter = (reaction, user) => {
          return (
            (reaction.emoji.name === "1⃣" ||
              reaction.emoji.name === "2⃣" ||
              reaction.emoji.name === "3⃣" ||
              reaction.emoji.name === "4⃣") &&
            user.id === message.author.id
          );
        };

        const collector = message.createReactionCollector(filter, {
          time: 30000
        });

        collector.on("collect", (reaction, collector) => {
          collector.stop();
        });

        collector.on("end", collected => {
          if (collected.size == 0) {
            console.log("empty");
            return;
          }

          console.log(collected);

          if (collected) var first = collected.first().emoji.name;
          switch (first) {
            case "1⃣":
              message.reply("You clicked one");
              break;
            case "2⃣":
              message.reply("You clicked two");
              break;
            case "3⃣":
              message.reply("You clicked three");
              break;
            case "4⃣":
              message.reply("You clicked four");
              break;
          }
        });
      });
  }
};
