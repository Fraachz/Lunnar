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
        return message.channel.send(`**${emj} | Sem permissão para executar este comando.**`);
    
    }

    if (args === undefined || args.length === 0) {
            message.channel.send(`**${emj} | Comando errado, use: "${prefix}blacklist <add:remove>".**`)
            return;
    }

    if (args[0] == 'add') {

        let membro = message.mentions.users.first() || client.users.get(args[1]);
        let membroDB = await docDB({type: 1, content: membro})

        if (!membro) {
            return message.channel.send(`**${emj} | Cite algum membro para que eu possa seta-lo na lista negra!**`)
        }

        if (membroDB.blacklist) {
            return message.channel.send(`**${emj} | O usuário citado já foi adicionado na minha lista negra.**`)
        }

        membroDB.blacklist = true;
        membroDB.doador = false;

        membroDB.xp = 0;
        membroDB.level = 0;
        membroDB.coins = 0;
        membroDB.bank = 0;
        membroDB.doadorTime = 0;
        
        membroDB.save()

        message.channel.send(`**${emj2} | O usuario foi adicionado na minha lista negra!**`);

    }    

    if (args[0] == 'remove') {

        let membro = message.mentions.users.first() || client.users.get(args[1]);
        let membroDB = await docDB({type: 1, content: membro})
        
        if (!membro) {
            return message.channel.send(`**${emj} | Cite algum membro para que eu possa remove-lo da lista negra!**`)
        }

        if (!membroDB.blacklist) {
            return message.channel.send(`**${emj} | O usuário citado já foi removido da minha lista negra.**`)
        }
        
        membroDB.blacklist = false;
        membroDB.doador = false;

        membroDB.xp = 0
        membroDB.level = 0
        membroDB.coins = 0
        membroDB.bank = 0
        membroDB.doadorTime = 0;

        membroDB.save()

        message.channel.send(`**${emj2} | O usuario foi removido da minha lista negra!**`);

    }
    
}
    
module.exports.help = {
    name: 'blacklist'
}