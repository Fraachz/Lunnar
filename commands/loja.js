const Discord = require('discord.js');
const database = require('../mongodb.js');

module.exports.run = async({client, message, user, server}) => {

    message.delete().catch(e => {})

    let prefix = server.prefix;

    let emj1 = '<:cesta:633777368741445633>';
    let emj2 = '<a:erradoanimado:633777373179019284>';
    let emj3 = '<:money:633777369236111370>';
    let emj4 = '<:paleta:641799511257382914>';
    let emj5 = '<:permissoes:641801273892405268>';
    let emj6 = '<a:caixas:641453141094563861>';

    // < - Voltar / Fechar - >

    let back = '<:backspace:641788621786972161>';
    let close =  '<:block:633777370980941837>';

    // < - Cores - >

    let red = '<:Vermelho:641804405934522368>';
    let green = '<:Verde:641803892404912129>';
    let black = '<:Preto:641803892274888721>';
    let white = '<:Branco:641803894703259648>';
    let purple = '<:Roxo:641803892639924224>';
    let blue = '<:Azul:641803892484603927>';

    // < - Permissões - >

    let doublecoins = '';
    let vip_fraachz = '';
    let vip_deus = '';
    let vip_lord = '';
    let cmd_exclusivos = '';

    // <- Caixas - >

    let caixa_fraachz = '';
    let caixa_hard = '';
    let caixa_rara = '';
    let caixa_random = '';

    /*
    ============================================================================================================
    */

    let embed = new Discord.RichEmbed()

    .setTitle(`**${emj1} | Lojinha du Zé**`)
    .setDescription(`
**Opa! Tudo bom? Para estar adquirindo um item 
em nossa loja, venha cumigo qui eu ti mostru homi!

${emj4} | ColorTags
${emj6} | Caixas
${emj5} | Permissões

${close} | Fechar

Ora homi, caso não saiba como usar, vai reagindo
ai em baixo que da tudo certo bixo!**`)
    .setFooter(`Lunnar © Todos Direitos Reservados`);

    message.channel.send(embed).then(async msg => {

        let emojiArray = [ '641799511257382914', '641453141094563861', '641801273892405268', '633777370980941837']
        for (let emoji of emojiArray) { await msg.react(emoji) }

        const colors = (reaction, user) => reaction.emoji.id === '641799511257382914' && user.id === message.author.id;
        const permissions = (reaction, user) => reaction.emoji.id === '641801273892405268' && user.id === message.author.id;
        const chests = (reaction, user) => reaction.emoji.id === '641453141094563861' && user.id === message.author.id;
        const closee = (reaction, user) => reaction.emoji.id === '633777370980941837' && user.id === message.author.id;
        
        const co = msg.createReactionCollector(colors, {time: 60000});
        const pe = msg.createReactionCollector(permissions, {time: 60000});
        const ch = msg.createReactionCollector(chests, {time: 60000});
        const cl = msg.createReactionCollector(closee, {time: 60000});

        co.on('collect', async r => {

            r.remove(r.users.last().id).catch(e => {});

            msg.delete();

            let embed2 = new Discord.RichEmbed()

            .setTitle(`**${emj1} | Lojinha du Zé**`)
            .setDescription(`**
Oxente homi, quer comprar uma corzinha?
Só escolher abaixo qual tu quer bixin.

Antes que tu escoia a sua corzinha, 
cada uma custa R$ 20.000! (Vinte Mil).

${red} | Vermelho
${green} | Verde
${black} | Preto
${white} | Branco
${purple} | Roxo
${blue} | Azul

${back} | Voltar
${close} | Fechar

Em brevi, vai ter mais genti boa!
Reagi ai e pegue sua corzinha homi.**`)
            .setFooter(`Lunnar © Todos Direitos Reservados`);

            msg.channel.send(embed2).then(async msg => {

                let emojiArray2 = [ '641804405934522368', '641803892404912129', '641803892274888721', '641803894703259648', '641803892639924224', '641803892484603927', '641788621786972161', '633777370980941837']
                for (let emoji2 of emojiArray2) { await msg.react(emoji2) }

                const vermelho = (reaction, user) => reaction.emoji.id === '641804405934522368' && user.id === message.author.id;
                const verde = (reaction, user) => reaction.emoji.id === '641803892404912129' && user.id === message.author.id;
                const preto = (reaction, user) => reaction.emoji.id === '641803892274888721' && user.id === message.author.id;
                const branco = (reaction, user) => reaction.emoji.id === '641803894703259648' && user.id === message.author.id;
                const roxo = (reaction, user) => reaction.emoji.id === '641803892639924224' && user.id === message.author.id;
                const azul = (reaction, user) => reaction.emoji.id === '641803892484603927' && user.id === message.author.id;
                const voltar = (reaction, user) => reaction.emoji.id === '641788621786972161' && user.id === message.author.id;
                const fechar = (reaction, user) => reaction.emoji.id === '633777370980941837' && user.id === message.author.id;

                const verm = msg.createReactionCollector(vermelho, {time: 60000});
                const verd = msg.createReactionCollector(verde, {time: 60000});
                const pret = msg.createReactionCollector(preto, {time: 60000});
                const bran = msg.createReactionCollector(branco, {time: 60000});
                const rox = msg.createReactionCollector(roxo, {time: 60000});
                const azu = msg.createReactionCollector(azul, {time: 60000});
                const volt = msg.createReactionCollector(voltar, {time: 60000});
                const fech = msg.createReactionCollector(fechar, {time: 60000});

                verm.on('collect', async r => {

                    r.remove(r.users.last().id).catch(e => {});

                    msg.delete(embed2);

                    if (user.vermelho == true) {
                        return message.channel.send(`**${emj2} | O fio, você já teim essa cor! Compri outra cor minino.**`)
                    }

                    let price = 20000
                    if(user.coins < price) {
                    return message.channel.send(`**${emj2} | Você não possui dinheiro suficiente para comprar este item. (Faltam ${Number(price - user.coins).toLocaleString()} coins)**`)
                    }

                    msg.channel.send(`**${emj3} | Você acaba di cumpra a cor redi**`);
                    
                   // Salvando Color e Coins

                   user.vermelho = true
                   user.coins -= price;
                   user.save();

                    // Dando o Cargo

                    if (client.guilds.get("633489586668175391").member(message.author.id)) {
                        message.guild.members.get(message.author.id).addRole("642063533995196434");
                    }
                })

                verd.on('collect', async r => {

                    r.remove(r.users.last().id).catch(e => {});

                    msg.delete(embed2);

                    if (user.verde == true) {
                        return message.channel.send(`**${emj2} | O fio, você já teim essa cor! Compri outra cor minino.**`)
                    }

                    let price = 20000
                    if(user.coins < price) {
                    return message.channel.send(`**${emj2} | Você não possui dinheiro suficiente para comprar este item. (Faltam ${Number(price - user.coins).toLocaleString()} coins)**`)
                    }

                    msg.channel.send(`**${emj3} | Você acaba di cumpra a cor grin**`);
                    
                    // Salvando Color e Coins

                   user.verde = true
                   user.coins -= price;
                   user.save();

                    // Dando o Cargo

                    if (client.guilds.get("633489586668175391").member(message.author.id)) {
                        message.guild.members.get(message.author.id).addRole("642063537459560448");
                    }                
                })
                
                pret.on('collect', async r => {

                    r.remove(r.users.last().id).catch(e => {});

                    msg.delete(embed2);

                    if (user.preto == true) {
                        return message.channel.send(`**${emj2} | O fio, você já teim essa cor! Compri outra cor minino.**`)
                    }

                    let price = 20000
                    if(user.coins < price) {
                    return message.channel.send(`**${emj2} | Você não possui dinheiro suficiente para comprar este item. (Faltam ${Number(price - user.coins).toLocaleString()} coins)**`)
                    }

                    msg.channel.send(`**${emj3} | Você acaba di cumpra a cor braqui**`);

                    // Salvando Color e Coins

                    user.preto = true
                    user.coins -= price;
                    user.save();

                    // Dando o Cargo

                    if (client.guilds.get("633489586668175391").member(message.author.id)) {
                        message.guild.members.get(message.author.id).addRole("642063539640729600");
                    } 
                })

                bran.on('collect', async r => {

                    r.remove(r.users.last().id).catch(e => {});

                    msg.delete(embed2);

                    if (user.branco == true) {
                        return message.channel.send(`**${emj2} | O fio, você já teim essa cor! Compri outra cor minino.**`)
                    }

                    let price = 20000
                    if(user.coins < price) {
                    return message.channel.send(`**${emj2} | Você não possui dinheiro suficiente para comprar este item. (Faltam ${Number(price - user.coins).toLocaleString()} coins)**`)
                    }

                    msg.channel.send(`**${emj3} | Você acaba di cumpra a cor uaiti**`);

                    // Salvando Color e Coins

                    user.branco = true
                    user.coins -= price;
                    user.save();

                    // Dando o Cargo

                    if (client.guilds.get("633489586668175391").member(message.author.id)) {
                        message.guild.members.get(message.author.id).addRole("642063542559965212");
                    } 
                })

                rox.on('collect', async r => {

                    r.remove(r.users.last().id).catch(e => {});

                    msg.delete(embed2);

                    if (user.roxo == true) {
                        return message.channel.send(`**${emj2} | O fio, você já teim essa cor! Compri outra cor minino.**`)
                    }

                    let price = 20000
                    if(user.coins < price) {
                    return message.channel.send(`**${emj2} | Você não possui dinheiro suficiente para comprar este item. (Faltam ${Number(price - user.coins).toLocaleString()} coins)**`)
                    }
                    
                    msg.channel.send(`**${emj3} | Você acaba di cumpra a cor purpre**`);

                    // Salvando Color e Coins

                    user.roxo = true
                    user.coins -= price;
                    user.save();

                    // Dando o Cargo

                    if (client.guilds.get("633489586668175391").member(message.author.id)) {
                        message.guild.members.get(message.author.id).addRole("642063554513469473");
                    } 
                })

                azu.on('collect', async r => {

                    r.remove(r.users.last().id).catch(e => {});

                    msg.delete(embed2);

                    if (user.azul == true) {
                        return message.channel.send(`**${emj2} | O fio, você já teim essa cor! Compri outra cor minino.**`)
                    }

                    let price = 20000
                    if(user.coins < price) {
                    return message.channel.send(`**${emj2} | Você não possui dinheiro suficiente para comprar este item. (Faltam ${Number(price - user.coins).toLocaleString()} coins)**`)
                    }

                    msg.channel.send(`**${emj3} | Você acaba di cumpra a cor brui**`);

                    // Salvando Color e Coins

                    user.roxo = true
                    user.coins -= price;
                    user.save();

                    // Dando o Cargo

                    if (client.guilds.get("633489586668175391").member(message.author.id)) {
                        message.guild.members.get(message.author.id).addRole("642063551766200320");
                    } 
                })

                volt.on('collect', async r => {

                    msg.delete(embed2);
                    msg.channel.send(embed)
                })

                fech.on('collect', async r => {

                    msg.delete(embed2);

                })

            })

        })

        pe.on('collect', async r => {

            r.remove(r.users.last().id).catch(e => {});

            msg.delete(embed);
            msg.channel.send(`Em breve`);

        })

        ch.on('collect', async r => {

            r.remove(r.users.last().id).catch(e => {});

            msg.delete(embed);
            msg.channel.send(`Em breve`);

        })

        cl.on('collect', async r => {

            msg.delete(embed);

        })

    })

}

module.exports.help = {
    name: 'loja'
}