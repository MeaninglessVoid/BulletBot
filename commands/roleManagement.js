const allowedRoles = [
  "387964014669332486", //Slave
  "382284380862677003", //Minecraft
  "382284381869572096", //Gaming
  "382284382729273344", //Anime
  "355139040539836417", //Pink_Pastel
  "354412120131239946", //Red_Pastel
  "354412134911836162", //Orange_Pastel
  "354412136795209728", //Yellow_Pastel
  "354412138414211074", //Green_Pastel
  "354412140125224961", //Turquoise_Pastel
  "354413256187838485", //Blue_Pastel
  "354412144130785295", //Cyan_Pastel
  "387048833030291466", //Purple_Pastel
  "355138700314673153", //Pink_Saturated
  "354413258142384132", //Red_Saturated
  "354413260457639957", //Orange_Saturated
  "354413584291201036", //Yellow_Saturated
  "354413614360166401", //Green_Saturated
  "354413616256253965", //Turquoise_Saturated
  "354413622459498496", //Cyan_Saturated
  "354413643103862784", //Blue_Saturated
  "387049364390150144", //Purple_Saturated
  "354988839485440009"  //Trevo\'s_Brodie_Armada
];

module.exports = {
  want: function(message) {
    let argsL = message.content.split(" ").slice(1);

    var allowedToHave = false;

    var roleWant = argsL.join(" ").toLowerCase();

    allowedRoles.forEach(function(role) {
      if (roleWant == message.guild.roles.get(role).name.toLowerCase()) {
        allowedToHave = true;
        roleWant = message.guild.roles.get(role);
      }
    });

    if (!allowedToHave) {
      message.author.send(
        "You do not have the permission to have that role, or it doesn't exist."
      );
      message.delete();
      return;
    }

    message.member.addRole(roleWant, "Bot added role automatically").catch(err => {
      console.error(err);
    });

    message.delete();
  },
  dontwant: function(message) {
    let argsL = message.content.split(" ").slice(1);

    allowedToRemove = false;
    var roleWant;

    message.member.roles.forEach(function(role) {
      if (argsL.join(" ").toLowerCase() == role.name.toLowerCase())
        allowedToRemove = true;
    });

    if (!allowedToRemove) {
      message.author.send("You don't have this role!");
      message.delete();
      return;
    }

    allowedToRemove = false;

    allowedRoles.forEach(function(role) {
      if (
        message.guild.roles.get(role).name.toLowerCase() ==
        argsL.join(" ").toLowerCase()
      ) {
        allowedToRemove = true;
        roleWant = role;
      }
    });

    if (!allowedToRemove) {
      message.author.send(
        "You do not have permission to remove that role, or it doesn't exist"
      );
      return;
    }

    message.member.removeRole(roleWant, "Bot removed role automatically").catch(err => {
      console.error(err);
    });

    message.delete();
  }
};
