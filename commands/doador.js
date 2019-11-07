const Discord = require('discord.js');
const database = require('../mongodb.js');
const moment = require('moment')
moment.locale('pt-BR')
const ms = require('ms')

// . = Entra na pasta
// .. => Sai da pasta

module.exports.run = async ({client, message, args, user, server, docDB}) => {

    message.delete().catch(e => {})

    let emj = '<:EMOJI2:615343200151797782>';
    let emj2 = '<:EMOJI:615343178433822756>';

    let prefix = server.prefix;

    if (!user.dono) {
        return message.channel.send(emj + '** | Você não possui a permissão `DONO` para executar este comando.**');
    
    }

    if (args === undefined || args.length === 0) {
            message.channel.send(`**${emj} | Comando errado, use: "${prefix}doador <add:remove>".**`);
            return;
    }

    if (args[0] == 'add') {

        let membro = message.mentions.users.first() || client.users.get(args[1]);
        let membroDB = await docDB({type: 1, content: membro})
        if (!membro) {
            return message.channel.send(`**${emj} | Você não mencionou nenhum membro para ser adicionado na minha lista de doadores.**`);
        }

        if(membroDB.doador) {
            return message.channel.send(`**${emj} | O membro citado já é um doador!**`)
        }

        if(!args[2]) {
            return message.channel.send(`**${emj} | Você não informou um tempo exato.**`)
        }

        if(args[2] && ms(args[2]) === undefined) {
            return message.channel.send(`**${emj} | O tempo citado no momento, é invalído!**`)
        }

        let time = parseInt(ms(args.slice(2).join(' ')))
        let timeStr = moment(Date.now() + time).format('LLLL')

        membroDB.doador = true;
        membroDB.doadorTime = Date.now() + time
        membroDB.save()

        message.channel.send(`**${emj2} | O ${membro} virou um doador, acaba em: ${timeStr}**`)

        let canal = client.channels.get('633782300030795777');
        if (client.guilds.get("633489586668175391").member(membroDB)) {
            message.guild.members.get(message.author.id).addRole("633782280904769563");
        }

        let embed = new Discord.RichEmbed()

        .setDescription('**<:EMOJI12:619619672920162304> EBAAA!! O ' + membro.tag + ' acabou de me doar <:EMOJI28:620415677383049221>\n\n<a:EMOJI47:626937935715106826> E por isso, meu novo doador ganhou uma tag especial até: `' + timeStr + '` <:EMOJI20:620044911546335234>\n\nReaja abaixo para agradecer o mesmo!**')
        .setColor(`RANDOM`)
        .setFooter(`Lunnar © Todos Direitos Reservados`)

        canal.send(embed).then(async msg => {

            msg.react('620415677383049221');

        });
            membro.addRole(role);

    } 

    if (args[0] == 'remove') {

        let membro = message.mentions.users.first();
        let membroDB = await docDB({type: 1, content: membro});
        if (!membro) {
            return message.channel.send(`**${emj} | Você não mencionou nenhum membro para ser adicionado na minha lista de doadores.**`);        
        }

        if(!membroDB.doador) {
            return message.channel.send(`**${emj} | O membro citado não é um doador!**`)
        }

        membroDB.doador = false
        membroDB.doadorTime = 0
        membroDB.save();

        message.channel.send(`**${emj2} | O ${membro}, foi removido da minha lista de doadores.**`);
    
        let role = client.guilds.get('609921485917782036').roles.get('609921485917782036');
        
        if (role) {
        membro.removeRole(role);
        }
    }
    
}
    
module.exports.help = {
    name: 'doador'
}