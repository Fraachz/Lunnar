const Discord = require('discord.js');

module.exports.run = async({message, user, docDB}) => {

    message.delete().catch(e => {})

    let emj = '<:EMOJI19:620038269958094868>';
    let emj2 = '<:EMOJI8:617554601511485449>';
    let emj3 = '<:EMOJI20:620044911546335234>';
    let emj4 = '<:EMOJI21:620044912393453599>';
    let emj5 = '<:EMOJI22:620044911823159330>';
    let emj6 = '<:EMOJI27:620073292681838592>';
    let emj7 = '<a:EMOJI25:620073327154692126>';

    let rodape = 'Lunnar © Todos Direitos Reservados';

    let membro = message.mentions.users.first() ? message.mentions.users.first() : message.author;
    let membroDB = await docDB({type: 1, content: membro});

    const embleminhas = membroDB.emblemas.map(emblema => emblema.emoji).join(' ') || '**<:EMOJI2:615343200151797782> | O usuário não possui emblemas.**'

    let jogo = membro.presence.game ? membro.presence.game.name : 'Nada no momento';

    let embed = new Discord.RichEmbed()

    .setTitle(`**${emj} | Perfil de ${membro.tag}**`)
    .addField(`**${emj5} | Seu nome:**`, membro)
    .addField(`**${emj4} | Sua Tag:**`, `#${membro.discriminator}`)
    .addField(`**${emj6} | Seu ID:**`, membro.id)
    .addField(`**${emj7} | Jogando:**`, jogo)
    .addField(`**${emj3} | Conta criada há:**`, `${Math.round(Math.abs((membro.createdAt.getTime() - new Date().getTime())/(24*60*60*1000)))} dias`)
    .addField(`**${emj2} | Emblema Especial:**`, `${embleminhas}`)
    .setThumbnail(membro.displayAvatarURL)
    .setTimestamp(new(Date))
    .setFooter(rodape)

    message.channel.send(embed)
}

module.exports.help = {
    name: 'perfil'
}