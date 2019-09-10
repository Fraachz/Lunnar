const Discord = require('discord.js');

module.exports.run = async({message, args, user, server, docDB}) => {

    message.delete().catch(e => {})

    let emj = '<:EMOJI2:615343200151797782>';
    let emj2 = '<:EMOJI:615343178433822756>';
    let emj3 = '<a:EMOJI18:619934249549824000>';

    let prefix = server.prefix;

    if (args === undefined || args.length === 0) {
        message.channel.send(`**${emj} | Comando errado, use: "${prefix}banco <depositar : retirar : versaldo : transferir>".**`);
        return;
    }

    if (args[0] === 'depositar') {

        const quant = Number(args[1])
    
        if (isNaN(quant)) { 
            return message.channel.send(`**${emj} | Por favor, me informe quantos reais você quer depositar do banco.**`);
        }

        if (quant <= 99) { 
            return message.channel.send(emj + ' ** | Você precisa no minímo 100 reais para fazer um deposito. (Faltam `' + Number(user.coins - 100).toLocaleString() + '` reais)**')
        }

        if(quant > user.coins) {
            return message.channel.send(emj + '** | Você não possui essa quantia em sua carteira.**')
        }

        user.bank += quant;
        user.coins -= quant;

        user.save();

        return message.channel.send(emj2 + '** | Você acabou de depositar `' + Number(quant).toLocaleString() + '` em sua conta bancaria.**');
    
    }

    if (args[0] === 'retirar') {

        const quant = Number(args[1])
    
        if (isNaN(quant)) { 
            return message.channel.send(`**${emj} | Por favor, me informe quantos reais você quer retirar do banco.**`);
        }

        if(quant > user.bank) {
            return message.channel.send(emj + '** | Você não possui essa quantia em sua conta bancaria.**')
        }

        user.bank -= quant;
        user.coins += quant;

        user.save();

        return message.channel.send(emj2 + '** | Você acabou de retirar `' + Number(quant).toLocaleString() + '` reais de sua conta bancaria.**');
    
    }

    if (args[0] === 'versaldo') {

        let membro = message.mentions.users.first() ? message.mentions.users.first() : message.author
        let membroDB = await docDB({type: 1, content: membro})

        let valor = membroDB.bank;

        if(membro.id !== message.author.id) {
            return message.channel.send(emj3 + '** | O '+ membro +' possui `' + Number(membroDB.bank).toLocaleString() + '` reais em sua conta bancaria.**')            

        } else {
            return message.channel.send(emj3 + '** | Você possui `' + Number(valor).toLocaleString() + '` reais em sua conta bancaria.**')
        }
    }

    if (args[0] === 'transferir') {

        let membro = message.mentions.users.first() ? message.mentions.users.first() : message.author;
        let membroDB = await docDB({type: 1, content: membro});
        
        if (!membro) {
            return message.channel.send(`**${emj2} | Você não mencionou nenhum membro para ser efetuada a transferência.**`)
        }

        const quant = Number(args[2])
    
        if (isNaN(quant)) { 
            return message.channel.send(`**${emj} | Por favor, me informe quantos reais você quer transferir.**`);
        }

        if(quant > user.bank) {
            return message.channel.send(emj + '** | Você não possui essa quantia em sua conta bancaria.**')
        }

        if (user.bank <= 99) { 
            return message.channel.send(emj + ' ** | Você tem que ter no minímo 100 reais para efetuar uma transferência. (Faltam `' + Number(user.bank - 100).toLocaleString() + '` reais)**')
        }

        if(membro.id === message.author.id) {
            return message.channel.send(`**${emj} | Eu não posso transferir dinheiro para você mesmo.**`)
        }

        user.bank -= quant;
        membroDB.bank += quant;

        user.save()
        membroDB.save()

        return message.channel.send(`**${emj2} | Você acabou de transferir ${Number(quant).toLocaleString()} reais para o ${membro}.**`);

    }

}

module.exports.help = {
    name: 'banco'
}