const Discord = require('discord.js');
const moment = require('moment');
require('moment-duration-format')

module.exports.run = async ({client, message, user, server}) => {

    message.delete().catch(e => {})

    let rodape = 'Lunnar © Todos Direitos Reservados';
    let cmd = client.commands.size;

    let duration = moment.duration(client.uptime).format('D [d], H [h], m [m], s [s]');

    let embed = new Discord.RichEmbed()

    .setDescription("**" + client.user.tag + " \n\nOlá " + message.author + ", tudo bom? Espero que sim, espero que esteja tendo um ótimo dia! Aqui está todas as minhas informações, caso não saiba, fui feito pelo `EduardoDev#0001`. No momento, estou com ajudadando `" + client.guilds.size + " servidores` totalizando assim, `" + client.users.size + " usuários`, e também estou com `" + cmd + " comandos` disponíveis.\n\n [Meu Convite](https://discordapp.com/oauth2/authorize=&client_id=610135482600259594&scope=bot&permissions=8)\n[Meu Twitter](https://twitter.com/fraachz_sz)\n[Meu GitHub](https://github.com/Fraachz/Lunnar)\n [Meu Grupo](https://discord.gg/CMzS4aE)\n\nPara finalizar, vou falar sobre min!**\n\n**Eu estou acordada há:** `" + duration + "`\n\n**Eu sou feita em:** `JavaScript (Node.js)`\n**Eu fui criada há:** `" + Math.round(Math.abs((client.user.createdAt.getTime() - new Date().getTime())/(24*60*60*1000))) + " dias`")

    .setThumbnail(client.user.displayAvatarURL)
    .setFooter(client.user.displayAvatarURL && rodape);

    message.channel.send(embed)

}

module.exports.help = {
    name: 'info'
}