const Discord = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

module.exports.run = async ({ message, user }) => {
    message.delete().catch(e => { })

    let emj = '<a:EMOJI18:619934249549824000>';
    let emj2 = '<:EMOJI2:615343200151797782>';

    const time = 86400000

    let valor = user.dono ? Math.floor(Math.random() * (5000 - 2500)) + 2500 : user.developer ? Math.floor(Math.random() * (3000 - 1500)) + 1500 : user.staff ? Math.floor(Math.random() * (2500 - 800)) + 800 : user.doador ? Math.floor(Math.random() * (1000 - 100)) + 100 : Math.floor(Math.random() * (800 - 100)) + 100;
    var tempo = moment.duration.format([moment.duration((parseInt(user.lastPayment) + time) - Date.now())], 'd [Dias], h [Horas], m [Minutos], s [Segundos]')

    if ((parseInt(user.lastPayment) + time) <= (Date.now())) {
        
        user.coins += valor
        user.lastPayment = Date.now()
        user.save()

        message.channel.send(emj + '** | Você recolheu seus bônus diários, valor entregue: `' + Number(valor).toLocaleString() + '` reais.**')
    } else {
        message.channel.send(`** ${ emj2 } | Você já recolheu seu bônus diário. (Espere ${tempo} para executar o comando novamente.)**`)
    }
}

module.exports.help = {
    name: 'daily'
}