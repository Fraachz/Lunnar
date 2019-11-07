const Discord = require('discord.js');

module.exports.run = async({message}) => {

    message.delete().catch(e => {})

    let membro = message.mentions.users.first() || message.author;

    let embed = new Discord.RichEmbed()

    .setDescription(`**Download: [[Clique Aqui]](${message.guild.iconURL}).**`)
    .setImage(message.guild.iconURL)
    .setFooter(`Lunnar © Todos Direitos Reservados`)

    message.channel.send(embed)

}

module.exports.help = {
    name: 'servericon'
}