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

let timedOutMembers = [];

bot.on("ready", function() {
  console.log("Bot is ready!");
  bot.user.setActivity("use !help");
  bot.guilds
    .first()
    .roles.get("361164004682366977")
    .members.forEach(member => {
      timedOutMembers.push(member.id);
    });
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
  if (
    message.author.id == "340002869912666114" ||
    message.author.id == "326437722120126485" ||
    message.author.id == "148847883632902151"
  ) {
    isTest = true;
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
    return;
  } else if (command == "!INVITE") {
    basic.invite(message);
    return;
  } else if (command == "!SHUTDOWN") {
    mod.shutdown(message, bot);
    return;
  } else if (command == "!VC") {
    game.vc(message);
  } else if (command == "!GIVEAWAY") {
    giveaway.giveaway(message);
  } else if (command == "!REQUEST") {
    basic.request(message, bot, Discord);
  }
});

bot.on("guildMemberAdd", (guildMember) => {
  var timeout = bot.guilds.first().roles.get("361164004682366977");
  timedOutMembers.forEach(member => {
    if (member == guildMember.id) {
      guildMember.addRole(timeout);
    }
  });
});

bot.on("guildMemberUpdate", function(oldMember, newMember) {
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
