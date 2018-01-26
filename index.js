const token = require("./token.json");

const Discord = require("discord.js");
const bot = new Discord.Client();

const test = require("./commands/test");
const basic = require("./commands/basic");
const help = require("./commands/help");
const roles = require("./commands/roleManagement");
const ui = require("./commands/userInfo");
const game = require("./commands/gaming");
const giveaway = require("./commands/giveaway");
const mod = require("./commands/moderation");

let timedOutMembers = [];

bot.on("ready", () => {
  console.log("Ready");
  bot.channels
    .get("358341168066723845")
    .send(
      `${bot.guilds.first().roles.get("354392788424589342")} I have restarted`
    )
    .catch(console.error);
  bot.user.setActivity("all of Barry's videos", { type: "WATCHING" });
  bot.guilds
    .first()
    .roles.get("361164004682366977")
    .members.forEach(member => {
      timedOutMembers.push(member.id);
    });
});

bot.on("message", message => {
  if (message.author.bot || !message.content.startsWith("!")) return;

  if (message.channel.type == "dm") {
    message.reply("Sorry, my commands don't work in dms!");
    return;
  }

  let wm = message.content.toUpperCase();

  let command = wm.split(" ")[0];

  console.log(
    new Date() +
      ": " +
      message.author.username +
      " > #" +
      message.channel.name +
      " > " +
      message.content
  );

  var isTest = false;
  if (
    message.channel.id == "388877963694964747" ||
    message.author.id == "340002869912666114" ||
    message.author.id == "326437722120126485" ||
    message.author.id == "148847883632902151"
  ) {
    isTest = true;
  }

  if(command == "!TEST" && isTest) {
    test.test()
  }

  if (message.channel.id == "384171995597897728" || isTest) {
    if (command == "!AGREE") {
      basic.agree(message);
      return;
    }
  }

  if (message.channel.id == "382288105992093698" || isTest) {
    if (command == "!IWANT") {
      roles.want(message);
      return;
    }

    if (command == "!IDONTWANT") {
      roles.dontwant(message);
      return;
    }
  }

  if (
    message.channel.id == "388871903600967680" ||
    message.channel.id == "358341189994545153" ||
    message.channel.id == "358341168066723845" ||
    isTest
  ) {
    if (command == "!USERINFO" || command == "!UI") {
      ui.ui(message, Discord);
      return;
    } else if (command == "!VERSION" || command == "!V") {
      basic.version(message, bot, Discord);
    }
  }

  if (command == "!HELP") {
    help.help(bot, message);
  } else if (command == "!INVITE" || command == "!INV") {
    basic.invite(message);
  } else if (command == "!SHUTDOWN") {
    mod.shutdown(message, bot, isTest);
  } else if (command == "!VC") {
    game.vc(message);
  } else if (command == "!GIVEAWAY") {
    giveaway.giveaway(message, Discord, bot);
  } else if (command == "!REQUEST") {
    basic.request(message, bot, Discord);
  } else if (command == "!MARIA") {
    game.maria(message);
  } else if (command == "!CLEAR") {
    mod.clear(message, Discord, bot, isTest);
  } else if (command == "!PLAYING") {
    mod.playing(message, bot, isTest);
  } else if (command == "!WATCHING") {
    mod.watching(message, bot, isTest);
  } else if (command == "!LISTENING") {
    mod.listening(message, bot, isTest);
  } else if (command == "!STREAMING") {
    mod.streaming(message, bot, isTest);
  }
});

bot.on("messageDelete", message => {
  if (message.author.bot && message.channel.id == "402246491445657610") {
    var embed = new Discord.RichEmbed()
      .setAuthor("Warning", message.author.displayAvatarURL)
      .setColor("#990000")
      .setTimestamp()
      .addField(
        "Bot Message Deletion",
        "A user has deleted a message in this channel",
        false
      );
    bot.guilds
      .first()
      .channels.get("402246491445657610")
      .send({ embed })
      .catch(console.error);
  }

  if (message.author.bot || message.content.startsWith("!")) return;
  try {
    var embed = new Discord.RichEmbed()
      .setAuthor("Deleted Message", message.author.displayAvatarURL)
      .setThumbnail(message.author.displayAvatarURL)
      .setColor("#0000ff")
      .setTimestamp()
      .addField("Message Author ID", message.author.id, false)
      .addField("Message Channel ID", message.channel.id, false)
      .addField("Message ID", message.id, false)
      .addField("Message Author", message.author.username, false)
      .addField("Message Channel Name", `#${message.channel.name}`, false);
    message.edits.reverse().forEach(edit => {
      if (edit.content != "") {
        if (message.content.length <= 1024) {
          embed.addField("Message Content", edit.content, false);
        } else {
          embed.addField(
            "Message Content",
            "This message was too long to be displayed",
            false
          );
        }
      }
    });
    message.attachments.forEach(attachment => {
      embed.addField("Image URL", attachment.url);
    });
    bot.guilds
      .first()
      .channels.get("402246491445657610")
      .send({
        embed
      })
      .catch(console.error);
  } catch (error) {
    console.error(error);
    bot.guilds
      .first()
      .channels.get("402246491445657610")
      .send(
        "You shouldn't be able to see this message, please tell void he is a moron and to fix this already"
      );
  }
});

