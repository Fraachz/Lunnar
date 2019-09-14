const Discord = require('discord.js');
const config = require('./config.json');
const database = require('./mongodb.js');
const fs = require('fs');
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

    { name: `Me siga no twitter! @Fraachz_sz [🌠]`, type: 'STREAMING', url: 'https://www.twitch.tv/frachzin_' },
    { name: `Atualizações Diárias [🎈]`, type: 'STREAMING', url: 'https://www.twitch.tv/frachzin_' },
    { name: `Ajude-nos doando para nós! [❤️]`, type: 'STREAMING', url: 'https://www.twitch.tv/frachzin_' },
    { name: `Fui feita com amor e carinho, pelo meus incriveis donos! [🔞]`, type: 'STREAMING', url: 'https://www.twitch.tv/frachzin_' }

];

client.on('ready', () => {

    console.log( `Estou em ${client.guilds.size} servidores com ${client.users.size} usuarios` );

    function setStatus() {

        let randomStatus = status[Math.floor(Math.random() * status.length)];
        client.user.setPresence({game: randomStatus});
    }
  
    setStatus();
    setInterval(() => setStatus(), 20000); //{1000/1s}\{10000/10s}\{100000/1m}
    
});

client.on('message', async msg => {
  
    let message = msg

    if(msg.channel.type === 'dm' || msg.author.bot) return;
        
        let messageArray = msg.content.split(' ')
        let cmd = messageArray[0]
        let args = messageArray.slice(1)
        let user = await docDB({type: 1, content: msg.author})
        let server = await docDB({type: 2, content: msg.guild})
        if(!msg.content.startsWith(server.prefix)) return;

        let command = await docDB({type: 3, content: cmd.slice(server.prefix.length)});
        if (command.manu && !user.owner) {
        
            return message.channel.send(`**<:error:561979426435497986> | Desculpe-me, mas o comando executado está em manutenção preventiva.**`)

        }

        if (user.blacklist) {

            return message.channel.send(`**<:error:561979426435497986> | Desculpe-me, mas você está na minha lista negra, sendo assim, impossibilitando você de executar comandos.**`)

        }

        if (server.invite) {

                let invblock = ["discord.gg", "discord.me", "disc0rd.gg", "d1sc0rd.gg", "disc0rd.me", "d1sc0rd.me", "https://", "http://"]; // Array com as mensagens bloqueadas
                  let contem = false;
                  for (var i in invblock) {
                      if (message.content.toLowerCase().includes(invblock[i].toLowerCase())) contem = true; // Verifica se um dos itens do array está incluído na mensagem(ignora caixa alta e baixa)
                }
                
                  if(contem) {
                      message.delete(5000); // Deleta a mensagem em 5 seg
                
                            return message.channel.send(server.inviteMSG).then(msg => msg.delete(10000));
                                 
            }
            
        }


        let commandFile = client.commands.get(cmd.slice(server.prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(server.prefix.length)))
        if(commandFile) commandFile.run({client, message, args, user, server, docDB})
})

client.login(config.token)
