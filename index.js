console.log('[BOT] Ligando...')

const Discord = require('discord.js');
const config = require('./config.json');
const database = require('./mongodb.js');
const fs = require('fs');
const timexp = new Set();
const mongoose = require('mongoose');
const moment = require('moment');

//Flood Config
const mappedMessages = new Map() 

const client = new Discord.Client();

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

const docDB = async (doc) => {

    switch (doc.type) {

        case 1:
            
            if (doc.content.bot) return;

            const userCheck = await database.Users.findOne({'_id': doc.content.id})
            if (userCheck) return userCheck;

            const usuario = new database.Users({
                _id: doc.content.id

            }); await usuario.save(); return usuario;
            break;

        case 2:

            const guildCheck = await database.Guilds.findOne({'_id': doc.content.id})

            if (guildCheck) return guildCheck;

            const servidor = new database.Guilds({
                _id: doc.content.id

            }); await servidor.save(); return servidor;
            break;

        case 3:

            const cmdCheck = await database.Commands.findOne({'_id': doc.content})

            if (cmdCheck) return cmdCheck;
    
            const command = new database.Commands({
                _id: doc.content
    
            }); await command.save(); return command;
            break;

        case 4:

            const empresaCheck = await database.Empresas.findOne({'_id': doc.content})

            if (empresaCheck) return empresaCheck;
    
            const empresa = new database.Empresas({
                _id: doc.content,
                lower: doc.content.toLowerCase(),
                dono: doc.dono,
                tag: doc.tag
                
            }); await empresa.save(); return empresa;
            break;

        case 5:

            const exclusivoCheck = await database.Exclusivos.findOne({'_id': doc.content.id})

            if (exclusivoCheck) return exclusivoCheck;

            const exclusivo = new database.Exclusivos({
                _id: doc.content.id

            }); await exclusivo.save(); return exclusivo;
            break;
    }
}

exports.docDB = docDB

fs.readdir("./commands/", (err, files) => {
    
    if (err) { console.error(err); }

    let jsfile = files.filter(f => f.split('.').pop() === 'js')
    if(jsfile.length <= 0) {
        return console.log('[COMANDO] Não consegui encontrar comandos.')
    }

    console.log(jsfile)
    jsfile.forEach((f, i) => {
        
        let props = require(`./commands/${f}`);
        console.log(`[COMANDO] ${f} carregado.`)

        client.commands.set(props.help.name, props);
    })

})

// fs.readdir("./music/", (err, files) => {
    
//     if (err) { console.error(err); }

//     let jsfile = files.filter(f => f.split('.').pop() === 'js')
//     if(jsfile.length <= 0) {
//         return console.log('[MÚSICA] Não consegui encontrar comandos.')
//     }

//     console.log(jsfile)
//     jsfile.forEach((f, i) => {
        
//         let props = require(`./music/${f}`);
//         console.log(`[MÚSICA] ${f} carregado.`)

//         client.commands.set(props.help.name, props);
//     })

// })


fs.readdir("./events/", (err, files) => {

    if (err) { console.error(err); }

    let jsfile = files.filter(f => f.split('.').pop() === 'js');
    if(jsfile.length <= 0) {
        return console.error(`[EVENTO] Não consegui encontrar eventos.`);
    }
    
    console.log(jsfile)
    jsfile.forEach((f, i) => {
    
        const event = require(`./events/${f}`);
        let eventName = f.split(".")[0];
        console.log(`[EVENTO] ${f} carregado.`)
      
        client.on(eventName, event.bind(null, client));

    })

})

//STREAMING = TRANSMITINDO
//LISTENING = OUVINDO
//PLAYING = JOGANDO
//WATCHING = ASSISTINDO

let status = [

    { name: `Comandos novinhos somente para meus users <3 [🌠]`, type: 'STREAMING', url: 'https://www.twitch.tv/frachzin_' },
    { name: `Atualizações Diárias [🎈]`, type: 'STREAMING', url: 'https://www.twitch.tv/frachzin_' },
    { name: `Ajude-nos doando para nós! [❤️]`, type: 'STREAMING', url: 'https://www.twitch.tv/frachzin_' },
    { name: `Hospedado e Atualizado com amor pelo querido Resettão [❤️]`, type: 'STREAMING', url: 'https://www.twitch.tv/frachzin_'},
    { name: `Fui feita com amor e carinho, pelo meus incriveis donos! [🔞]`, type: 'STREAMING', url: 'https://www.twitch.tv/frachzin_' }

];

