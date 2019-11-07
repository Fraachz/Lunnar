const Discord = require('discord.js');

module.exports.run = async({message}) => {

    message.delete().catch(e => {})

    let emj = '<:EMOJI2:615343200151797782>';
    let emj2 = '<:EMOJI:615343178433822756>';

    let membro = message.mentions.users.first();
    if (!membro) {
        return message.channel.send(`**${emj} | Você não mencionou ninguém para você atirar nele!**`)
    }

    let embed = new Discord.RichEmbed()

    .setDescription(`**Você acaba de virar o Atirador de Elite, você atirou no(a) ${membro}!**`)
    .setImage(`http://giphygifs.s3.amazonaws.com/media/f2fVSJWddYb6g/giphy.gif`)
    .setFooter(`Lunnar © Todos Direitos Reservados`)

    message.channel.send(embed)

}

module.exports.help = {
    name: 'atirar'
}