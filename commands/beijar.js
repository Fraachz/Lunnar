const Discord = require('discord.js');

module.exports.run = async({message}) => {

    message.delete().catch(e => {})

    let emj = '<:EMOJI2:615343200151797782>';
    let emj2 = '<:EMOJI:615343178433822756>';

    let membro = message.mentions.users.first();
    if (!membro) {
        return message.channel.send(`**${emj} | Você não mencionou ninguém para você dar um super beijão!**`)
    }

    let embed = new Discord.RichEmbed()

    .setDescription(`**Você acaba de dar um SUPER HIPER BEIJÃO no(a) ${membro}!**`)
    .setImage(`http://sutilmentesensual.s.u.pic.centerblog.net/34f19547.gif`)
    .setFooter(`Lunnar © Todos Direitos Reservados`)

    message.channel.send(embed)

}

module.exports.help = {
    name: 'beijar'
}