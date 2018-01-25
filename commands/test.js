module.exports = {
  test: function test(message) {
    //0⃣ 1⃣ 2⃣ 3⃣ 4⃣ 5⃣ 6⃣ 7⃣ 8⃣ 9⃣ 🔟
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

    const collector = message.createReactionCollector(filter, { time: 15000 });

    collector.on("collect", (reaction, collector) => {
      console.log(`Collected ${reaction.emoji.name}`);
    //   collector.stop();
    });

    collector.on("end", collected => {
      console.log(`Collected ${collected.size} items`);
    });
  }
};
