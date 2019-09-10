const Discord = require('discord.js');

module.exports.run = async ({client, message, args, user, server}) => {

    message.delete().catch(e => {})

    let emj = '<a:EMOJI18:619934249549824000>';
    let prefix = server.prefix

    return message.channel.send(emj + '** | Você possui `' + Number(user.coins).toLocaleString() + '` reais em sua carteira, para depositar use: `'+ prefix +'banco depositar`.**')

}

module.exports.help = {
    name: 'coins'
}