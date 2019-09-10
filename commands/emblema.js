const Discord = require('discord.js');

module.exports.run = async({client, message, args, user, server, docDB}) => {

    message.delete().catch(e => {})

    let emj = '<:EMOJI2:615343200151797782>';
    let emj2 = '<:EMOJI:615343178433822756>';
    let emj3 = '<:EMOJI13:619620385725480960>';
    let emj4 = '<a:EMOJI24:620050774361112577>';
    let emj5 = '<:EMOJI25:620050774411706369>';
    let emj6 = '<a:EMOJI23:620050774814097409>';
    let emj7 = '<:EMOJI15:619713752593596430>';
    let emj8 = '<a:EMOJI18:619934249549824000>';

    let prefix = server.prefix;

    if (!user.dono && !user.developer && !user.staff) {
        return message.channel.send(emj + '** | Você não possui a permissão `DONO`, `DEVELOPER` ou `STAFF` para executar este comando.**');
    }

    if (args === undefined || args.length === 0) {
        message.channel.send(`**${emj} | Comando errado, use: "${prefix}emblema <add : remove : emblemas>".**`);
        return;
    }

    if (args[0] === 'add') {

        let membro = message.mentions.users.first() ? message.mentions.users.first() : message.author;
        let membroDB = await docDB({type: 1, content: membro});

        let nameSend = await message.channel.send('**<:EMOJI3:617554602576838676> | Você deseja adicionar que emblema para o ' + membro + '?**');
        
        message.channel.awaitMessages(mensagem => mensagem.author.id === message.author.id, {
            
            maxMatches: 1,
            time: 30000,
            errors: ['time']
        
        }).then(async nameAnswer => {

            name = nameAnswer.first().content
            await nameSend.delete()

            if (name === 'doador') {
                
                if (membroDB.emblemas.some(emblema => emblema.type === 'doador')) return message.channel.send(`**${emj} | O emblema citado já foi adicionado no perfil do usuário.**`)
    
                membroDB.emblemas.push({
                    type: 'doador',
                    emoji: '<:EMOJI25:620050774411706369>'
                })

                membroDB.save()

                return message.channel.send(`**${emj2} | O emblema escolhido foi:** doador (${emj5}).`);

            }
            
            if (name === 'amigo') {
                
                if (membroDB.emblemas.some(emblema => emblema.type === 'amigo')) return message.channel.send(`**${emj} | O emblema citado já foi adicionado no perfil do usuário.**`)
    
                membroDB.emblemas.push({
                    type: 'amigo',
                    emoji: '<a:EMOJI23:620050774814097409> '
                })

                membroDB.save()

                return message.channel.send(`**${emj2} | O emblema escolhido foi:** amigo (${emj6}).`);

            }

            if (name === 'staff') {
                
                if (membroDB.emblemas.some(emblema => emblema.type === 'staff')) return message.channel.send(`**${emj} | O emblema citado já foi adicionado no perfil do usuário.**`)
    
                membroDB.emblemas.push({
                    type: 'staff',
                    emoji: '<a:EMOJI24:620050774361112577>'
                })

                membroDB.save()

                return message.channel.send(`**${emj2} | O emblema escolhido foi:** staff (${emj4}).`);

            }

            if (name === 'developer') {
                
                if (membroDB.emblemas.some(emblema => emblema.type === 'developer')) return message.channel.send(`**${emj} | O emblema citado já foi adicionado no perfil do usuário.**`)
    
                membroDB.emblemas.push({
                    type: 'developer',
                    emoji: '<:EMOJI15:619713752593596430>'
                })

                membroDB.save()

                return message.channel.send(`**${emj2} | O emblema escolhido foi:** developer (${emj7}).`);
            }

            if (name === 'rico') {
                
                if (membroDB.emblemas.some(emblema => emblema.type === 'rico')) return message.channel.send(`**${emj} | O emblema citado já foi adicionado no perfil do usuário.**`)
    
                membroDB.emblemas.push({
                    type: 'rico',
                    emoji: '<a:EMOJI18:619934249549824000>'
                })

                membroDB.save()

                return message.channel.send(`**${emj2} | O emblema escolhido foi:** developer (${emj8}).`);
            }

            if (name === 'dono') {
                
                if (membroDB.emblemas.some(emblema => emblema.type === 'dono')) return message.channel.send(`**${emj} | O emblema citado já foi adicionado no perfil do usuário.**`)
    
                membroDB.emblemas.push({
                    type: 'dono',
                    emoji: '<:EMOJI13:619620385725480960>'
                })

                membroDB.save()

                return message.channel.send(`**${emj2} | O emblema escolhido foi:** dono (${emj3}).`);
            }

        }), function () {

        return message.channel.send(`**${emj} | O seu tempo foi esgotado, execute o comando novamente (${prefix}emblema add) e digite mais rápido.**`);

        }
    }

    if (args[0] === 'remove') {

        let membro = message.mentions.users.first() ? message.mentions.users.first() : message.author;
        let membroDB = await docDB({type: 1, content: membro});

        let nameSend = await message.channel.send('**<:EMOJI3:617554602576838676> | Você deseja remover que emblema do '+ membro +' ?**');
        
        message.channel.awaitMessages(mensagem => mensagem.author.id === message.author.id, {
            
            maxMatches: 1,
            time: 30000,
            errors: ['time']
        
        }).then(async nameAnswer => {

            name = nameAnswer.first().content
            await nameSend.delete()

            if (name === 'doador') {
                
                if (membroDB.emblemas.find(emblema => emblema.type === 'doador')) return message.channel.send(`**${emj} | O emblema citado já foi removido do perfil do usuário.**`)
                const emblema = membroDB.emblemas.find(emblema.type === 'doador')
                membroDB.emblemas.splice(emblema, 1)

                membroDB.save()

                return message.channel.send(`**${emj2} | O emblema escolhido foi:** doador (${emj5}).`);

            }
            
            if (name === 'amigo') {
                
                if (membroDB.emblemas.find(emblema => emblema.type === 'amigo')) return message.channel.send(`**${emj} | O emblema citado já foi removido do perfil do usuário.**`)
                const emblema = membroDB.emblemas.find(emblema.type === 'amigo')
                membroDB.emblemas.splice(emblema, 1)

                membroDB.save()

                return message.channel.send(`**${emj2} | O emblema escolhido foi:** amigo (${emj6}).`);

            }

            if (name === 'staff') {
                
                if (membroDB.emblemas.find(emblema => emblema.type === 'staff')) return message.channel.send(`**${emj} | O emblema citado já foi removido do perfil do usuário.**`)
                const emblema = membroDB.emblemas.find(emblema.type === 'staff')
                membroDB.emblemas.splice(emblema, 1)

                membroDB.save()

                return message.channel.send(`**${emj2} | O emblema escolhido foi:** staff (${emj4}).`);

            }

            if (name === 'developer') {
                
                if (membroDB.emblemas.find(emblema => emblema.type === 'developer')) return message.channel.send(`**${emj} | O emblema citado já foi removido do perfil do usuário.**`)
                const emblema = membroDB.emblemas.find(emblema.type === 'developer')
                membroDB.emblemas.splice(emblema, 1)

                membroDB.save()

                return message.channel.send(`**${emj2} | O emblema escolhido foi:** developer (${emj7}).`);
            }


            if (name === 'rico') {
                
                if (membroDB.emblemas.find(emblema => emblema.type === 'rico')) return message.channel.send(`**${emj} | O emblema citado já foi removido do perfil do usuário.**`)
    
                const emblema = membroDB.emblemas.find(emblema.type === 'rico')
                membroDB.emblemas.splice(emblema, 1)

                membroDB.save()

                return message.channel.send(`**${emj2} | O emblema escolhido foi:** rico (${emj8}).`);
            }

            if (name === 'dono') {
                
                emblema.type === 'dono'
    
                if (membroDB.emblemas.find(emblema => emblema.type === 'dono')) return message.channel.send(`**${emj} | O emblema citado já foi removido do perfil do usuário.**`)
                membroDB.emblemas.splice(emblema, 1)

                membroDB.save()

                return message.channel.send(`**${emj2} | O emblema escolhido foi:** dono (${emj3}).`);
            }


        }), function () {

        return message.channel.send(`**${emj} | O seu tempo foi esgotado, execute o comando novamente (${prefix}emblema remove) e digite mais rápido.**`);

        }
    }

    if (args[0] === 'emblemas') {

        let embed = new Discord.RichEmbed()

        .setDescription(`**
        
        - developer (${emj7})
        - doador (${emj5})
        - amigo (${emj6})
        - staff (${emj4})
        - rico (${emj8})
        - dono (${emj3})

        **`)
        .setFooter()

        message.channel.send(embed);

    }

}

module.exports.help = {
    name: 'emblema'
}