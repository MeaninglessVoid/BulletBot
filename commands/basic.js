const moment = require("moment");

module.exports = {
  agree: function(message) {
    //member id: 306234601817505793
    //test id: 388157472885571584
    const member = message.guild.roles.get("306234601817505793");

    var days = moment().diff(message.author.createdAt, "days");

    if (days <= 7) {
      message.reply(
        "Your account is too young to be given the member role automatically, please contact <@&322941932848283662> or <@&306234269435691008> to resolve this issue, thank you!"
      );
      return;
    }

    message.member.addRole(member);

    message.delete();
  },
  invite: function(message) {
    message.reply("https://discord.gg/bulletbarry");
  }
};
