const Discord = require('discord.js');

module.exports.run = async ({client, message, args, user, server}) => {

    message.delete().catch(e => {})

    let emj = '<:EMOJI2:615343200151797782>';
    let emj2 = '<:EMOJI:615343178433822756>';

    if (!user.dono && !user.developer && !message.guild.me.hasPermission("BAN_MEMBERS")) { 
    return message.channel.send(emj + '** | Você não possui a permissão `BAN_MEMBERS` para executar este comando.**');
    }

    let muteRole = message.guild.roles.find("name", "mutado");
    
    let member = message.mentions.members.first();
    if(!member) {
        return message.channel.send(`**${emj} | Você não inseriu nenhum usuário para que eu possa desmuta-lo**`);
    
    } else{
    
     member.removeRole(muteRole);
     message.channel.send(`**${emj2} | O usuário ${member}, foi desmutado por ${message.author}.**`);
    
        }
    }

module.exports.help = {
    name: 'unmute'
}