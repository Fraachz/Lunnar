const Discord = require('discord.js');
const database = require('../mongodb.js');

// . = Entra na pasta
// .. => Sai da pasta

module.exports.run = async ({client, message, args, user, server, docDB}) => {

    message.delete().catch(e => {})

    let emj = '<:EMOJI2:615343200151797782>';
    let emj2 = '<:EMOJI:615343178433822756>';

    let prefix = server.prefix;

    if (!user.dono) {
        return message.channel.send(emj + ' **| Você não possui a permissão `DONO`.**');
    
    }

    if (args === undefined || args.length === 0) {
            message.channel.send(`**${emj} | Comando errado, use: "${prefix}manu <add:remove>".**`)
            return;
    }

    if (args[0] == 'add') {

        let cmdName = args.slice(1).join(' ').toLowerCase();
        if (!cmdName) {
            return message.channel.send(`**${emj} | Me indique o comando que você quer adicionar em manutenção.**`);
        }

        let cmdDB = await database.Commands.findOne({'_id': cmdName})
        if(!cmdDB) {
            return message.channel.send(`**${emj} | O comando digitado não existe.**`);
        }

        if (cmdDB.manu) {
            return message.channel.send(`**${emj} | O comando digitado já foi adicionado manutenção.**`);
        }
        
        cmdDB.manu = true;
        cmdDB.save();

        message.channel.send(`**${emj2} | O comando digitado (${cmdName}), foi adicionado em manutenção preventiva, para remover use: ${prefix}manu remove ${cmdName}**`);
    
    }    

    if (args[0] == 'remove') {

        let cmdName = args.slice(1).join(' ').toLowerCase();
        if (!cmdName) {
            return message.channel.send(`**${emj} | Me indique o comando que você quer retirar da manutenção!**`);
        }

        let cmdDB = await database.Commands.findOne({'_id': cmdName})
        if(!cmdDB) {
            return message.channel.send(`**${emj} | O comando digitado não existe.**`);
        }

        if (!cmdDB.manu) {
            return message.channel.send(`**${emj} | O comando digitado já foi removido manutenção.**`);
        }

        cmdDB.manu = false;
        cmdDB.save();

        message.channel.send(`**${emj2} | O comando digitado (${cmdName}), foi removido da manutenção preventiva, para adiciona-lo novamente use: ${prefix}manu add ${cmdName}**`);

    }
    
}
    
module.exports.help = {
    name: 'manu'
}