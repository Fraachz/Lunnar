const Discord = require('discord.js');

module.exports.run = async({message, user, server}) => {

    let emj = '<:EMOJI2:615343200151797782>';
    let emj2 = '<a:EMOJI35:621494395107147796>';
    let emj3 = '<:EMOJI36:621515166093410316>';
    let emj4 = '<:EMOJI37:621515166189748234>';
    let emj5 = '<:EMOJI7:617554601595371531>';
    let emj6 = '<:EMOJI38:621517012031635476>';
    let emj7 = '<:EMOJI39:621517403788017665>';
    let emj8 = '<a:EMOJI40:621517718444572681>';

    welcome = server.welcomeOn;
    exit = server.exitOn;
    invite = server.inviteOn;
    logs = server.levelsOn;
    flood = server.floodOn;
    captcha = server.captchaOn;

    prefix = server.prefix;

    if (!user.dono && !user.developer && !message.member.hasPermission('MANAGE_GUILD')) {
        return message.channel.send(emj + ' **| Você não possui a permissão `MANAGE_GUILD`.**');
    }

    let embed = new Discord.RichEmbed()

    .setDescription(`**${emj2} | Minha Configuração:**
    
    **Caso esteja com alguma dúvida de como ativar os itens abaixo,**
    **vá até o chats de comandos desta guild, e execute: '${prefix}ajuda'.**

    **${emj3} | Welcome**
    ${welcome}
    
    **${emj4} | Exit**
    ${exit}
    
    **${emj5} | Anti - Invite
    ${invite}**
    
    **${emj6} | Levels**
    ${logs}
    
    **${emj7} | Anti - Flood**
    ${flood}
    
    **${emj8} | Captcha**
    ${captcha}
    
    **Em breve, será adicionado mais comandos para ajudarem em seu servidor,**
    **fique atento nas atualizações do bot, meu grupo:** 
    
    **[Clique Aqui](https://discord.gg/CMzS4aE)**`)
    .setFooter(`Lunnar © Todos Direitos Reservados`)

    message.channel.send(embed);

}

module.exports.help = {
    name: 'config'
}