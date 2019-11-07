//iMportar os itens
const { RichEmbed } = require('discord.js');

//Modo de uso


/*
    Sempre que for fazer uma contratação se deve passar o 
    Usuario contratador
*/

const emj = '<:EMOJI2:615343200151797782>';
const emj2 = '<:EMOJI:615343178433822756>';
const emj3 = '<:duvida:576860848321200139>';
const emj4 = '<:nocorrect:572142881280753674>';
const emj5 = '<a:carregando:536319256384765972>';
const emj6 = '<a:moneyflying:564141188362272768>';
const emj7 = '<:yescorrect:577816535943479296>';

class Trabalho {
    constructor(contratador,contratado) {
        this.empresa = contratador.empresa;
        this.propostaFor = contratado;
    }

    sairEmprego({ message, args, user}) {
        if (args[0].toUpperCase() === 'RECUSAR') {
            if (user.empresa) {
                //msg + cmd
             message.channel.send(new RichEmbed()
                    .setTitle('')
                    .setDescription('')
                    .setFooter('')
                );
            }else {
                message.channel.send(`**${emj2} | Você não está em nenhuma empresa no momento.**`);
            }
        }
    }

    // usuario
    aceitarEmprego({ message, args, user}) {
        if (args[0].toUpperCase() === 'ACEITAR') {
            if (user.empresa) {
                //msg erro
                message.channel.send(`**${emj} | Você Já esta em uma empresa**`);

            }else {
                //msg + cmd
                //logica comando
                message.channel.send(`**${emj7} | Você acabou de aceitar uma proposta de emprego!**`)
            }
        }
    }

    consultarPropostas() {

    }

}