const Discord = require('discord.js');

module.exports.run = async ({message, args, user, server}) => {
    
    message.delete().catch(e => {})

    let emj = '<:EMOJI2:615343200151797782>';
    let emj2 = '<:EMOJI:615343178433822756>';

    let prefix = server.prefix;

    if (!user.dono && !user.developer && !message.member.hasPermission('ADMINISTRATOR')) {
        return message.channel.send(emj + '** | Você não possui a permissão `ADMINISTRADOR` para executar este comando.**');
    
    }

        if (args === undefined || args.length === 0) {
        message.channel.send(`**${emj} | Comando errado, use: "${prefix}servidor <addsobre : dellsobre>".**`);
        return;
    }

    if (args[0] === 'addsobre') {

        let MSG = args.slice(1).join(' ');
        if (!MSG) {
            return message.channel.send(`**${emj} | Insira uma mensagem para que eu possa seta-la como o sobre do servidor.**`)
        }

        server.sobre = MSG;
        server.save();

        return message.channel.send(`**${emj2} | O sobre de sua guild foi setado. (${MSG})**`)

    }

    if (args[0] === 'dellsobre') {

        server.sobre = '**<:EMOJI2:615343200151797782> | O servidor não possui um sobre. (Use '+ prefix +'servidor para setar o sobre.)**';
        server.save();

        return message.channel.send(`**${emj2} | O sobre do servidor foi deletado e alterado para o padrão.**`)
        
    }

}

module.exports.help = {
    name: 'servidor'
}