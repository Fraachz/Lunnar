const Discord = require('discord.js');

module.exports.run = async({client, message, server}) => {

    message.delete().catch(e => {})

    let emj = '<:ajuda:633777372587360285>';

    let rodape = 'Lunnar © Todos Direitos Reservados'
    let prefix = server.prefix;

    let staffcmd = '**↠ blacklist » Use '+ prefix +'blacklist <add : remove> <@user>**\n**↠ dono » Use '+ prefix +'dono <add : remove> <@user>**\n**↠ developer » Use '+ prefix +'developer <add : remove> <@user>**\n**↠ doador » Use '+ prefix +'doador <add : remove> <@user> <@Tempo>**\n**↠ emblema » Use '+ prefix +'emblema <add : remove : emblemas> <@user>**\n**↠ staff » Use '+ prefix +'staff <add : remove> <@user>**\n**↠ manu » Use '+ prefix +'manu <add : remove> <@Comando>**\n**↠ eval » Use '+ prefix +'eval <@code>**\n'; 
    let admincmd = '**↠ servidor » Use '+ prefix +'servidor <addsobre : dellsobre>**\n**↠ welcome » Use '+ prefix +'welcome <setcanal : setmsg : setrole : embed : info>**\n**↠ exit » Use '+ prefix +'exit <setcanal : setmsg : embed : info>**\n**↠ anti-invite » Use '+ prefix +'invite <setmsg : embed : info>**\n**↠ prefix » Use '+ prefix +'prefix <set : reset>**\n**↠ captcha » Use '+ prefix +'captcha <setcanal : setmsg : embed : info>**\n**↠ say » Use '+ prefix +'say <MSG>**\n**↠ anunciar » Use '+ prefix +'anunciar <MSG>**\n**↠ ban » Use '+ prefix +'ban <@user> <motivo>**\n**↠ tempban » Use '+ prefix +'tempban <@user> <motivo> <tempo>**\n**↠ tempmute » Use '+ prefix +'tempmute <@user> <motivo> <tempo>**\n**↠ mute » Use '+ prefix +'mute <@user> <motivo>**\n**↠ unban » Use '+ prefix +'unban <@user_id>**\n**↠ unmute » Use '+ prefix +'unmute <@user>**\n**↠ kick » Use '+ prefix +'kick <@user> <motivo>**\n**↠ warn » Use '+ prefix +'warn <@user> <motivo>**\n**↠ limpar » Use '+ prefix +'limpar <2 - 100>**\n';
    let economiacmd = '**↠ banco » Use '+ prefix +'banco <deposito : retirar : versaldo : transferir>**\n**↠ coins » Use '+ prefix +'coins**\n**↠ moneytop » Use '+ prefix +'moneytop**\n**↠ daily » Use '+ prefix +'daily**\n**↠ loja » Use '+ prefix +'loja <comprar : vender : remover : produtos>**\n**↠ empresa » Use '+ prefix +'empresa <criar : deletar : contratar : demitir : pagar : rendimento : promover : rebaixar : info>**\n**↠ trabalho » Use '+ prefix +'trabalho <proposta : sair : saldo : marcarponto>**\n';
    let divertcmd = '**↠ corrida » Use '+ prefix +'corrida <@User>**\n**↠ avatar » Use '+ prefix +'avatar <@user>**\n**↠ servericon » Use '+ prefix +'servericon**\n**↠ ascii » Use '+ prefix +'ascii**\n**↠ serverinfo » Use '+ prefix +'serverinfo**\n**↠ info » Use '+ prefix +'info**\n**↠ ship » Use '+ prefix +'ship <@user1> <@user2>**\n**↠ beijar » Use '+ prefix +'beijar <@user>**\n**↠ atirar » Use '+ prefix +'atirar <@user>**\n**↠ clima » Use '+ prefix +'clima <Cidade - Estado>**\n**↠ equipe » Use '+ prefix +'equipe**\n';
    let doadorcmd = '**↠  » Use '+ prefix +' <>**\n';
    let menucmd = '**Olá, tudo bem? Espero que sim! Aqui está todas minhas informações. Caso não saiba, fui criada pela minha equipe de Developers / Donos, em JavaScript.**\n\n**<:code:633777370410778644> | Comandos de staffs**\n\n**<:info:636732878746812416> | Administração**\n**<:money:633777369236111370> | Economia**\n**<a:minecraft:633777371379531786> | Diversão**\n**<a:staff:633777370360184863> | Doadores**\n**<:casa:633777369039241237> | Menu**\n\n**<:block:633777370980941837> | Fechar**\n\n**Para ver mais sobre algum comando, reaja abaixo.**';

    message.reply().then(async msg => {msg.delete(5000)})

    let embed = new Discord.RichEmbed()

    .setTitle(`**${emj} | AJUDA**`)
    .setDescription('**Olá, tudo bem? Espero que sim! Aqui está todas minhas informações. Caso não saiba, fui criada pela minha equipe de Developers / Donos, em JavaScript.**\n\n**<:code:633777370410778644> | Comandos de staffs**\n\n**<:info:636732878746812416> | Administração**\n**<:money:633777369236111370> | Economia**\n**<a:minecraft:633777371379531786> | Diversão**\n**<a:staff:633777370360184863> | Doadores**\n**<:casa:633777369039241237> | Menu**\n\n**<:block:633777370980941837> | Fechar**\n\n**Para ver mais sobre algum comando, reaja abaixo.**')
    .setThumbnail(client.user.avatarURL)
    .setColor(`#00B6FF`)
    .setFooter(rodape)

    message.channel.send(embed).then(async msg => {

        let emojiArray = [ '633777370410778644', '636732878746812416', '633777369236111370', '633777371379531786', '633777370360184863', '633777369039241237', '633777370980941837'];
        for (let emoji of emojiArray) { await msg.react(emoji) }

        const staffs = (reaction, user) => reaction.emoji.id === '633777370410778644' && user.id === message.author.id
        const admin = (reaction, user) => reaction.emoji.id === '636732878746812416' && user.id === message.author.id
        const economia = (reaction, user) => reaction.emoji.id === '633777369236111370' && user.id === message.author.id
        const diversao = (reaction, user) => reaction.emoji.id === '633777371379531786' && user.id === message.author.id
        const doador = (reaction, user) => reaction.emoji.id === '633777370360184863' && user.id === message.author.id
        const menu = (reaction, user) => reaction.emoji.id === '633777369039241237' && user.id === message.author.id
        const fechar = (reaction, user) => reaction.emoji.id === '633777370980941837' && user.id === message.author.id

        const s = msg.createReactionCollector(staffs, {time: 60000});
        const a = msg.createReactionCollector(admin, {time: 60000});
        const eq = msg.createReactionCollector(economia, {time: 60000});
        const di = msg.createReactionCollector(diversao, {time: 60000});
        const doa = msg.createReactionCollector(doador, {time: 60000});
        const m = msg.createReactionCollector(menu, {time: 60000});
        const f = msg.createReactionCollector(fechar, {time: 60000});

        s.on('collect', async r => {

            r.remove(r.users.last().id).catch(e => {})
            
                embed.setTitle(`**${emj} | AJUDA**`)
                embed.setDescription('**Olá, tudo bem? Espero que sim! Aqui está todos meus comandos da categoria `STAFFS` (Meu Prefix: '+ prefix +').**\n\n' + staffcmd)
                embed.setThumbnail(client.user.avatarURL)
                embed.setColor(`#00B6FF`)
                embed.setFooter(rodape)
            
                msg.edit(embed)
            })

        a.on('collect', async r => {
            
            r.remove(r.users.last().id).catch(e => {})

            embed.setTitle(`**${emj} | AJUDA**`)
            embed.setDescription('**Olá, tudo bem? Espero que sim! Aqui está todos meus comandos da categoria `ADMINISTRAÇÃO` (Meu Prefix: '+ prefix +').**\n\n' + admincmd)
            embed.setThumbnail(client.user.avatarURL)
            embed.setColor(`#00B6FF`)
            embed.setFooter(rodape)
        
            msg.edit(embed)

        })

        eq.on('collect', async r => {

            r.remove(r.users.last().id).catch(e => {})
            
            embed.setTitle(`**${emj} | AJUDA**`)
            embed.setDescription('**Olá, tudo bem? Espero que sim! Aqui está todos meus comandos da categoria `ECONOMIA` (Meu Prefix: '+ prefix +').**\n\n' + economiacmd)
            embed.setThumbnail(client.user.avatarURL)
            embed.setColor(`#00B6FF`)
            embed.setFooter(rodape)
        
            msg.edit(embed)

        })

        di.on('collect', async r => {

            r.remove(r.users.last().id).catch(e => {})
            
            embed.setTitle(`**${emj} | AJUDA**`)
            embed.setDescription('**Olá, tudo bem? Espero que sim! Aqui está todos meus comandos da categoria `DIVERSÃO` (Meu Prefix: '+ prefix +').**\n\n' + divertcmd)
            embed.setThumbnail(client.user.avatarURL)
            embed.setColor(`#00B6FF`)
            embed.setFooter(rodape)
        
            msg.edit(embed)

        })

        doa.on('collect', async r => {

            r.remove(r.users.last().id).catch(e => {})
            
            embed.setTitle(`**${emj} | AJUDA**`)
            embed.setDescription('**Olá, tudo bem? Espero que sim! Aqui está todos meus comandos da categoria `DOADORES` (Meu Prefix: '+ prefix +').**\n\n' + doadorcmd)
            embed.setThumbnail(client.user.avatarURL)
            embed.setColor(`#00B6FF`)
            embed.setFooter(rodape)
        
            msg.edit(embed)

        })


        m.on('collect', async r => {

            r.remove(r.users.last().id).catch(e => {})
            
            embed.setTitle(`**${emj} | AJUDA**`)
            embed.setDescription(menucmd)
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