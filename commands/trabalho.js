const Discord = require('discord.js');
const database = require('../mongodb.js');

module.exports.run = async ({client, message, args, user, server, docDB}) => {
    
    message.delete().catch(e => {})

    let emj = '<:EMOJI2:615343200151797782>';
    let emj2 = '<:EMOJI:615343178433822756>';
    let emj3 = '<:info:577816535343562752>';
    let emj4 = '<a:EMOJI47:626937935715106826>';
    let emj5 = '';

    let prefix = server.prefix;
    let Color = '1BECE5';
    let Rodape = 'Lunnar © Todos Direitos Reservados';

        if (args === undefined || args.length === 0) {
        message.channel.send(`**${emj} | Comando errado, use: "${prefix}trabalho <proposta : sair : saldo : marcarponto>".**`);
        return;
    }

    if (args[0] === 'proposta') {

        if(user.empresa) {
            return message.channel.send(`**${emj} | Você já está em uma empresa no momento.**`);
        }

        let empresasDB = await database.Empresas.find({})
        let empresasMap = empresasDB.map(empresa => `${empresa._id} [${empresa.tag}]`).join('\n')   

        let embed = new Discord.RichEmbed()

        .setTitle(`**${emj3} | Empresas Disponíveis:**`)
        .setDescription(empresasMap)
        .setColor(Color)
        .setColor(Rodape)

        message.channel.send(embed)

        // Com REACT

    }

    if (args[0] === 'sair') {
        
        let empresa = await docDB({type: 4, content: user.empresaName});
        let membro = message.author;

        if(!user.empresa) {
            return message.channel.send(`**${emj} | Você não está em nenhuma empresa no momento.**`);
        }

        let msgConfirm = await message.channel.send(`**${emj4} | Você deseja mesmo sair desta empresa?**`)

        await msgConfirm.react('615343178433822756')
        await msgConfirm.react('615343200151797782')

        const collector = msgConfirm.createReactionCollector((r, u) => (r.emoji.id === '615343178433822756' || r.emoji.id === '615343200151797782') && u.id === message.author.id, { time: 60000 });
        
        collector.on('collect', async r => {
            r.remove(r.users.last().id).catch(e => {})
            
            switch(r.emoji.id) {
                
                case '615343178433822756':
            
                    user.empresa = false
                    user.empresaName = ''
                    user.workedDays = 0
            
                    await user.save()
            
                    if(empresa.funcionarios.includes(membro.id)) {
                        empresa.funcionarios.splice(empresa.funcionarios.indexOf(membro.id), 1)
            
                    } else if (empresa.gerentes.includes(membro.id)) {
            
                        empresa.gerentes.splice(empresa.gerentes.indexOf(membro.id), 1)
                    }

                    await empresa.save()
            
                    message.channel.send(`**${emj2} | Você saiu da empresa ${empresa._id}, espero que um dia possa trabalhar conosco novamente.**`);

                    await collector.stop()

                break;
                
                case '615343200151797782':
                
                    await collector.stop()
            
                break;
            }
        })

        collector.on('end', async r => {
            message.delete().catch(e => {})
            msgConfirm.delete().catch(e => {})
            return;
    
    })    
}

    if (args[0] === 'saldo') {
        
    }

    if (args[0] === 'marcarponto') {
        
        /*

        EM BREVE

        */ 

    }

}

module.exports.help = {
    name: 'trabalho'
}