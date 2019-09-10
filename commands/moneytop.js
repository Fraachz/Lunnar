const Discord = require('discord.js');
const database = require('../mongodb.js');

module.exports.run = async({client, message, user}) => {
    
    let emj = '<a:EMOJI17:619923265955168296>';

    message.delete().catch(e => {})

    database.Users.findOne({

        "_id": message.author.id

    }, function(erromano, usermano) {

        database.Users.find({}, function(erro, user) {

            if (user) {

                var position = user.map(function(user) {

                    return {

                        id: user._id,
                        coins: user.coins + user.bank
                    }
                });

                position = position.sort(function(a, b) {
                    return b.coins - a.coins
                });

                position = position.filter(function(a) {
                    return client.users.get(a.id)
                })

                let aa = client.user.displayAvatarURL

                var moneytop = `\n` + position.slice(0, 10).map((a, posicao) => `**${emj} | ` + (posicao + 1) + `-** ${client.users.get(a.id).username}  = R$ ${Number(a.coins).toLocaleString()}`).join("\n") + "";
            
                let embed = new Discord.RichEmbed()

                .setDescription(`**❄ MONEY TOP ❄**\n${moneytop}`)
                .setColor('#55512')
                .setThumbnail(aa)
                .setFooter('Lunnar © Todos Direitos Reservados')

                message.channel.send(embed)

            }
        });
    })
}

module.exports.help = {
    name: 'moneytop'
}