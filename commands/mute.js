const Discord = require('discord.js');

module.exports.run = async ({client, message, args, user}) => {

    message.delete().catch(e => {})

    let emj = '<:EMOJI2:615343200151797782>';
    let emj2 = '<:EMOJI:615343178433822756>';

    if (!user.dono && !user.developer && !message.guild.me.hasPermission("BAN_MEMBERS")) { 
    return message.channel.send(emj + '** | Você não possui a permissão `BAN_MEMBERS` para executar este comando.**');
    }
  
    if (!args[0]) { 
        return message.channel.send(`**${emj} | O usuário não foi encontrado.**`);
    }

    var user = message.mentions.members.first()
    
    var razao = args.slice(1).join(' ') 
    if (!razao) razao = `**${emj} | Motivo não informado.**`
  
    let muterole = message.guild.roles.find(role => role.name === 'mutado');

    if(!muterole){
        try{
            muterole = await message.guild.createRole({
            name: "mutado",
            color: "#000000",
            permissions:[]
    })
    
    message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
            
            });
        });

    } catch(e){
  
      console.log(e.stack);
  
    }
  }
    if(!muterole) return message.channel.send(`**${emj} | Não foi encontrado o cargo mutado.**`);
    try {
    
    user.addRole(muterole)
    message.channel.send(`**${emj2} | O ${user} foi mutado por ${message.author}, pelo motivo: ${razao}**`);
  
    } catch (err) { 
    message.channel.send(`**${emj} | Eu não tenho as permissões necessárias para mutar um membro!**`);
  
  }

}

module.exports.help = {
    name: 'mute'
}