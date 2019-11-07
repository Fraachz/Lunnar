const Discord = require('discord.js');
const ascii = require('ascii-art');

module.exports.run = async ({message, args}) => {

    let emj = '<:EMOJI2:615343200151797782>';
    let emj2 = '<:EMOJI:615343178433822756>';

    message.delete().catch(e => {})

    if (!args.join(' ')) return message.reply(`**${emj} | Por favor, especifique a mensagem para ser convertida.**`);

    ascii.font(args.join(' '), 'Doom', async txt => {
        message.channel.send(txt, {
            code: 'md'
        });
    });

};

module.exports.help = {
    name: 'ascii'
}