const Discord = require('discord.js');
const database = require('../mongodb.js');

module.exports.run = async({message, args, user, server}) => {

    message.delete().catch(e => {})

    let emj = '<:EMOJI2:615343200151797782>';
    let emj2 = '<:EMOJI:615343178433822756>';

    let prefix = server.prefix;

    if (!user.dono && !user.developer && !message.member.hasPermission('MANAGE_GUILD')) {
        return message.channel.send(emj + ' **| Você não possui a permissão `MANAGE_GUILD`.**');
    }

    if (args === undefined || args.length === 0) {
        message.channel.send(`**${emj} | Comando errado, use: "${prefix}exit <info : embed : setcanal : setmsg : desligar>".**`);
        return;
    }

    if (args[0] === 'embed') {

        let nameSend = await message.channel.send('**<:EMOJI3:617554602576838676> | Você deseja que a mensagem seja em embed? Digite `sim` para deixar a mensagem em embed, digite `não` para deixar a mensagem normal.**');
        
        message.channel.awaitMessages(mensagem => mensagem.author.id === message.author.id, {
            
            maxMatches: 1,
            time: 30000,
            errors: ['time']
        
        }).then(async nameAnswer => {

            name = nameAnswer.first().content
            await nameSend.delete()

            if(name === 'sim') { 

                server.welcomeEmbed = true
                server.save();

                return message.channel.send(`**${emj2} | A mensagem definida foi: Mensagem Com Embed**`);
            }

            if(name === 'não') { 

                server.welcomeEmbed = false
                server.save();

                return message.channel.send(`**${emj2} | A mensagem definida foi: Mensagem Sem Embed**`);
            }
        }), function () {

        let prefix = server.prefix;
        return message.channel.send(`**${emj} | O seu tempo foi esgotado, execute o comando novamente (${prefix}exit embed) e digite mais rápido.**`);

        }
    }

    if (args[0] === 'setcanal') {

        let canal = args.slice(1).join(' ');
        if (!canal) {
            return message.channel.send(emj + '** | Você não inseriu nenhum canal para que eu possa setar-lo como `EXIT CHANNEL`**');
        }

        canal = message.guild.channels.get(canal.replace(/[^0-9]/g, ''));

        server.exit = true;

        server.exitOn = '**<:aon:572142761336111108> (**`Ativado`**)**';
        server.exitCanal = canal.id;

        server.save();

            return message.channel.send(`**${emj2} | O canal de saída foi setado (${canal}), agora a mensagem setada será enviada no mesmo.**`);

    }

    if (args[0] === 'setmsg') {

        let msg = args.slice(1).join(' ');
        if (!msg) {
            return message.channel.send(emj + '** | Você não inseriu nenhuma mensagem para que eu possa setar-la como `EXIT MESSAGE`**');
        }

        server.exit = true;
        
        server.exitOn = '**<:aon:572142761336111108> **(**`Ativado`**)**';
        server.exitMsg = msg;

        server.save();

        let canal = server.exitCanal

            message.channel.send(emj2 + '** | A mensagem de saída foi setada, agora a mensagem setada será enviada no canal setado.**');
    }

    if (args[0] === 'desligar') {

        server.exit = false;
        
        server.exitOn = '**<:off:572142645212872735> **(**`Desativado`**)**';
        server.exitCanal = `**${emj} | O canal de saída ainda não foi setada.**`;
        server.exitMsg = `**${emj} | A mensagem de saída ainda não foi setada.**`;
        server.exitEmbed = false
        
        server.save();

            return message.channel.send(emj2 + '** | O evento `EXIT` foi desligado, sendo assim deletei todos os dados (Canais setados e mensagens setadas).**');

    }

    if (args[0] === 'info') {

            let msg = server.exitMsg;
            let canal = server.exitCanal;
            let on = server.exitOn;

            let embed = new Discord.RichEmbed()

                .setTitle('**<:EMOJI8:617554601511485449> | Informações do `EXIT`**')
                .setDescription('**<:suporte:564141197388546068> | Aqui está todas informações do `EXIT`.**\n\n<:code:570987560193753088> | Status**\n' + on + '\n\n**<:cliente:564141185887895574> | Mensagem definida**\n' + msg + '\n\n**<:global:570987560172519454> | Canal definido**\n<#' + canal + '>\n\n**<:duvida:576860848321200139> | Como usar `(EXEMPLO)`**\n```\n' + prefix + 'exit setmsg {user} saiu do servidor {grupo}\n```\n\n**<:manutencao:564141187930259487> | Variaveis**\n`{grupo}` utilizado para mostrar o nome da Guild\n`{user}` utilizado para mencionar o membro que saiu.\n`{nick}` utilizado para mostrar o nickname e tagname do usuario.\n`{count}` utilizado para mostrar a quantidade de membros da guild.')
                .setFooter(`Lunnar © Todos Direitos Reservados`);

            message.channel.send(embed)

    }

}
module.exports.help = {
  name: 'exit'
}