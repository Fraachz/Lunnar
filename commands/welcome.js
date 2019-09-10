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
        message.channel.send(`**${emj} | Comando errado, use: "${prefix}welcome <info : setcanal : embed : setmsg : setrole : desligar>".**`);
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
        return message.channel.send(`**${emj} | O seu tempo foi esgotado, execute o comando novamente (${prefix}welcome embed) e digite mais rápido.**`);

        }
    }

    if (args[0] === 'setcanal') {

        let canal = args.slice(1).join(' ');
        if (!canal) {
            return message.channel.send(emj + '** | Você não inseriu nenhum canal para que eu possa setar-lo como `WELCOME CHANNEL`**');
        }

        canal = message.guild.channels.get(canal.replace(/[^0-9]/g, ''));

        server.welcome = true;

        server.welcomeOn = '**<:aon:572142761336111108> (**`Ativado`**)**';
        server.welcomeCanal = canal.id;

        server.save();

            return message.channel.send(`**${emj2} | O canal de entrada foi setado (${canal}), agora a mensagem setada será enviada no mesmo.**`);

    }

    if (args[0] === 'setmsg') {

        let msg = args.slice(1).join(' ');
        if (!msg) {
            return message.channel.send(emj + '** | Você não inseriu nenhuma mensagem para que eu possa setar-la como `WELCOME MESSAGE`**');
        }

        server.welcome = true;
        
        server.welcomeOn = '**<:aon:572142761336111108> **(**`Ativado`**)**';
        server.welcomeMsg = msg;

        server.save();

            message.channel.send(emj2 + '** | A mensagem de entrada foi setada, agora a mensagem setada será enviada no canal setado.**');
    }

    if (args[0] === 'setrole') {

        let role = message.mentions.roles.first();
        if (!role) {
            return message.channel.send(emj + '** | Você não mencionou nenhum cargo para que eu possa setar-lo como `WELCOME ROLE`**');
        }

        server.welcome = true;
        server.welcomeRoles = true;

        server.welcomeOn = '**<:aon:572142761336111108> **(**`Ativado`**)**';
        server.welcomeRole = role.id;

        server.save();

            message.channel.send(emj2 + '** | O cargo mencionado foi adicionado, agora todos os membros o receberá após entrar.**');
    }

    if (args[0] === 'desligar') {

        server.welcome = false;
        
        server.welcomeOn = '**<:off:572142645212872735> **(**`Desativado`**)**';
        server.welcomeCanal = `**${emj} | O canal de entrada ainda não foi setada.**`;
        server.welcomeMsg = `**${emj} | A mensagem de entrada ainda não foi setada.**`;
        server.welcomeRole = `**${emj} | O cargo de entrada ainda não foi setado.**`;
        server.welcomeEmbed = false;

        server.save();

            return message.channel.send(emj2 + '** | O evento `WELCOME` foi desligado, sendo assim deletei todos os dados (Canais setados e mensagens setadas).**');

    }

    if (args[0] === 'info') {

            let msg = server.welcomeMsg;
            let canal = server.welcomeCanal;
            let on = server.welcomeOn;
            let role = server.welcomeRole;

            let embed = new Discord.RichEmbed()

                .setTitle('**<:EMOJI8:617554601511485449> | Informações do `WELCOME`**')
                .setDescription('**<:suporte:564141197388546068> | Aqui está todas informações do `WELCOME`.**\n\n<:code:570987560193753088> | Status**\n' + on + '\n\n**<:cliente:564141185887895574> | Mensagem definida**\n' + msg + '\n\n**<:global:570987560172519454> | Canal definido**\n<#' + canal + '>\n\n**<:EMOJI6:617554601637314561> | Cargo definido**\n<@&' + role +'>\n\n**<:duvida:576860848321200139> | Como usar `(EXEMPLO)`**\n```\n' + prefix + 'welcome setmsg {user} entrou do servidor {grupo}\n```\n\n**<:manutencao:564141187930259487> | Variaveis**\n`{grupo}` utilizado para mostrar o nome da Guild\n`{user}` utilizado para mencionar o membro que saiu.\n`{nick}` utilizado para mostrar o nickname e tagname do usuario.\n`{count}` utilizado para mostrar a quantidade de membros da guild.')
                .setFooter(`Lunnar © Todos Direitos Reservados`);

            message.channel.send(embed)

    }

}
module.exports.help = {
  name: 'welcome'
}