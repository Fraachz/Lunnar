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
        message.channel.send(`**${emj} | Comando errado, use: "${prefix}invite <setmsg : desligar : info>".**`);
        return;
    }

    if (args[0] === 'setmsg') {

            let msg = args.slice(1).join(' ');
            if (!msg) {
                return message.channel.send(emj + '** | Você não inseriu nenhuma mensagem para que eu possa setar-la como `WELCOME MESSAGE`**');
            }
    
            server.invite = true;
            
            server.inviteOn = '**<:aon:572142761336111108> **(**`Ativado`**)**';
            server.inviteMsg = msg;
    
            server.save();
    
            message.channel.send(emj2 + '** | A mensagem do anti-invite foi setada, agora a mensagem setada será enviada quando um membro tentar enviar um invite.**');
    }


    if (args[0] === 'desligar') {

        server.invite = false;
        
        server.inviteOn = '**<:off:572142645212872735> **(**`Desativado`**)**';
        server.inviteMsg = `**${emj} | A mensagem do anti-invite ainda não foi setada.**`;

        server.save();

            return message.channel.send(emj2 + '** | O evento `Anti-Invite` foi desligado, sendo assim deletei todos os dados (Mensagens setadas).**');

    }

    if (args[0] === 'info') {

        let msg = server.inviteMsg;
        let on = server.inviteOn;
        let role = server.inviteEmbed;

        let embed = new Discord.RichEmbed()

            .setTitle('**<:EMOJI8:617554601511485449> | Informações do `Anti-Invite`**')
            .setDescription('**<:suporte:564141197388546068> | Aqui está todas informações do `Anti-Invite`.**\n\n<:code:570987560193753088> | Status**\n' + on + '\n\n**<:cliente:564141185887895574> | Mensagem definida**\n' + msg + '\n\n**<:duvida:576860848321200139> | Como usar `(EXEMPLO)`**\n```\n' + prefix + 'invite setmsg Opa {user}! Não envie invites aqui, pare antes que você seja banido!\n```\n\n**<:manutencao:564141187930259487> | Variaveis**\n`{grupo}` utilizado para mostrar o nome da Guild\n`{user}` utilizado para mencionar o membro.\n`{nick}` utilizado para mostrar o nickname e tagname do usuario.')
            .setFooter(`Lunnar © Todos Direitos Reservados`);

        message.channel.send(embed)

    }
}

module.exports.help = {
    name: 'invite'
}