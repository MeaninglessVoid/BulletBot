module.exports = {
  test: function test() {
        //0⃣ 1⃣ 2⃣ 3⃣ 4⃣ 5⃣ 6⃣ 7⃣ 8⃣ 9⃣ 🔟
        message.delete();
        var embed = new Discord.RichEmbed()
          .setAuthor("Help", message.author.displayAvatarURL)
          .setColor("#9400ff")
          .setThumbnail(bot.user.displayAvatarURL)
          .setFooter("This action was preformed automatically")
          .setTimestamp()
          .addField(
            "Basic Commands",
            "React with 1⃣  to see the help for basic commands",
            false
          )
          .addField(
            "Gaming Commands",
            "React with 2⃣  to see the help for gaming commands",
            false
          );
        // .addField(
        //   "Basic Commands",
        //   "React with 3⃣  to see the help for basic commands",
        //   false
        // )
        // .addField(
        //   "Basic Commands",
        //   "React with 4⃣  to see the help for basic commands",
        //   false
        // );
    
        message.author
          .send({
            embed
          })
          .then(help => {
            help.react("1⃣").then(() => {
              help.react("2⃣").then(() => {
                // help.react("3⃣").then(() => {
                // help.react("4⃣").then(() => {
                const filter = (reaction, user) => {
                  return (
                    (reaction.emoji.name === "1⃣" ||
                      reaction.emoji.name === "2⃣" ||
                      reaction.emoji.name === "3⃣" ||
                      reaction.emoji.name === "4⃣") &&
                    user.id === message.author.id
                  );
                };
    
                const collector = help.createReactionCollector(filter, {
                  time: 30000
                });
    
                collector.on("collect", (reaction, collector) => {
                  collector.stop();
                });
    
                collector.on("end", collected => {
                  if (collected.size == 0) {
                    return;
                  }
    
                  if (collected) var first = collected.first().emoji.name;
                  switch (first) {
                    case "1⃣":
                      one(help);
                      break;
                    case "2⃣":
                      two(help);
                      break;
                    // case "3⃣":
                    //   three(help);
                    //   break;
                    // case "4⃣":
                    //   four(help);
                    //   break;
                  }
                });
                // });
                // })
              });
            });
          })
          .catch(console.error);
    
        one = help => {
          var embed = new Discord.RichEmbed()
            .setAuthor("Basic Commands", message.author.displayAvatarURL)
            .setColor("#9400ff")
            .setThumbnail(bot.user.displayAvatarURL)
            .setFooter("This action was preformed automatically")
            .setTimestamp()
            .addField("!help", "gives you this menu", false)
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
              "!version or !v",
              "gives you basic information on the bot such as verison number and github repository",
              false
            )
            .addField(
              "!request <feature you want added>",
              "sends a request to add a feature to me!",
              false
            )
            .addField(
              "Return",
              "React with ◀ to go back to the menu",
              false
            );
          help.edit({ embed }).catch(console.error);
          help.react("◀").then(() => {
            const filter = (reaction, user) => {
              return reaction.emoji.name === "◀" && user.id === message.author.id;
            };
    
            const collector = help.createReactionCollector(filter, {
              time: 30000
            });
    
            collector.on("collect", (reaction, collector) => {
              collector.stop();
              back(help);
            });
          });
        };
    
        two = help => {
          var embed = new Discord.RichEmbed()
            .setAuthor("Gaming Commands", message.author.displayAvatarURL)
            .setColor("#9400ff")
            .setThumbnail(bot.user.displayAvatarURL)
            .setFooter("This action was preformed automatically")
            .setTimestamp()
            .addField(
              "!vc <room limit>",
              "create a temporary voice channel for you and your friends!",
              false
            )
            .addField(
              "Return",
              "React with ◀ to go back to the menu",
              false
            );
          help.edit({ embed }).catch(console.error);
          help.react("◀").then(() => {
            const filter = (reaction, user) => {
              return reaction.emoji.name === "◀" && user.id === message.author.id;
            };
    
            const collector = help.createReactionCollector(filter, {
              time: 30000
            });
    
            collector.on("collect", (reaction, collector) => {
              collector.stop();
              back(help);
            });
          });
        };
    
        back = input => {
          var embed = new Discord.RichEmbed()
            .setAuthor("Help", message.author.displayAvatarURL)
            .setColor("#9400ff")
            .setThumbnail(bot.user.displayAvatarURL)
            .setFooter("This action was preformed automatically")
            .setTimestamp()
            .addField(
              "Basic Commands",
              "React with 1⃣  to see the help for basic commands",
              false
            )
            .addField(
              "Gaming Commands",
              "React with 2⃣  to see the help for gaming commands",
              false
            );
    
          input
            .delete()
            .then(help => {
              help.channel
                .send({
                  embed
                })
                .then(newHelp => {
                  newHelp.react("1⃣").then(() => {
                    newHelp.react("2⃣").then(() => {
                      const filter = (reaction, user) => {
                        return (
                          (reaction.emoji.name === "1⃣" ||
                            reaction.emoji.name === "2⃣") &&
                          user.id === message.author.id
                        );
                      };
    
                      const collector = newHelp.createReactionCollector(filter, {
                        time: 30000
                      });
    
                      collector.on("collect", (reaction, collector) => {
                        console.log(`collected ${reaction.emoji.name} and ${reaction.me}`);
                        collector.stop();
                      });
    
                      collector.on("end", collected => {
                        if (collected.size == 0) {
                          return;
                        }
    
                        if (collected) var first = collected.first().emoji.name;
                        switch (first) {
                          case "1⃣":
                            one(newHelp);
                            break;
                          case "2⃣":
                            two(newHelp);
                            break;
                        }
                      });
                    });
                  });
                })
                .catch(console.error);
            })
            .catch(console.error);
        };
  }
};
