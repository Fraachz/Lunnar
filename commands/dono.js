const Discord = require('discord.js');
const database = require('../mongodb.js');

// . = Entra na pasta
// .. => Sai da pasta

module.exports.run = async ({client, message, args, user, server, docDB}) => {

    message.delete().catch(e => {})

    let emj = '<:EMOJI2:615343200151797782>';
    let emj2 = '<:EMOJI:615343178433822756>';

    let prefix = server.prefix;

    if (message.author.id !== '446857017429196810') {
        return message.channel.send(emj + '** | Você não possui a permissão `DONO` para executar este comando.**');
    
    }

    if (args === undefined || args.length === 0) {
            message.channel.send(`**${emj} | Comando errado, use: "${prefix}dono <add:remove>".**`);
            return;
    }

    if (args[0] == 'add') {
        
        let membro = message.mentions.users.first();
        if (!membro) {
            return message.channel.send(`**${emj} | Você não mencionou nenhum membro para ser adicionado na minha equipe de donos.**`);
        }

        let membroDB = await docDB({type: 1, content: membro})

        membroDB.dono = true
        membroDB.save();

            return message.channel.send(`**${emj2} | O ${membro}, foi adicionado em minha equipe de donos.**`);
    } 

    if (args[0] == 'remove') {

        let membro = message.mentions.users.first();
        if (!membro) {
            return message.channel.send(`**${emj} | Você não mencionou nenhum membro para ser adicionado na minha equipe de donos.**`);        
    }

        let membroDB = await docDB({type: 1, content: membro});

        membroDB.dono = false
        membroDB.save();

        return message.channel.send(`**${emj2} | O ${membro}, foi removido da minha equipe de donos.**`);
    }
    
}
    
module.exports.help = {
    name: 'dono'
}