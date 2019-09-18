const Discord = require('discord.js');
const ms = require("ms");

module.exports.run = async({client, message, args, user, server}) => {

    message.delete().catch(e => {})

    let emj = '<:EMOJI2:615343200151797782>';
    let emj2 = '<:EMOJI:615343178433822756>';

    if (!user.dono && !user.developer && !message.guild.me.hasPermission("BAN_MEMBERS")) { 
    return message.channel.send(emj + '** | Você não possui a permissão `BAN_MEMBERS` para executar este comando.**');
  }

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply(`**${emj} | O usuário não foi encontrado.**`);
  
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

  let mutetime = args[1];
  if(!mutetime) return message.channel.send(`**${emj} | Você não especifícou o tempo**`);

  await(tomute.addRole(muterole.id));
  message.channel.send(`**${emj2} | <@${tomute.id}> foi mutado por ${ms(ms(args.slice(1).join(' ')))}**`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
        message.channel.send(`**${emj2} | O <@${tomute.id}> foi desmutado, acho que ele aprendeu a lição.**`);
        
        }, ms(args.slice(1).join(' ')));

    }
module.exports.help = {
    name: 'tempmute'
}