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


        //         var position2 = message.guild.map(function(user) {
    
        //             return {
    
        //                 id: user._id,
        //                 coins: user.coins + user.bank
        //             }
        //         });
    
        //         position2 = position2.sort(function(c, d) {
        //             return c.coins - d.coins
        //         });
    
        //         position2 = position2.filter(function(b) {
        //             return message.guild.members.get(b.id)
        //                 **<a:EMOJI18:619934249549824000> BILIONARIOS DO MUNDO (LOCAL) <a:EMOJI18:619934249549824000>**
                
        //                  ${moneytop2}
        //     })
        }
                let aa = client.user.displayAvatarURL

                var moneytop = `\n` + position.slice(0, 5).map((a, posicao) => `**${emj} | ` + (posicao + 1) + `-** ${client.users.get(a.id).username}  : R$ ${Number(a.coins).toLocaleString()}`).join("\n") + "";
                // var moneytop2 = `\n` + position2.slice(0, 5).map((b, posicao2) => `**${emj} | ` + (posicao2 + 1) + `-** ${message.guild.members.get(b.id).username}  : R$ ${Number(a.coins).toLocaleString()}`).join("\n") + "";;

                let embed = new Discord.RichEmbed()

                .setDescription(`
                **<a:EMOJI18:619934249549824000> BILIONARIOS DO MUNDO (GLOBAL) <a:EMOJI18:619934249549824000>**
                
                ${moneytop}`)
                .setColor('#55512')
                .setThumbnail(aa)
                .setFooter('Lunnar © Todos Direitos Reservados');

                message.channel.send(embed);


        })
    })
}

module.exports.help = {
    name: 'moneytop'
}