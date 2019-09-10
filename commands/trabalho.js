const Discord = require('discord.js');
const database = require('../mongodb.js');

module.exports.run = async ({client, message, args, user, server, docDB}) => {
    
    message.delete().catch(e => {})

    let emj = '<:EMOJI2:615343200151797782>';
    let emj2 = '<:EMOJI:615343178433822756>';

    let prefix = server.prefix;

        if (args === undefined || args.length === 0) {
        message.channel.send(`**${emj} | Comando errado, use: "${prefix}trabalho <proposta : sair : saldo : marcarponto : info>".**`);
        return;
    }

    if (args[0] === 'proposta') {

    }

    if (args[0] === 'sair') {
        
    }

    if (args[0] === 'saldo') {
        
    }

    if (args[0] === 'marcarponto') {
        
    }

    if (args[0] === 'info') {
        
    }

}

module.exports.help = {
    name: 'trabalho'
}