const Discord = require('discord.js');

module.exports.run = async({client, message}) => {

    message.delete();

    let emj1 = '👑';
    let emj2 = '<:code:633777370410778644>';
    let emj3 = '🔨';
    let emj4 = '<:casa:633777369039241237>';
    let emj5 = '<:block:633777370980941837>';

    let form = 'https://google.com';

    const owners = '633782277679087642'
    const donu = client.guilds.filter(g => g.roles.has(owners)).map(g => g.name).join("\n")

    const develop = "633782279390625792"
    const develup = client.guilds.filter(g => g.roles.has(develop)).map(g => g.name).join("\n")

    const gerent = "633782278690045962"
    const gerenti = client.guilds.filter(g => g.roles.has(gerent)).map(g => g.name).join("\n")


    let embed = new Discord.RichEmbed()

    .setDescription(`**
    Para saber mais sobre a nossa equipe, reaja abaixo de acordo
    com o emoji do cargo.

    [${emj1}] 🢖 Donos(s)
    [${emj2}] 🢖 Desenvolvedor(es)
    [${emj3}] 🢖 Staff(s)

    [${emj4}] 🢖 Menu
    [${emj5}] 🢖 Fechar

    **Caso queira entrar para equipe, [clique aqui](${form}) e faça seu formulário.**
    **`)
    .setColor(`91FFFF`)
    .setFooter(`Lunnar © Todos Direitos Reservados`)

    message.channel.send(embed).then(async msg => {

        msg.react('👑');
        msg.react('633777370410778644');
        msg.react('🔨');
        msg.react('633777369039241237');
        msg.react('633777370980941837');

        const donos = (reaction, user) => reaction.emoji.name === '👑' && user.id === message.author.id;
        const geren = (reaction, user) => reaction.emoji.id === '633777370410778644' && user.id === message.author.id;
        const adminis = (reaction, user) => reaction.emoji.name === '🔨' && user.id === message.author.id;
        const moderai = (reaction, user) => reaction.emoji.id === '633777369039241237' && user.id === message.author.id;
        const buil = (reaction, user) => reaction.emoji.id === '633777370980941837' && user.id === message.author.id;

        const don = msg.createReactionCollector(donos);
        const ge = msg.createReactionCollector(geren);
        const admi = msg.createReactionCollector(adminis);
        const mo = msg.createReactionCollector(moderai);
        const bu = msg.createReactionCollector(buil);


        don.on('collect', async r => {

            r.remove(r.users.last().id).catch(e => {})
        
            embed.setDescription('**Aqui está, a nossa equipe de `DONOS`:**\n\n**`' + donu + '`**\n\n**Caso queira entrar para equipe, [clique aqui]('+ form +') e faça seu formulário.**')
            embed.setColor(`91FFFF`)
            embed.setFooter(`Lunnar © Todos Direitos Reservados`)

            msg.edit(embed)
        })

        ge.on('collect', async r => {

            r.remove(r.users.last().id).catch(e => {})
        
            embed.setDescription('**Aqui está, a nossa equipe de `DEVELOPERS`:**\n\n**`' + develup + '`**\n\n**Caso queira entrar para equipe, [clique aqui]('+ form +') e faça seu formulário.**')
            embed.setColor(`91FFFF`)
            embed.setFooter(`Lunnar © Todos Direitos Reservados`)

            msg.edit(embed)
        })

        admi.on('collect', async r => {

            r.remove(r.users.last().id).catch(e => {})
        
            embed.setDescription('**Aqui está, a nossa equipe de `STAFFS`:**\n\n**`' + gerenti + '`**\n\n**Caso queira entrar para equipe, [clique aqui]('+ form +') e faça seu formulário.**')
            embed.setColor(`91FFFF`)
            embed.setFooter(`Lunnar © Todos Direitos Reservados`)

            msg.edit(embed)
        })

        mo.on('collect', async r => {

            r.remove(r.users.last().id).catch(e => {})
        
            embed.setDescription(`**
            Para saber mais sobre a nossa equipe, reaja abaixo de acordo
            com o emoji do cargo.
        
            [${emj1}] 🢖 Donos(s)
            [${emj2}] 🢖 Desenvolvedor(es)
            [${emj3}] 🢖 Staff(s)
        
            [${emj4}] 🢖 Menu
            [${emj5}] 🢖 Fechar

            **Caso queira entrar para equipe, [clique aqui](${form}) e faça seu formulário.**
            **`)
            embed.setColor(`91FFFF`)
            embed.setFooter(`Lunnar © Todos Direitos Reservados`)


            msg.edit(embed);
        })

        bu.on('collect', async r => {

            msg.delete(embed);
        
        })

    })

}

module.exports.help = {
    name: 'equipe'
}