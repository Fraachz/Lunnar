const Discord = require('discord.js');
const database = require('../mongodb.js');

module.exports.run = async ({client, message, args, server, docDB}) => {
    
    message.delete().catch(e => {})

    let emj = '<:EMOJI2:615343200151797782>';
    let emj2 = '<:EMOJI:615343178433822756>';

    let prefix = server.prefix;

    if (!user.dono && !user.developer && !message.member.hasPermission('ADMINISTRATOR')) {
        return message.channel.send(emj + '** | Você não possui a permissão `ADMINISTRADOR` para executar este comando.**');
    
    }

        if (args === undefined || args.length === 0) {
        message.channel.send(`**${emj} | Comando errado, use: "${prefix}servidor <sobre : dellsobre : info>".**`);
        return;
    }

    if (args[0] === 'sobre') {

        let MSG = args.join(' ');
        if (!MSG) {
            return message.channel.send(`**${emj} | Insira uma mensagem para que eu possa seta-la como o sobre do servidor.**`)
        }

        server.sobre = MSG;
        server.save();

    }

    if (args[0] === 'dellsobre') {
        
    }

    if (args[0] === 'info') {
        
    }

}

module.exports.help = {
    name: 'servidor'
}