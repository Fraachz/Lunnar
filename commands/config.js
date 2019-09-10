const Discord = require('discord.js');

module.exports.run = async({client, message, args, user, server}) => {

    let emj = '<:EMOJI2:615343200151797782>';
    let emj2 = '<:EMOJI:615343178433822756>';

    if (!user.dono && !user.developer && !message.member.hasPermission('MANAGE_GUILD')) {
        return message.channel.send(emj + ' **| Você não possui a permissão `MANAGE_GUILD`.**');
    }

    let embed = new Discord.RichEmbed()

    .setDescription()
    .setFooter()

    message.channel.send(embed);

}

module.exports.help = {
    name: 'config'
}