const Discord = require('discord.js');
const database = require('../mongodb.js');

module.exports.run = async ({client, message, args, user, server}) => {

if (!user.dono && !user.developer) return message.reply("usa não boiola")
  
function clean(text) {
  if (typeof(text) === "string")
  return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
  return text;
} 

  try {

      var code = args.slice(0).join(' ')
      var evaled = eval(code);
      
  if(!code) {

          var hhEmbed = new Discord.RichEmbed()
          
              .setColor("#36393e")
              .setDescription(`| ${message.author}, insira o **código** para prosseguir com o **comando**`)

          message.channel.send(hhEmbed)
      } else {

  if(typeof evaled !== "string")
  evaled = require("util").inspect(evaled);

  var embed = new Discord.RichEmbed()

          .setColor("#36393e")
          .setThumbnail(client.user.displayAvatarURL)
          .setFooter(`Lunnar © Todos Direitos Reservados`)
          .addField(" Código:", "```"+code+"```")
          .addField(" Resultado:","```"+evaled+"```")
          
  message.channel.send(embed).then(msg=> {
            msg.react('✅')
      })
  }
} catch (err) {
  
  const embed = new Discord.RichEmbed()
  .setColor("#36393e")
  .setFooter(`Lunnar © Todos Direitos Reservados`)
  .setThumbnail(client.user.displayAvatarURL)
  .addField(" Código:","```"+code+"```")
  .addField(" Erro:", "```"+`xl\n${clean(err)}`+"```")
message.channel.send(embed).then(msg=> {
msg.react('❌')
            })
        }
      if(args[0] === "guilds") {
        var servers = client.guilds
        var num = 0;
        var pagina = 1;
        var totalPages = parseInt(servers.size/10+1);
        
        var embed = new Discord.RichEmbed()

        .setDescription(`${servers.map(se=> `Nome: \`${se.name}\` - ID: \`${se.id}\``).slice(0,10).join('\n')}`)
        .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL)
        .setAuthor('Guilds em que Estou')
        .setColor('#36393e')
        
        message.channel.send(embed).then(async ser => {

            if(servers.size > 10) {

                await ser.react("⬅");
                await ser.react("➡");
                
                const voltar = ser.createReactionCollector((r, u) => r.emoji.name === "⬅" && u.id === message.author.id, { time: 100000 });
                const proximo = ser.createReactionCollector((r, u) => r.emoji.name === "➡" && u.id === message.author.id, { time: 100000 });
            
                            voltar.on("collect", async r => {
                                if(pagina !== 1) {
                                    num = num-10
                                    num = num.toString().length > 1 ? num-parseInt(num.toString().slice(num.toString().length-1)) : 0
                                    pagina -= 1
                                    var embed = new Discord.RichEmbed()

                                .addField(`Servidores:`, `${servers.map(se=> `Nome: \`${se.name}\` - ID: \`${se.id}\``).slice(pagina*10-10,pagina*10).join('\n')}`)
                                .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL)
                                .setColor('#36393e')
                                .setAuthor('Guilds em que Estou')
                               
                                ser.edit(embed)
                                    r.remove(r.users.last().id)
                                } else {
                                    pagina = totalPages
                                    num = totalPages*10-20

                                    var embedb = new Discord.RichEmbed()

                                    .setDescription(`${servers.map(se=> `Nome: \`${se.name}\` - ID: \`${se.id}\``).slice(totalPages*10-10,pagina*10).join('\n')}`)
                                    .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL)
                                  
                                    .setAuthor('Guilds em que Estou')
                                    .setColor('#36393e')
                                ser.edit(embedb)

                                    r.remove(r.users.last().id)
                                }
                            })
            
                            proximo.on("collect", async r => {
                                if(pagina !== totalPages) {
                                    num = num.toString().length > 1 ? num-parseInt(num.toString().slice(num.toString().length-1)) : 0
                                    num = num+10
                                    pagina += 1

                                    var embedc = new Discord.RichEmbed()

                                    .setDescription(`${servers.map(se=> `Nome: \`${se.name}\` - ID: \`${se.id}\``).slice(pagina*10-10,pagina*10).join('\n')}`)
                                    .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL)
                                  
                                    .setAuthor('Guilds em que Estou')
                                    .setColor('#36393e')
                                ser.edit(embedc)

                                    r.remove(r.users.last().id)
                                } else {
                                    pagina = 1
                                    num = 0

                                    var embedd = new Discord.RichEmbed()

                                    .setDescription(`${servers.map(se=> `Nome: \`${se.name}\` - ID: \`${se.id}\``).slice(0,pagina*10).join('\n')}`)
                                    .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL)
                                
                                    .setAuthor('Guilds em que Estou')
                                    .setColor('#36393e')
                                    ser.edit(embedd)

                                    r.remove(r.users.last().id)
                    }
                })
            }
        })

    } else {
  
  

      }

}

module.exports.help = {
    name: 'eval'
}
