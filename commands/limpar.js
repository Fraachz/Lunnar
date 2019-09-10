const Discord = require("discord.js");

module.exports.run = async ({message, args}) => {
    
    message.delete().catch(e => {})

    let emj = '<:EMOJI2:615343200151797782>';
    let emj2 = '<:EMOJI:615343178433822756>';

    if (!message.member.hasPermission('MANAGE_CHANNELS')) {
        return message.channel.send(emj + ' **| Você não possui a permissão `MANAGE_CHANNELS`.**');
    }

    if (!args[0]) {
        return message.channel.send(`**${emj} | Eu não posso apagar [0] mensagens.**`);
    }

    if (args[0] == 1) { 
        return message.channel.send(`**${emj} | Eu não posso apagar [1] mensagem.**`);
    }
    
    if (args[0] == 0) { 
        return message.channel.send(`**${emj} | Eu não posso apagar [0] mensagens.**`);
    }

    if (args[0] > 100) { 
        return message.channel.send(`**${emj} | Eu não posso apagar mais que [100] mensagens.**`);
    }

    message.channel.bulkDelete(args[0]).then(() => {

        message.channel.send(`**🧺 | Foram limpas ${args[0]} mensagens.**`).then(async msg => {

            msg.delete(1000);

            });
        }).catch(error => {
            console.log(`[LIMPAR] O comando limpar está com erro! Defeito: ${error}`);
            message.channel.send(`**${emj} | Um erro inesperado ocorreu! Erro: ${error}**`);
        })
}

module.exports.help = {
    name: "limpar"
}