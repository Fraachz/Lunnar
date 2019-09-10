const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('./config.json')

mongoose.connect(config.database, { useNewUrlParser: true }, (err) => {
  if (err) return console.log('[Banco De Dados] Houve um erro no banco de dados ao fazer conexão com o bot.')
  console.log('[Banco De Dados] O banco de dados foi conectado ao bot.')
})

const User = new Schema({
    _id: {
        type: String
    },

    empresa: {
        type: Boolean,
        default: false
    },

    workedDays: {
        type: Number,
        default: 0
    },
    
    empresaName: {
        type: String
    },

    xp: {
        type: Number,
        default: 0
    },
    
    level: {
        type: Number,
        default: 0
    },

    coins: {
        type: Number,
        default: 0
    },

    lastPayment: {
        type: String,
        default: '0000000000000'
    },
    
    blacklist: {
        type: Boolean,
        default: false
    },

    dono: {
        type: Boolean,
        default: false
    },

    doador: {
        type: Boolean,
        default: false
    },
    
    emblemas: Array,

    staff: {
        type: Boolean,
        default: false
    },

    developer: {
        type: Boolean,
        default: false

    },

    warn: {
        type: String,
        default: '0'
    },

    bank: {
        type: Number,
        default: 0
    }

})

const Guild = new Schema({
    _id: {
        type: String
    },

    prefix: {
        type: String,
        default: 'l!!'
    },

    invite: {
        type: Boolean,
        default: false
    },
    
    captcha: {
        type: Boolean,
        default: false
    },

    logs: {
        type: Boolean,
        default: false

    },

    sobre: {
        type: String,
        default: '**<:EMOJI2:615343200151797782> | O servidor não possui um sobre. (Use l!!servidor para setar o sobre.)**'

    },

    welcome: {
        type: Boolean,
        default: false
    },

    exit: {
        type: Boolean,
        default: false
    },

    welcomeOn: {
        type: String
    },

    welcomeMsg: {
        type: String,
        default: "**<:EMOJI2:615343200151797782> | A mensagem de entrada ainda não foi setada.**"
    },

    welcomeCanal: {
        type: String,
        default: "**<:EMOJI2:615343200151797782> | O canal de entrada ainda não foi setado.**"
    },

    welcomeRole: {
        type: String,
        default: "**<:EMOJI2:615343200151797782> | O cargo de entrada ainda não foi setado.**"
    },
    
    welcomeEmbed: {
        type: Boolean,
        default: false
    },

    exitOn: {
        type: String
    },

    exitMsg: {
        type: String,
        default: "**<:EMOJI2:615343200151797782> | A mensagem de saída ainda não foi setada.**"
    },

    exitCanal: {
        type: String,
        default: "**<:EMOJI2:615343200151797782> | O canal de saída ainda não foi setado.**"
    },

    exitEmbed: {
        type: Boolean,
        default: false
    },
})

const Command = new Schema({

    _id: {
        type: String
    },

    manu: {
        type: Boolean,
        default: false
    }

})


const Empresa = new Schema({

    _id: {
        type: String
    },

    lower: {
        type: String
    },

    coins: {
        type: Number,
        default: 0
    },

    dono: {
        type: String
    },

    tag: {
        type: String
    },

    gerentes: {
        type: Array,
        default: []
    },

    funcionarios: {
        type: Array,
        default: []
    },

    lastPayment: {
        type: Number,
        default: 0
    }

})

var Users = mongoose.model('Users', User);
var Guilds = mongoose.model('Guilds', Guild);
var Commands = mongoose.model('Commands', Command);
var Empresas = mongoose.model('Empresas', Empresa);

exports.Users = Users;
exports.Guilds = Guilds;
exports.Commands = Commands;
exports.Empresas = Empresas;