client.on('ready', () => {

    moment.locale('pt-br')

    console.log(`[READY] Estou em ${client.guilds.size} servidores com ${client.users.size} usuarios`);

    let canall = client.channels.get('633782312709914634');
    if (!canall) return;

    mongoose.connect(config.database, { useNewUrlParser: true }, (err) => {
        if (err) return canall.send('<:EMOJI6:617554601637314561> **| Houve um erro no banco de dados ao fazer conexão com o bot.**')

    canall.send(`<:EMOJI20:620044911546335234> **| Data: ${moment().format("L")}**
    
<a:EMOJI42:626937938239946762> **| Lunnar Ligada!**

<:EMOJI58:626937936147120129> **| Total de membros: ${client.users.size}.**
<:EMOJI16:619883429533712395> **| Total de guilds: ${client.guilds.size}.**

<:EMOJI6:617554601637314561> **| O banco de dados foi conectado ao bot.**`)

    function setStatus() {

        let randomStatus = status[Math.floor(Math.random() * status.length)];
        client.user.setPresence({game: randomStatus});
  
    }
  
    setStatus();
    setInterval(() => setStatus(), 20000); //{1000/1s}\{10000/10s}\{100000/1m}
    setInterval(() => {client.channels.get('646449592610717707').setName(`『📜│${client.users.size} usuários 💖`);}, 500)
    setInterval(() => {client.channels.get('646450024875687996').setName(`『📜│${client.guilds.size} servidores 💖`);}, 500)

    setInterval(async() => {
        
        const usersDB = await database.Users.find({'doador': true})
        
        if(usersDB.length === 0) return;
        
        const toRemove = usersDB.filter(user => user.doadorTime <= Date.now())
        
        if(toRemove.length === 0) return;
        toRemove.forEach(async userDB => {
            
            userDB.doador = false;
            userDB.doadorTime = 0;

            userDB.save()

            if (client.guilds.get("633489586668175391").member(userDB)) {
                message.guild.members.get(message.author.id).removeRole("633782280904769563");
            }    

            if(client.users.get(userDB._id)) {
                
                let user = await client.users.get(userDB._id)
                user.send(`**<:error:561979426435497986> | Desculpe-me, mas seu tempo de doador terminou! Para adquirir novamente chame o Fraachz_#0001 no privado.**`)
            }
        })
    }, (5 * 60) * 1000)
   
    })
});

client.on('message', async msg => {
    
    let message = msg

    if(msg.channel.type === 'dm' || msg.author.bot) return;

        let user = await docDB({type: 1, content: msg.author})
        let server = await docDB({type: 2, content: msg.guild})

            
        // let emj = '<:EMOJI2:615343200151797782>';
        // let emj2 = '<:EMOJI:615343178433822756>';

        if(message.channel.id === "633782305454030858") {
    
            message.react("626937938239946762");
            message.react("626937938210586631");

    }

    if (server.flood) {
        antSpam({ message, map: mappedMessages }, server)
    }

    if (server.invite) {

        let invitesType = ['discord.gg/', 'discordapp.com/invite/', 'discord.me/']
            
        let invitesServer = await message.guild.fetchInvites()
        if(invitesType.some(type => message.content.includes(type)) && !invitesServer.some(invite => message.content.includes(invite)) && !message.member.hasPermission('ADMINISTRATOR') && !user.dono) {
                
            let inviteMsg = server.inviteMsg.replace(/{grupo}/g, message.guild.name).replace(/{user}/g, message.author).replace(/{nick}/g, message.author.tag);

            message.delete(100).catch(e => {})
                
            message.channel.send(inviteMsg).then(msg => msg.delete(7000))
        }
            
    }
    
    if(msg.content.includes(`<@${client.user.id}>`)) {
    
        let prefix = server.prefix;

        let embed = new Discord.RichEmbed()
    
            .setDescription(`
**🔨 | Meu prefix:**
**🔨 | "${prefix}"**

**🎯 | Para qualquer dúvida use:** 
**🎯 | "${prefix}ajuda"**

**⚙️ | Nosso site:**
**⚙️ | [Em breve](https://google.com/)**
            `)
            .setTimestamp(new(Date))
            .setColor("#2E9AFE")
            .setFooter(`Lunnar © Todos Direitos Reservados`)
    
            msg.channel.send(embed)
        }
        
        let messageArray = msg.content.split(' ')
        let cmd = messageArray[0]
        let args = messageArray.slice(1)
        if(!msg.content.startsWith(server.prefix)) return;

        let command = await docDB({type: 3, content: cmd.slice(server.prefix.length)});
        if (command.manu && !user.dono && !user.developer) {
        
            return message.channel.send(`**<:error:561979426435497986> | Desculpe-me, mas o comando executado está em manutenção preventiva.**`)

        }

        if (user.blacklist) {

            return message.channel.send(`**<:error:561979426435497986> | Desculpe-me, mas você está na minha lista negra, sendo assim, impossibilitando você de executar comandos.**`)

        }

        let commandFile = client.commands.get(cmd.slice(server.prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(server.prefix.length)))
        if(commandFile) commandFile.run({client, message, args, user, server, docDB})
})

function antSpam(options = {}, server) {
    if (options.map && !options.message.author.bot) {
        const getter = options.map.get(options.message.author.id)
        if (getter === options.message.content) {
            options.message.delete()

            let FloodMsg = server.floodMsg.replace(/{grupo}/g, options.message.guild.name).replace(/{user}/g, options.message.author).replace(/{nick}/g, options.message.author.tag);

            options.message.channel.send(FloodMsg).then(msg => msg.delete(3000))
        } else {
            options.map.set(options.message.author.id, options.message.content)
            setTimeout(() => {
                options.map.delete(options.message.author.id)
            }, 10000)
        }
    }
}

client.login(config.token)