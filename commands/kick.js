const Discord = require('discord.js');

module.exports.run = ({message, args, user, server}) => {

    message.delete().catch(e => {})

    let emj = '<:EMOJI2:615343200151797782>';
    let emj2 = '<:EMOJI:615343178433822756>';

    let prefix = server.prefix;

    if (!user.dono && !user.developer && !message.guild.me.hasPermission("KICK_MEMBERS")) { 
        return message.channel.send(emj + '** | Você não possui a permissão `KICK_MEMBERS` para executar este comando.**');
    }

    var alvo = message.mentions.users.first();
    if (message.mentions.users.size < 1) return message.channel.send(`**${emj} | Você não mencionou nenhum membro para ser adicionado na minha equipe de donos.**`);
    if (!message.guild.member(alvo).kickable) return message.channel.send(`**${emj} | O cargo do membro mencionado, é acima de seu cargo.**`);
    
    var razão = args.slice(1).join(" ");
    if (razão.length < 1) return message.channel.send(`**${emj} | Você não falou a razão do kick.**`);
    message.guild.member(alvo).kick();
    
    message.author.send(`**${emj2} | Jogador Kickado!**`);
    message.channel.send(`**${emj2} | O usuário ${alvo.tag}, foi expulso do servidor, pelo motivo: ${razão}.**`);
}

module.exports.help = {
    name: 'kick'
};