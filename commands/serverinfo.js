const Discord = require('discord.js');
const moment = require("moment")
moment.locale("pt-BR")

module.exports.run = async({client, message, args, user, server}) => {

    let emj = '<:EMOJI13:619620385725480960>';
    let emj1 = '<:EMOJI8:617554601511485449>';
    let emj2 = '<:EMOJI20:620044911546335234>';
    let emj3 = '<:EMOJI27:620073292681838592>';
    let emj4 = '<:EMOJI31:620814008131387392>';
    let emj5 = '<:EMOJI32:620814826687561768>';
    let emj6 = '<:EMOJI29:620813196575375360>';
    let emj7 = '<:EMOJI30:620813196395282452>';
    let emj8 = '<:EMOJI33:620815642588610567>';
    let emj9 = '<:EMOJI34:620815642852982806>';
    let emj10 = '<:EMOJI19:620038269958094868>';

    const sobre = server.sobre;

    let canaistexto = message.guild.channels.filter(a => a.type === "text").size;
    let canaisvoz = message.guild.channels.filter(a => a.type === "voice").size;

    message.delete().catch(e => {})

    const embed = new Discord.RichEmbed()

        .setDescription(`**${emj1} | Informações do servidor:** ${message.guild.name}
        
        **${emj} | Dono do Servidor:** <@${message.guild.owner.id}>
        **${emj2} | Servidor criado em:** ${moment(message.guild.createdAt).format('LLLL')}
        **${emj3} | ID do Servidor:** ${message.guild.id}
        
        **${emj4} | Quantidade de Membros:** ${message.guild.memberCount}

        **${emj5} | Quantidade de Canais:** ${canaistexto + canaisvoz}
        **${emj6} | Canais de Texto:** ${message.guild.channels.filter(a => a.type === "text").size}
        **${emj7} | Canais de Voz** ${message.guild.channels.filter(a => a.type === "voice").size}
        
        **${emj8} | Quantidade de Cargos:** ${message.guild.roles.size}
        **${emj10} | Sobre do Servidor:** ${sobre}`)
        .setThumbnail(message.guild.iconURL)
        .setColor("#FF0000")
        .setFooter(`Lunnar © Todos Direitos Reservados`)

    message.channel.send(embed);

    //**${emj9} | Cargos:** ${message.guild.roles.map(a => a).join(",  ") && message.guild.roles.filter((role) => role.name !== '@everyone').map((role) => role.toString())}

}

module.exports.help = {
    name: 'serverinfo'
}