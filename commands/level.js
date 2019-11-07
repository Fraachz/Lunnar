const Discord = require('discord.js');

module.exports.run = async({message, args, user, server}) => {

    message.delete().catch(e => {})

    let emj = '<:EMOJI2:615343200151797782>';
    let emj2 = '<:EMOJI:615343178433822756>';

    let prefix = server.prefix;

    if (!user.dono && !user.developer && !message.member.hasPermission('MANAGE_GUILD')) {
        return message.channel.send(emj + ' **| Você não possui a permissão `MANAGE_GUILD`.**');
    }

    if (args === undefined || args.length === 0) {
        message.channel.send(`**${emj} | Comando errado, use: "${prefix}level <setcanal : desligar : info>".**`);
        return;
    }

    if (args[0] === 'setcanal') {

        canal = message.guild.channels.get(canal.replace(/[^0-9]/g, ''));
    
            server.level = true;
            
            server.levelOn = '**<:aon:572142761336111108> **(**`Ativado`**)**';
            server.levelCanal = canal.id;
    
            server.save();
    
            message.channel.send(emj2 + '** | O canal do level foi setado, agora todos mensagens de levels será enviada neste canal.**');
    }


    if (args[0] === 'desligar') {

        server.level = false;
        
        server.levelOn = '**<:off:572142645212872735> **(**`Desativado`**)**';
        server.levelCanal = `**${emj} | O canal do level ainda não foi setado.**`;

        server.save();

            return message.channel.send(emj2 + '** | O evento `Level` foi desligado, sendo assim deletei todos os dados (Canais setadas).**');

    }

    if (args[0] === 'info') {

        let canal = server.levelCanal;
        let on = server.levelOn;

        let embed = new Discord.RichEmbed()

            .setTitle('**<:EMOJI8:617554601511485449> | Informações do `Level`**')
            .setDescription('**<:suporte:564141197388546068> | Aqui está todas informações do `Level`.**\n\n<:code:570987560193753088> | Status**\n' + on + '\n\n**<:global:570987560172519454> | Canal definido**\n<#' + canal + '>\n\n**<:duvida:576860848321200139> | Como usar `(EXEMPLO)`**\n```\n' + prefix + 'invite setcanal #level```')
            .setFooter(`Lunnar © Todos Direitos Reservados`);

        message.channel.send(embed)

    }
}

module.exports.help = {
    name: 'level'
}