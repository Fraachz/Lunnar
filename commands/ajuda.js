const Discord = require('discord.js');

module.exports.run = async({client, message, server}) => {

    message.delete().catch(e => {})

    let emj = '<:ajuda:577816377147260932>';
    let emj2 = '<:code:570987560193753088>';
    let emj3 = '<:suporte:564141197388546068>';
    let emj4 = '<:info:577816535343562752>';
    let emj5 = '<:settings:602555904474218497>';
    let emj6 = '<:EMOJI12:619619672920162304>';
    let emj7 = '<a:MinecraftGif:562396962523971595>';
    let emj8 = '<:microfone:565266407978434560>';
    let emj9 = '<:EMOJI13:619620385725480960>';
    let emj10 = '<:cancelar:562000200650981379>';
    let emj11 = '<:EMOJI14:619620996554686475>';

    let rodape = 'Lunnar © Todos Direitos Reservados'
    let prefix = server.prefix;

    message.channel.send(message.author)

    let embed = new Discord.RichEmbed()

    .setTitle(`**${emj} | AJUDA**`)
    .setDescription('**Olá, tudo bem? Espero que sim! Aqui está todas minhas informações. Caso não saiba, fui criada pelo EduardoDev#0001, em JavaScript.**\n\n**<:code:570987560193753088> | Comandos de staffs**\n\n**<:info:577816535343562752> | Administração**\n**<:EMOJI12:619619672920162304> | Economia**\n**<a:MinecraftGif:562396962523971595> | Diversão**\n**<:EMOJI16:619883429533712395> | Menu**\n\n**<:cancelar:562000200650981379> | Fechar**\n\n**Para ver mais sobre algum comando, reaja abaixo.**')
    .setThumbnail(client.user.avatarURL)
    .setColor(`#00B6FF`)
    .setFooter(rodape)

    message.channel.send(embed).then(async msg => {

        msg.react('570987560193753088');
        msg.react('577816535343562752');
        msg.react('619619672920162304');
        msg.react('562396962523971595');
        msg.react('619883429533712395');
        msg.react('562000200650981379');

        const staffs = (reaction, user) => reaction.emoji.id === '570987560193753088' && user.id === message.author.id
        const admin = (reaction, user) => reaction.emoji.id === '577816535343562752' && user.id === message.author.id
        const economia = (reaction, user) => reaction.emoji.id === '619619672920162304' && user.id === message.author.id
        const diversao = (reaction, user) => reaction.emoji.id === '562396962523971595' && user.id === message.author.id
        const menu = (reaction, user) => reaction.emoji.id === '619883429533712395' && user.id === message.author.id
        const fechar = (reaction, user) => reaction.emoji.id === '562000200650981379' && user.id === message.author.id

        const s = msg.createReactionCollector(staffs, {time: 60000});
        const a = msg.createReactionCollector(admin, {time: 60000});
        const eq = msg.createReactionCollector(economia, {time: 60000});
        const di = msg.createReactionCollector(diversao, {time: 60000});
        const m = msg.createReactionCollector(menu, {time: 60000});
        const f = msg.createReactionCollector(fechar, {time: 60000});

        s.on('collect', async r => {

            r.remove(r.users.last().id).catch(e => {})
            
                embed.setTitle(`**${emj} | AJUDA**`)
                embed.setDescription('**Olá, tudo bem? Espero que sim! Aqui está todos meus comandos da categoria `STAFFS` (Meu Prefix: '+ prefix +').**\n\n**↠ servidor » Use '+ prefix +'servidor <addsobre : dellsobre>**\n**↠ blacklist » Use '+ prefix +'blacklist <add : remove> <@user>**\n**↠ dono » Use '+ prefix +'dono <add : remove> <@user>**\n**↠ developer » Use '+ prefix +'developer <add : remove> <@user> <@tempo>**\n**↠ doador » Use '+ prefix +'doador <add : remove> <@user> <@Tempo>**\n**↠ emblemas » Use '+ prefix +'emblemas <add : remove : emblemas> <@user>**\n**↠ staff » Use '+ prefix +'staff <add : remove> <@user>**\n**↠ manu » Use '+ prefix +'manu <add : remove> <@Comando>**\n**eval » Use '+ prefix +'eval <@code>**\n**kick » Use '+ prefix +'kick <@user> <motivo>**\n')
                embed.setThumbnail(client.user.avatarURL)
                embed.setColor(`#00B6FF`)
                embed.setFooter(rodape)
            
                msg.edit(embed)
            })

        a.on('collect', async r => {
            
            r.remove(r.users.last().id).catch(e => {})

            embed.setTitle(`**${emj} | AJUDA**`)
            embed.setDescription('**Olá, tudo bem? Espero que sim! Aqui está todos meus comandos da categoria `ADMINISTRAÇÃO` (Meu Prefix: '+ prefix +').**\n\n**↠ welcome » Use '+ prefix +'welcome <setcanal : setmsg : setrole : embed : info>**\n**↠ exit » Use '+ prefix +'exit <setcanal : setmsg : embed : info>**\n**↠ anti-invite » Use '+ prefix +'invite <setmsg : embed : info>**\n**↠ prefix » Use '+ prefix +'prefix <set : reset>**\n**↠ captcha » Use '+ prefix +'captcha <setcanal : setmsg : embed : info>**\n**↠ say » Use '+ prefix +'say <MSG>**\n**↠ anunciar » Use '+ prefix +'anunciar <MSG>**\n**↠ logs » Use '+ prefix +'logs <setcanal : log : info>**\n**↠ ban » Use '+ prefix +'ban <@user> <motivo>**\n**↠ tempban » Use '+ prefix +'tempban <@user> <motivo> <tempo>**\n**↠ tempmute » Use '+ prefix +'tempmute <@user> <motivo> <tempo>**\n**↠ mute » Use '+ prefix +'mute <@user> <motivo>**\n**↠ unban » Use '+ prefix +'unban <@user_id>**\n**↠ unmute » Use '+ prefix +'unmute <@user>**\n**↠ warn » Use '+ prefix +'warn <@user> <motivo>**\n**↠ limpar » Use '+ prefix +'limpar <2 - 100>**\n')
            embed.setThumbnail(client.user.avatarURL)
            embed.setColor(`#00B6FF`)
            embed.setFooter(rodape)
        
            msg.edit(embed)

        })

        eq.on('collect', async r => {

            r.remove(r.users.last().id).catch(e => {})
            
            embed.setTitle(`**${emj} | AJUDA**`)
            embed.setDescription('**Olá, tudo bem? Espero que sim! Aqui está todos meus comandos da categoria `ECONOMIA` (Meu Prefix: '+ prefix +').**\n\n**↠ banco » Use '+ prefix +'banco <deposito : retirar : versaldo : transferir>**\n**↠ coins » Use '+ prefix +'coins**\n**↠ moneytop » Use '+ prefix +'moneytop**\n**↠ daily » Use '+ prefix +'daily**\n**↠ loja » Use '+ prefix +'loja <comprar : vender : remover : produtos>**\n')
            embed.setThumbnail(client.user.avatarURL)
            embed.setColor(`#00B6FF`)
            embed.setFooter(rodape)
        
            msg.edit(embed)

        })

        di.on('collect', async r => {

            r.remove(r.users.last().id).catch(e => {})
            
            embed.setTitle(`**${emj} | AJUDA**`)
            embed.setDescription('**Olá, tudo bem? Espero que sim! Aqui está todos meus comandos da categoria `DIVERSÃO` (Meu Prefix: '+ prefix +').**\n\n**↠ corrida » Use '+ prefix +'corrida <@User>**\n**↠ empresa » Use '+ prefix +'empresa <criar : deletar : contratar : demitir : pagar : rendimento : promover : rebaixar : info>**\n**↠ trabalho » Use '+ prefix +'trabalho <proposta : sair : saldo : marcarponto : info>**\n**↠ info » Use '+ prefix +'info**\n**↠ avatar » Use '+ prefix +'avatar <@user>**\n**↠ ascii » Use '+ prefix +'ascii**\n**↠ serverinfo » Use '+ prefix +'serverinfo**\n**↠ info » Use '+ prefix +'info**\n**↠ ship » Use '+ prefix +'ship <@user1> <@user2>**\n**↠ beijar » Use '+ prefix +'beijar <@user>**\n**↠ atirar » Use '+ prefix +'atirar <@user>**\n**↠ clima » Use '+ prefix +'clima <Cidade - Estado>**\n')
            embed.setThumbnail(client.user.avatarURL)
            embed.setColor(`#00B6FF`)
            embed.setFooter(rodape)
        
            msg.edit(embed)

        })

        m.on('collect', async r => {

            r.remove(r.users.last().id).catch(e => {})
            
            embed.setTitle(`**${emj} | AJUDA**`)
            embed.setDescription('**Olá, tudo bem? Espero que sim! Aqui está todas minhas informações. Caso não saiba, fui criada pelo EduardoDev#0001, em JavaScript.**\n\n**<:code:570987560193753088> | Comandos de staffs**\n\n**<:info:577816535343562752> | Administração**\n**<:EMOJI12:619619672920162304> | Economia**\n**<a:MinecraftGif:562396962523971595> | Diversão**\n**<:EMOJI16:619883429533712395> | Menu**\n\n**<:cancelar:562000200650981379> | Fechar**\n\n**Para ver mais sobre algum comando, reaja abaixo.**')
            embed.setThumbnail(client.user.avatarURL)
            embed.setColor(`#00B6FF`)
            embed.setFooter(rodape)
        
            msg.edit(embed)

        })

        f.on('collect', async r => {
            
        msg.delete(embed).catch(e => {})

        })

    })

}

module.exports.help = {
    name: 'ajuda'
}