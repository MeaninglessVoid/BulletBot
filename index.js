const token = require("./token.json");

const Discord = require("discord.js");
const bot = new Discord.Client();

const roles = require("./commands/roleManagement");
const ui = require("./commands/userInfo");
const mod = require("./commands/moderation");
const basic = require("./commands/basic");
const help = require("./commands/help");
const game = require("./commands/gaming");
const giveaway = require("./commands/giveaway");

bot.on("ready", function() {
  console.log("Bot is ready!");
  bot.user.setActivity("use !help");
  // bot.guilds.first().members.get("340002869912666114").removeRole(bot.guilds.first().roles.get("354392788424589342"))
});

bot.on("message", function(message) {
  let wm = message.content.toUpperCase();

  let command = wm.split(" ")[0];

  if (message.author.bot || !message.content.startsWith("!")) return;

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
  if (message.channel.id == "388877963694964747") isTest = true;

  //welcome id: 384171995597897728
  //test id: 388137579821924366
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
    isTest
  ) {
    if (command == "!USERINFO" || command == "!UI") {
      ui.ui(message, Discord);
      return;
    } else if (command == "!VERSION") {
      basic.version(message, bot, Discord);
    }
  }

  if (command == "!HELP") {
    help.help(bot, message);
    return;
  } else if (command == "!INVITE") {
    basic.invite(message);
    return;
  } else if (command == "!SHUTDOWN") {
    mod.shutdown(message, bot);
    return;
  } else if (command == "!CLEAN") {
    mod.clean(message);
  } else if (command == "!VC") {
    game.vc(message);
  } else if (command == "!GIVEAWAY") {
    giveaway.giveaway(message);
  }
});

bot.on("guildMemberUpdate", function(oldMember, newMember) {
  var timeout = bot.guilds.first().roles.get("361164004682366977");
  var member = bot.guilds.first().roles.get("306234601817505793");

  if (!oldMember.roles.has(timeout.id) && newMember.roles.has(timeout.id)) {
    var timedOut = bot.guilds.first().members.get(newMember.id);
    timedOut.removeRole(member);
    timedOut.setVoiceChannel(
      bot.guilds.first().channels.get("374635912845590528")
    );
  }

  if (oldMember.roles.has(timeout.id) && newMember.roles.has(member.id)) {
    var timedOut = bot.guilds.first().members.get(oldMember.id);
    timedOut.removeRole(timeout);
    timedOut.addRole(member);
  }
});

bot.on("voiceStateUpdate", function(oldMember, newMember) {
  if (!oldMember.serverMute && newMember.serverMute) {
    var muted = bot.guilds.first().members.get(oldMember.id);
    setTimeout(function() {
      muted.setMute(false);
    }, 1800000);
  }

  giveaway.winners.forEach(winner => {
    if (
      newMember.id == winner &&
      newMember.voiceChannel != undefined &&
      newMember.voiceChannel.name == "Giveaway Entry!"
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
      game.channels.shift();
    }
  });
});

bot.login(token.botToken).catch(err => {
  console.error(err);
});
