const Discord = require('discord.js');
const database = require('../mongodb.js');
const { docDB } = require('../index.js')

module.exports = async (client, member) => {

    let server = await docDB({type: 2, content: member.guild});

    let msg = server.welcomeMsg;
    let canal = member.guild.channels.get(server.exitCanal);
    if (!canal) return
    
    let role = member.guild.roles.get(server.welcomeRole);
    if (!role) return;

    let embeddd = server.welcomeEmbed;

    msg = msg.replace(/{grupo}/g, member.guild.name).replace(/{user}/g, member).replace(/{nick}/g, member.user.tag).replace(/{count}/g, member.guild.memberCount);

    let embed = new Discord.RichEmbed()

    .setDescription(msg)
    .setThumbnail(member.user.avatarURL)
    .setColor('#FF0000')
    .setFooter(`Lunnar © Todos Direitos Reservados`);

    if(embeddd) {

        canal.send(embed);
        
    } else {

        canal.send(msg);
    
    }

    member.addRole(role)
}