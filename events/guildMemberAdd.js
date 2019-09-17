const Discord = require('discord.js');
const database = require('../mongodb.js');
const { docDB } = require('../index.js')

module.exports = async (client, member) => {

    let server = await docDB({type: 2, content: member.guild});

    let role = member.guild.roles.get(server.welcomeRole);
    if (role) {
        member.addRole(role)
    } 
    let canal = member.guild.channels.get(server.welcomeCanal);
    if (canal) {
        let msg = server.welcomeMsg;
        let embeddd = server.welcomeEmbed;

        msg = msg.replace(/{grupo}/g, member.guild.name).replace(/{user}/g, member).replace(/{nick}/g, member.user.tag).replace(/{count}/g, member.guild.memberCount);
    
        let embed = new Discord.RichEmbed()
    
        .setDescription(msg)
        .setThumbnail(member.user.avatarURL)
        .setColor('#32FF00')
        .setFooter(`Lunnar © Todos Direitos Reservados`);
    
        if(embeddd) {
    
            canal.send(embed);
            
        } else {
    
            canal.send(msg);
        
        }
    }
}