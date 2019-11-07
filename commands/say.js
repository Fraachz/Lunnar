const Discord = require('discord.js');

module.exports.run = async({message, args, user}) => {

    message.delete().catch(e => {})

    let emj = '<:EMOJI2:615343200151797782>';
    let emj2 = '<:EMOJI:615343178433822756>';

    if (!user.dono && !user.developer && !message.member.hasPermission('MANAGE_GUILD')) {
        return message.channel.send(emj + ' **| Você não possui a permissão `MANAGE_GUILD`.**');
    }

    let MSG = args.join(' ');
    if (!MSG) {
        return message.channel.send(`**${emj} | Insira uma mensagem para que eu possa reescreve-la.**`)
    }

    message.channel.send(MSG)

}
module.exports.help = {
    name: 'say'
}