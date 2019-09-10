const Discord = require('discord.js');
const weather = require('weather-js');

module.exports.run = async ({client, message, args}) => {
  
    let emj = '<:EMOJI2:615343200151797782>';
    let emj2 = '<:EMOJI:615343178433822756>';

    message.delete().catch(e => {})
    weather.find({search: args.join(" "), degreeType: 'C', lang: 'pt-BR'}, function(err, result) {
      
      if (err) message.channel.send(err);
      
      if (result === undefined || result.length === 0) {

          message.channel.send(emj + '** | Você não inseriu o local em que deseja ver o clima tempo.**')
          return;
      }

      var current = result[0].current;
      var location = result[0].location;

      const embed = new Discord.RichEmbed()

          .setDescription(`🌤 **${current.skytext}** 🌨`)
          .setTitle(`🏡 **Clima Tempo De ${current.observationpoint}**`)
          .setThumbnail(current.imageUrl)
          .setColor(0x00AE86)
          .addField('⏰ **Fuso horário**',`UTC${location.timezone}`, true)
          .addField('🌦 **Tipo de Grau**',location.degreetype, true)
          .addField('🌡 **Temperatura**',`${current.temperature} Graus`, true)
          .addField('🌡 **Parece**', `${current.feelslike} Graus`, true)
          .addField('🌫 **Ventos**',current.winddisplay, true)
          .addField('🌊  **Umidade**', `${current.humidity}%`, true)
          .setFooter(`Lunnar © Todos Direitos Reservados`)

          message.channel.send(embed);

      })
  }

module.exports.help = {
	name: "clima" 
}