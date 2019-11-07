const Discord = require('discord.js');
const database = require('../mongodb.js');
const moment = require('moment')
moment.locale('pt-BR')

module.exports.run = async ({client, message, args, user, server, docDB}) => {
    
    message.delete().catch(e => {})

    let emj = '<:EMOJI2:615343200151797782>';
    let emj2 = '<:EMOJI:615343178433822756>';
    let emj3 = '<:duvida:576860848321200139>';
    let emj4 = '<:nocorrect:572142881280753674>';
    let emj5 = '<a:carregando:536319256384765972>';
    let emj6 = '<a:moneyflying:564141188362272768>';
    let emj7 = '<:yescorrect:577816535943479296>';

    let prefix = server.prefix;

        if (args === undefined || args.length === 0) {
        message.channel.send(`**${emj} | Comando errado, use: "${prefix}empresa <criar : deletar : contratar : demitir : pagar : rendimento : promover : rebaixar : info>".**`);
        return;
    }

    if (args[0] === 'criar') {
        
        if(user.empresa) {
            return message.channel.send(`**${emj} | Você já faz parte de uma empresa, saia dela (l!!trabalho sair) e tente novamente.**`);
        }

        let price = 25000
        if(user.coins < price) {
            return message.channel.send(`**${emj} | Você não possui dinheiro suficiente para abrir uma empresa. (Faltam ${Number(price - user.coins).toLocaleString()} coins)**`)
        }
 
        let name,
            tag;

        let nameSend = await message.channel.send(emj3 + '** | Qual será o nome de sua empresa? Para cancelar, digite: `cancelar`.**');
        
        message.channel.awaitMessages(mensagem => mensagem.author.id === message.author.id, {
            
            maxMatches: 1,
            time: 30000,
            errors: ['time']
        
        }).then(async nameAnswer => {

            name = nameAnswer.first().content
            await nameSend.delete()

            if(name === 'cancelar') { 
                return message.channel.send(`**${emj4} | A criação de sua empresa foi cancelada, para iniciar denovo, execute: l!!empresa criar.**`);
            }

            let empresaCheck = await database.Empresas.findOne({'lower': name.toLowerCase()})
            if(empresaCheck) { 
                return message.channel.send(`**${emj} | O nome escolhido já está sendo utilizado por outro membro, por favor escolha outro.**`); 
            }

            let tagSend = await message.channel.send(emj3 + '** | Qual será a tag de sua empresa? Para cancelar, digite: `cancelar`.**');
            
            message.channel.awaitMessages(mensagem => mensagem.author.id === message.author.id, {
            
                maxMatches: 1,
                time: 30000,
                errors: ['time']
            
            }).then(async tagAnswer => {
            
                tag = tagAnswer.first().content
                if(tag === 'cancelar') { 
                    return message.channel.send(`**${emj4} | A criação de sua empresa foi cancelada, para iniciar denovo, execute: l!!empresa criar.**`);
                }

                await tagSend.delete()

                let empresa = await docDB({type: 4, content: name, dono: message.author.id, tag})
                
                user.empresa = true
                user.empresaName = empresa._id
                user.coins -= price;

                user.save()

                message.channel.send(emj2 + '** | A sua empresa foi aberta, para fecha-la, use: `'+ prefix +'empresa deletar`**')

            }, function () {

                return message.channel.send(`**${emj} | O seu tempo foi esgotado, execute o comando novamente (${prefix}empresa criar) e digite mais rápido.**`);

            })

        }, function () {

            return message.channel.send(`**${emj} | O seu tempo foi esgotado, execute o comando novamente (${prefix}empresa criar) e digite mais rápido.**`);

        })

    }

    if (args[0] === 'deletar') {

        if(!user.empresa) {
            return message.channel.send(`**${emj} | Você não está em nenhuma empresa no momento.**`);
        }

        let empresa = await docDB({type: 4, content: user.empresaName})
        if(empresa.dono !== message.author.id) {
            return message.channel.send(emj + '** | Você não é dono dessa empresa, caso queira abrir uma nova empresa use: `'+ prefix +'empresa criar`**')
        }

        let gerentesLength = empresa.gerentes.length
        let gerentesNum = 1
        let funcionariosLength = empresa.funcionarios.length
        let funcionariosNum = 1

        empresa.funcionarios.forEach(async funcionario => {

            let userDB = await docDB({type: 1, content: {id: funcionario}})
            
            userDB.empresa = false
            userDB.empresaName = ''
            
            userDB.save()
            
            funcionariosNum += 1
            console.log(`[FUNCIONARIOS] ${funcionariosNum} - ${funcionariosLength}`)
        });

        empresa.gerentes.forEach(async gerente => {
                
            let gerenteDB = await docDB({type: 1, content: {id: gerente}})
        
            gerenteDB.empresa = false
            gerenteDB.empresaName = ''
        
            gerenteDB.save()
        
            gerentesNum += 1
            console.log(`[GERENTES] ${gerentesNum} - ${gerentesLength}`)
        
        })

        user.empresa = false
        user.empresaName = ''
        
        await empresa.delete()
        await user.save()
        
        return message.channel.send(emj2 + '** | A sua empresa foi deletada, para abrir uma nova empresa use: `'+ prefix +'empresa criar`**')
    }
    
    if (args[0] === 'contratar') {
        
        if(!user.empresa) {
            return message.channel.send(`**${emj} | Você não está em nenhuma empresa no momento.**`);
        }

        let empresa = await docDB({type: 4, content: user.empresaName})
        if(empresa.dono !== message.author.id && !empresa.gerentes.includes(message.author.id)) {
            return message.channel.send(emj + '** | Você não é dono e nem gerente dessa empresa, caso queira abrir uma nova empresa use: `'+ prefix +'empresa criar`**')
        }

        let membro = message.mentions.users.first()
        if (!membro) {
            return message.channel.send(`**${emj} | Mencione algum membro para que eu possa contratar o mesmo.**`)
        }

        if(membro.id === message.author.id) {
            return message.channel.send(`**${emj} | Eu não posso contratar você, pois você já está contratado.**`)
        }

        let membroDB = await docDB({type: 1, content: membro})

        if(membroDB.empresaName === empresa._id) {
            return message.channel.send(`**${emj} | O membro mencionado faz parte de sua empresa.**`)
        }

        let embed = new Discord.RichEmbed()

        .setTitle('Contrato')
        .setDescription(membro + ', voce recebeu uma proposta de emprego, para aceitar reaja abaixo. Atenciosamente ' + empresa._id)

        message.channel.send(embed).then(async msg => {
            await msg.react('615343178433822756')
            await msg.react('615343200151797782')
    
            const collector = msg.createReactionCollector((r, u) => (r.emoji.id === '615343178433822756' || r.emoji.id === '615343200151797782') && u.id === membro.id, { time: 60000 });
            
            let embedUser = new Discord.RichEmbed()

            .setTitle('Contrato')
            .setDescription(`Você foi chamado pra empresa ${empresa._id}\n**[Clique Aqui](${msg.url})** para ir até o **contrato**`)

            membro.send(embedUser)

            collector.on('collect', async r => {
                r.remove(r.users.last().id).catch(e => {})
                switch(r.emoji.id) {
                    case '615343178433822756':
                        
                        membroDB.empresa = true
                        membroDB.empresaName = empresa._id
                        membroDB.save()
                        
                        empresa.funcionarios.push(membro.id)
                        empresa.save()

                        msg.delete().catch(e => {})
                        message.channel.send('**' + emj7 +' | A proposta de emprego foi aceita!**')

                        await collector.stop()

                        break;
                    case '615343200151797782':

                    message.channel.send('**' + emj4 +' | A proposta de emprego foi recusada!**')

                        await collector.stop()
                        break;
                }
            })

            collector.on('end', async r => {
                message.delete().catch(e => {})
                msg.delete().catch(e => {})
                return;
            })
        })

    }

    if (args[0] === 'demitir') {

        if(!user.empresa) {
            return message.channel.send(`**${emj} | Você não está em nenhuma empresa no momento.**`)
        }

        let empresa = await docDB({type: 4, content: user.empresaName})
        if(empresa.dono !== message.author.id) {
            return message.channel.send(emj + '** | Você não é dono dessa empresa, caso queira abrir uma nova empresa use: `'+ prefix +'empresa criar`**')
        }

        let membro = message.mentions.users.first()
        if (!membro) {
            return message.channel.send(`**${emj} | Mencione algum membro para que eu possa promover o mesmo.**`)
        }

        if(membro.id === message.author.id) {
            return message.channel.send(`**${emj} | Eu não posso promover você, pois você já está com o maior cargo de sua empresa.**`)
        }
        
        let membroDB = await docDB({type: 1, content: membro})

        if(membroDB.empresaName !== empresa._id) {
            return message.channel.send(`**${emj} | O membro mencionado não faz parte de sua empresa.**`)
        }

        let msgConfirm = await message.channel.send(`**${emj4} | Você deseja mesmo demitir este usuário e leva-lo a falência?**`)

        await msgConfirm.react('615343178433822756')
        await msgConfirm.react('615343200151797782')

        const collector = msgConfirm.createReactionCollector((r, u) => (r.emoji.id === '615343178433822756' || r.emoji.id === '615343200151797782') && u.id === message.author.id, { time: 60000 });
        
        collector.on('collect', async r => {
            r.remove(r.users.last().id).catch(e => {})
            
            switch(r.emoji.id) {
                
                case '615343178433822756':
            
                    membroDB.empresa = false
                    membroDB.empresaName = ''
                    membroDB.workedDays = 0
            
                    await membroDB.save()
            
                    if(empresa.funcionarios.includes(membro.id)) {
                        empresa.funcionarios.splice(empresa.funcionarios.indexOf(membro.id), 1)
            
                    } else if (empresa.gerentes.includes(membro.id)) {
            
                        empresa.gerentes.splice(empresa.gerentes.indexOf(membro.id), 1)
                    }

                    await empresa.save()
            
                    message.channel.send(`**${emj2} | Você demitiu o ${membro}, que pena! Espero que um dia ele possa voltar a sua empresa.**`);

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

    if (args[0] === 'rendimento') {

        if(!user.empresa) {
            return message.channel.send(`**${emj} | Você não está em nenhuma empresa no momento.**`)
        }

        let empresa = await docDB({type: 4, content: user.empresaName})

        message.channel.send(`**${emj6} | O rendimento da empresa, foi calculado em: ${empresa.coins}**`)

    }
    
    if (args[0] === 'pagar') {

        if(!user.empresa) {
            return message.channel.send(`**${emj} | Você não está em nenhuma empresa no momento.**`)
        }

        let empresa = await docDB({type: 4, content: user.empresaName})
        if(empresa.dono !== message.author.id) {
            return message.channel.send(emj + '** | Você não é dono dessa empresa, caso queira abrir uma nova empresa use: `'+ prefix +'empresa criar`**')
        }
        
        let time = 5000 * 60 // 604800000
        if((empresa.lastPayment + time) > Date.now()) {
            return message.channel.send(`**${emj} | Você já efetuou o pagamento dos seus funcionários. (Execute novamente em: ${moment(empresa.lastPayment + time).format('llll')})**`)
        }

        if(empresa.coins === 0) {
            return message.channel.send(`**${emj} | Sua empresa não teve nenhum lucro / rendimento esta semana, por isso não irá receber nada. (Sua empresa entrará em falência caso continue sem lucros / rendimento )**`)
        }

        let restante = 0
        let total = empresa.gerentes.length + empresa.funcionarios.length
        let pagamento = parseInt(empresa.coins/(total))
        let pagamentoPorDia = parseInt(pagamento/7)

        if(empresa.coins > parseInt(pagamento*total)) {
            restante += parseInt(empresa.coins - pagamento*total)
        } else {
            restante = empresa.coins
        }

        let esperando = await message.channel.send(`**${emj5} | Aguarde, estou fazendo o pagamento dos usuários.**`)

        const gerentesLength = empresa.gerentes.length
        const funcionariosLength = empresa.funcionarios.length

        empresa.lastPayment = Date.now()

        const getResult = async () => {
            user.bank += restante

            user.save()
            await esperando.edit(`**${emj6} | O pagamento foi realizado, valor pago para os funcionários da empresa: ${Number(empresa.coins - restante).toLocaleString()} reais. E também, enviamos ${Number(restante).toLocaleString()} reais para o dono da empresa.**`)

            empresa.coins = 0
            empresa.save()
        }

        const gerentesCheck = async (pagamentoPorDia) => {
            if(gerentesLength === 0) {
                await getResult()
            }
            for(var j = 0; i < gerentesLength; j++) {
            
                let funcionario = empresa.gerentes[j];
                let userDB = await docDB({type: 1, content: {id: funcionario}})
                let payment = parseInt(userDB.workedDays * pagamentoPorDia)
                console.log(userDB)
                userDB.coins += payment
                restante -= parseInt(payment)
                userDB.workedDays = 0
    
                userDB.save()
    
                if(j === (gerentesLength - 1)) {
                    await getResult()
                }
            }
        }

        if(funcionariosLength === 0) {
            if(gerentesLength !== 0) {
                await gerentesCheck(pagamentoPorDia)
            } else {
                return await getResult()
            }
        }

        for(var i = 0; i < funcionariosLength; i++) {
            
            let funcionario = empresa.funcionarios[i];
            let userDB = await docDB({type: 1, content: {id: funcionario}})
            console.log(userDB)
            let payment = parseInt(userDB.workedDays * pagamentoPorDia)

            userDB.coins += payment
            restante -= parseInt(payment)
            userDB.workedDays = 0

            userDB.save()

            if(i === (funcionariosLength - 1)) {
                await gerentesCheck(pagamentoPorDia)
            }

        }

    }

    if (args[0] === 'promover') {

        // `**${emj} | **`

        if(!user.empresa) {
            return message.channel.send(`**${emj} | Você não está em nenhuma empresa no momento.**`)
        }

        let empresa = await docDB({type: 4, content: user.empresaName})
        if(empresa.dono !== message.author.id) {
            return message.channel.send(emj + '** | Você não é dono dessa empresa, caso queira abrir uma nova empresa use: `'+ prefix +'empresa criar`**')
        }

        let membro = message.mentions.users.first()
        if (!membro) {
            return message.channel.send(`**${emj} | Mencione algum membro para que eu possa promover o mesmo.**`)
        }

        if(membro.id === message.author.id) {
            return message.channel.send(`**${emj} | Eu não posso promover você, pois você já está com o maior cargo de sua empresa.**`)
        }
        
        let membroDB = await docDB({type: 1, content: membro})

        if(membroDB.empresaName !== empresa._id) {
            return message.channel.send(`**${emj} | O membro mencionado não faz parte de sua empresa.**`)
        }

        if(empresa.gerentes.includes(membro.id)) {
            return message.channel.send(`**${emj} | O membro mencionado já foi promovido a gerente.**`)
        }

        if(empresa.gerentes.length === 2) {
            return message.channel.send(`**${emj} | A empresa já possui 2 gerentes.**`)
        }

        empresa.gerentes.push(membro.id)
        empresa.funcionarios.splice(empresa.funcionarios.indexOf(membro.id), 1)

        await empresa.save()

        message.channel.send(`**${emj2} | O membro mencionado foi promovido a gerente de sua empresa.**`)
        return membro.send(`**${emj2} | Olá, desculpe-me o incomodo, queria avisa-lo que você foi promovido a gerente em seu trabalho.\nEmpresa: ${empresa._id}**`)
    }

    if (args[0] === 'rebaixar') {

        if(!user.empresa) {
            return message.channel.send(`**${emj} | Você não está em nenhuma empresa no momento.**`)
        }

        let empresa = await docDB({type: 4, content: user.empresaName})
        if(empresa.dono !== message.author.id) {
            return message.channel.send(emj + '** | Você não é dono dessa empresa, caso queira abrir uma nova empresa use: `'+ prefix +'empresa criar`**')
        }

        let membro = message.mentions.users.first()
        if (!membro) {
            return message.channel.send(`**${emj} | Mencione algum membro para que eu possa promover o mesmo.**`)
        }

        if(membro.id === message.author.id) {
            return message.channel.send(`**${emj} | Eu não posso promover você, pois você já está com o maior cargo de sua empresa.**`)
        }

        let membroDB = await docDB({type: 1, content: membro})

        if(membroDB.empresaName !== empresa._id) {
            return message.channel.send(`**${emj} | O membro mencionado não faz parte de sua empresa.**`)
        }

        if(empresa.funcionarios.includes(membro.id)) {
            return message.channel.send(`**${emj} | O membro mencionado já está como funcionário.**`)
        }

        empresa.funcionarios.push(membro.id)
        empresa.gerentes.splice(empresa.gerentes.indexOf(membro.id), 1)

        await empresa.save()

        message.channel.send(`**${emj2} | O membro mencionado foi rebaixado a funcionário de sua empresa.**`)
        return membro.send(`**${emj2} | Olá, desculpe-me o incomodo, queria avisa-lo que você foi rebaixado a funcionário em seu trabalho.\nEmpresa: ${empresa._id}**`)

    }

    if (args[0] === 'info') {

        if(!user.empresa) {
            return message.channel.send(`**${emj} | Você não está em nenhuma empresa no momento.**`)
        }

        let empresa = await docDB({type: 4, content: user.empresaName})

        let name = empresa._id
        let tagname = empresa.tag
        let owner = client.users.get(empresa.dono).tag
        let totalfunc = empresa.funcionarios.length
        let totalgen = empresa.gerentes.length
        let rend = empresa.coins
        let valor_emp = empresa.coins + (empresa.funcionarios.length * 1200) + (empresa.gerentes.length * 1400)

        let info = new Discord.RichEmbed()

        .setDescription(`**<a:EMOJI35:621494395107147796> | Informações de sua Empresa:
        
        <:EMOJI29:620813196575375360> | Nome da empresa: ${name}
        <:EMOJI29:620813196575375360> | Tag da empresa: ${tagname}
        <:EMOJI29:620813196575375360> | Dono da empresa: ${owner}
        
        <:suporte:564141197388546068> | Quantidade de gerentes: ${totalgen}
        <:suporte:564141197388546068> | Quantidade de funcionários: ${totalfunc}
        
        <:EMOJI12:619619672920162304> | Rendimento atual da empresa: ${rend}
        <:EMOJI12:619619672920162304> | Valor atual da empresa: ${Number(valor_emp).toLocaleString()}**`)
        .setFooter(`Lunnar © Todos Direitos Reservados`)

        message.channel.send(info)

    }
}

module.exports.help = { 
    name: 'empresa'
}