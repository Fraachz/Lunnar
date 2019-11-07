const Discord = require('discord.js');

module.exports.run = async({client, message, args, server, user}) => {

    prefix = server.prefix;

    if (!user.dono) {
        return message.channel.send(emj + ' **| Você não possui a permissão `DONO`.**');
    }

    if (args[0] === 'addguild') {

    }
    
    if (args[0] === 'removeguild') {

    }

}

module.exports.help = {
    name: 'exclusivo'
}