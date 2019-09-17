const Discord = require('discord.js');
const database = require('../mongodb.js');
const moment = require('moment')
moment.locale('pt-BR')
const ms = require('ms')

// . = Entra na pasta
// .. => Sai da pasta

module.exports.run = async ({client, message, args, user, server, docDB}) => {

    message.delete().catch(e => {})

    let emj = '<:EMOJI2:615343200151797782>';
    let emj2 = '<:EMOJI:615343178433822756>';

    let prefix = server.prefix;

    if (!user.dono) {
        return message.channel.send(emj + '** | Você não possui a permissão `DONO` para executar este comando.**');
    
    }

    if (args === undefined || args.length === 0) {
            message.channel.send(`**${emj} | Comando errado, use: "${prefix}doadores <add:remove>".**`);
            return;
    }

    if (args[0] == 'add') {

        let membro = message.mentions.users.first();
        let membroDB = await docDB({type: 1, content: membro})
        if (!membro) {
            return message.channel.send(`**${emj} | Você não mencionou nenhum membro para ser adicionado na minha lista de doadores.**`);
        }

        if(membroDB.doador) {
            return message.channel.send(`**${emj} | O membro citado já é um doador!**`)
        }

        if(!args[1]) {
            return message.channel.send(`**${emj} | Você não informou um tempo exato.**`)
        }

        if(args[1] && ms(args[1]) === undefined) {
            return message.channel.send(`**${emj} | O tempo citado no momento, é invalído!**`)
        }

        let time = parseInt(ms(args[1]))
        let timeStr = moment(Date.now() + time).format('D [d], H [h], m [m], s [s]')

        membroDB.doador = true;
        membroDB.doadorTime = Date.now() + time
        membroDB.save()

        return message.channel.send(`**${emj2} | O ${membro} virou um doador, tempo restante: ${timeStr}**`)
    } 

    if (args[0] == 'remove') {

        let membro = message.mentions.users.first();
        let membroDB = await docDB({type: 1, content: membro});
        if (!membro) {
            return message.channel.send(`**${emj} | Você não mencionou nenhum membro para ser adicionado na minha lista de doadores.**`);        
        }

        if(membroDB.doador) {
            return message.channel.send(`**${emj} | O membro citado não é um doador!**`)
        }

        membroDB.doador = false
        membroDB.doadorTime = 0
        membroDB.save();

        return message.channel.send(`**${emj2} | O ${membro}, foi removido da minha lista de doadores.**`);
    }
    
}
    
module.exports.help = {
    name: 'doador'
}