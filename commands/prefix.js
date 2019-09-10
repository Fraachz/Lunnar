const Discord = require('discord.js');

// . = Entra na pasta
// .. => Sai da pasta

module.exports.run = async ({client, message, args, user, server}) => {

    message.delete().catch(e => {})

    let emj = '<:EMOJI2:615343200151797782>';
    let emj2 = '<:EMOJI:615343178433822756>';

    let prefix = server.prefix;

    if (!user.dono && !user.developer && !message.member.hasPermission('MANAGE_GUILD')) {
        return message.channel.send(emj + '** | Você não possui a permissão `MANAGE_GUILD` para executar este comando.**');
    
    }

    if (args === undefined || args.length === 0) {
            message.channel.send(`**${emj} | Comando errado, use: "${prefix}prefix <set:reset>".**`);
            return;
    }

    if (args[0] == 'set') {

        let MSG = args.slice(1).join(' ');
        if (!MSG) {
            return message.channel.send(`**${emj} | Insira algum prefix válido, para que eu possa o adicionar.**`);
        }

        server.prefix = MSG
        server.save();

            return message.channel.send(`**${emj2} | O meu prefix neste servidor foi alterado para: ${MSG}**`);

    } 
        
    if (args[0] == 'reset') {

        server.prefix = 'l!!';
        server.save();

        prefix2 = 'l!!';

            return message.channel.send(`**${emj2} | O meu prefix neste servidor foi resetado, sendo assim ficando: ${prefix2}**`)

    }
}
    
module.exports.help = {
    name: 'prefix'
}