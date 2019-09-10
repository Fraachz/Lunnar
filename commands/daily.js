const Discord = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

module.exports.run = async ({ message, user }) => {
    message.delete().catch(e => { })

    let emj = '<a:EMOJI18:619934249549824000>';
    let emj2 = '<:EMOJI2:615343200151797782>';

    const time = 86400000

    let valor = user.dono ? 2400 : user.developer ? 1200 : user.staff ? 1000 : user.doador ? 800 : 450;
    var tempo = moment.duration.format([moment.duration((parseInt(user.lastPayment) + time) - Date.now())], 'd [Dias], h [Horas], m [Minutos], s [Segundos]')

    if ((parseInt(user.lastPayment) + time) <= (Date.now())) {
        
        user.coins += valor
        user.coinsG += valor;
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