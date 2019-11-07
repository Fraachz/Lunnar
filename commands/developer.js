const Discord = require('discord.js');

module.exports.run = async ({message, args, user, server, docDB}) => {

    message.delete().catch(e => {}) 

    let emj = '<:EMOJI2:615343200151797782>';
    let emj3 = '<:EMOJI:615343178433822756>';

    let prefix = server.prefix;

    if (!user.dono) {
        return message.channel.send(emj + ' **| Você não possui a permissão `DONO`.**');
    }

    if (args === undefined || args.length === 0) {
        message.channel.send(`**${emj} | Comando errado, use: "${prefix}developer <add:remove>".**`)
        return;
    }

    let membro = message.mentions.users.first();
    if (!membro) {
        return message.channel.send(`**${emj} | Cite algum membro para que eu possa seta-lo em minha equipe de developers!**`)
    }

    if (args[0] == 'add') {

        let membroDB = await docDB({type: 1, content: membro})

        membroDB.developer = true
        membroDB.save();

        return message.channel.send(`**${emj3} | O membro foi adicionado em minha equipe de developers.**`)

    }

    if (args[0] == 'remove') {

        let membroDB = await docDB({type: 1, content: membro})

        membroDB.developer = false
        membroDB.save();

        return message.channel.send(`**${emj3} | O membro foi removido da equipe de developers.**`)

    }

}

module.exports.help = {
    name: 'developer'
}