bot.on("messageUpdate", (oldMessage, newMessage) => {
  if (
    oldMessage == undefined ||
    oldMessage.author.bot ||
    newMessage.edits.length < 2
  )
    return;

  if (oldMessage.content == newMessage.content) return;

  var embed = new Discord.RichEmbed()
    .setAuthor("Edited Message", oldMessage.author.displayAvatarURL)
    .setThumbnail(oldMessage.author.displayAvatarURL)
    .setColor("#00ff00")
    .setTimestamp()
    .addField("Message Author ID", oldMessage.author.id, false)
    .addField("Message Channel ID", oldMessage.channel.id, false)
    .addField("Message ID", oldMessage.id, false)
    .addField("Message Author", oldMessage.author.username, false)
    .addField("Message Channel Name", `#${oldMessage.channel.name}`, false);
  if (oldMessage.content != "") {
    if (oldMessage.content.length <= 1024) {
      embed.addField("Old Message Content", oldMessage.content, false);
    } else {
      embed.addField(
        "Old Message Content",
        "This message was too long to be displayed",
        false
      );
    }
  }
  if (newMessage.content != "") {
    if (newMessage.content.length <= 1024) {
      embed.addField("New Message Content", newMessage.content, false);
    } else {
      embed.addField(
        "New Message Content",
        "This message was too long to be displayed",
        false
      );
    }
  }
  oldMessage.attachments.forEach(attachment => {
    embed.addField("Old Message Image URL", attachment.url);
  });
  newMessage.attachments.forEach(attachment => {
    embed.addField("Old Message Image URL", attachment.url);
  });

  bot.guilds
    .first()
    .channels.get("402246491445657610")
    .send({
      embed
    })
    .catch(console.error);
});

bot.on("guildMemberAdd", guildMember => {
  var timeout = bot.guilds.first().roles.get("361164004682366977");
  timedOutMembers.forEach(member => {
    if (member == guildMember.id) {
      guildMember.addRole(timeout);
    }
  });
});

bot.on("guildMemberUpdate", (oldMember, newMember) => {
  var timeout = bot.guilds.first().roles.get("361164004682366977");
  var member = bot.guilds.first().roles.get("306234601817505793");

  if (!oldMember.roles.has(timeout.id) && newMember.roles.has(timeout.id)) {
    var timedOut = bot.guilds.first().members.get(newMember.id);
    timedOutMembers.push(newMember.id);
    timedOut.removeRole(member);
    timedOut.setVoiceChannel(
      bot.guilds.first().channels.get("374635912845590528")
    );
  }

  if (oldMember.roles.has(timeout.id) && newMember.roles.has(member.id)) {
    var timedOut = bot.guilds.first().members.get(oldMember.id);
    timedOut.removeRole(timeout);
    timedOut.addRole(member);
    var index = timedOutMembers.indexOf(newMember.id);
    if (index >= 0) {
      timedOutMembers.splice(index, 1);
    }
  }
});

bot.on("voiceStateUpdate", (oldMember, newMember) => {
  if (!oldMember.serverMute && newMember.serverMute) {
    var muted = bot.guilds.first().members.get(oldMember.id);
    setTimeout(() => {
      muted.setMute(false);
    }, 1800000);
  }

  giveaway.winners.forEach(winner => {
    if (
      newMember.id == winner &&
      newMember.voiceChannel != undefined &&
      newMember.voiceChannel.name == "Giveaway Entry"
    ) {
      newMember.setVoiceChannel(
        bot.guilds.first().channels.get("387435617983660033")
      );
    }
  });

  game.channels.forEach(channel => {
    var diffVoice;

    if (newMember.voiceChannel == undefined) {
      diffVoice = true;
    } else if (newMember.voiceChannel.id != channel.id) {
      diffVoice = true;
    }

    if (
      oldMember.voiceChannel != undefined &&
      oldMember.voiceChannel.id == channel.id &&
      diffVoice &&
      oldMember.id == channel.owner
    ) {
      oldMember.voiceChannel.delete();
      game.channels.splice(1);
    }
  });
});

bot.on("error", console.error);

bot.login(token.botToken).catch(console.error);
