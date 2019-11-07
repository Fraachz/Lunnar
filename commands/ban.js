const Discord = require('discord.js');

module.exports.run = ({message, args, user, server}) => {

    message.delete().catch(e => {})

    let emj = '<:EMOJI2:615343200151797782>';
    let emj2 = '<:EMOJI:615343178433822756>';

    let prefix = server.prefix;

    if (!user.dono && !user.developer && !message.guild.me.hasPermission("BAN_MEMBERS")) { 
        return message.channel.send(emj + '** | Você não possui a permissão `BAN_MEMBERS` para executar este comando.**');
    }

    var alvo = message.mentions.users.first() || client.users.get(args[1]);
    if (message.mentions.users.size < 1) return message.channel.send(`**${emj} | Você não mencionou nenhum membro para ser banido.**`);
    if (!message.guild.member(alvo).bannable) return message.channel.send(`**${emj} | O cargo do membro mencionado, é acima de seu cargo.**`);
    
    var razão = args.slice(1).join(" ");
    if (razão.length < 1) return message.channel.send(`**${emj} | Você não falou a razão do banimento.**`);
    message.guild.member(alvo).ban();
    
    message.author.send(`**${emj2} | Jogador Banido!**`);
    message.channel.send(`**${emj2} | O usuário ${alvo.tag}, foi banido do servidor, pelo motivo: ${razão}.**`);
}

module.exports.help = {
    name: 'ban'
};