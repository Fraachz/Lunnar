const Discord = require('discord.js');
const database = require('../mongodb.js');

module.exports = async (client, member, docDB) => {

    let server = await docDB({ type: 2, content: member.guild });

    let msg = server.welcomeMsg;
    let canal = member.guild.channels.get(server.exitCanal);

    let role = member.guild.roles.get(server.welcomeRole);

    let embeddd = server.welcomeEmbed;

    msg = msg.replace(/{grupo}/g, member.guild.name).replace(/{user}/g, member).replace(/{nick}/g, member.user.tag).replace(/{count}/g, member.guild.memberCount);

    let embed = new Discord.RichEmbed()

        .setDescription(msg)
        .setThumbnail(member.user.avatarURL)
        .setColor('#FF0000')
        .setFooter(`Lunnar © Todos Direitos Reservados`);

    if (embeddd) {

        if (canal) canal.send(embed);

    } else {

        if (canal) canal.send(msg);

    }

    if (role) {
        member.addRole(role)
    }
}