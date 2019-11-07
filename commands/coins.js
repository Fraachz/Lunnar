const Discord = require('discord.js');

module.exports.run = async ({message, user, server, docDB}) => {

    message.delete().catch(e => {})

    let emj = '<a:EMOJI18:619934249549824000>';
    let prefix = server.prefix

    let membro = message.mentions.users.first() ? message.mentions.users.first() : message.author
    let membroDB = await docDB({type: 1, content: membro})

    if(membro.id !== message.author.id) {
        return message.channel.send(emj + '** | O '+ membro +' possui `' + Number(membroDB.coins).toLocaleString() + '` reais em sua carteira.**')            

    } else {
        return message.channel.send(emj + '** | Você possui `' + Number(user.coins).toLocaleString() + '` reais em sua carteira, para depositar use: `'+ prefix +'banco depositar`.**')
    }
}

module.exports.help = {
    name: 'coins'
}