var express = require('express')
var app = express()
const axios = require('axios')
const cheerio = require('cheerio')
const mysql = require('mysql')
const Discord = require("discord.js")
const config = require("./config.json")
const configdb = require("./configdb.json")
const items = require("./items.json")

const con = mysql.createConnection(configdb)

con.connect((err) => {
    if(err){ console.log('Error connecting to db...', err); return; }
    console.log('Connection established!')
})

const client = new Discord.Client()
client.login(config.BOT_TOKEN)

const prefix = "!"

function trataArg(param) {
    param = param.replace("_", " ")
    for(key of Object.keys(items)) {
        if(items[key].name.toLowerCase() == param.toLowerCase()) return items[key]
    }
    return null
}

client.on("message", function(message) {
    if (message.author.bot) return
    if (!message.content.startsWith(prefix)) return
  
    const commandBody = message.content.slice(prefix.length)
    const args = commandBody.split(' ')
    const command = args.shift().toLowerCase()

    if(command === "alert") {
        if(args.length != 3) { message.reply("mano poe os argumentos certos ae"); return; }
        let item = trataArg(args[0])
        if(item == null) { message.reply("esse item não existe amigão"); return; }
        let alertType = args[1]
        let value = parseInt(args[2].replace(/,/g, ''))
        let operadores = ['<', '<=', '>', '>=', '==']

        if(operadores.indexOf(alertType) == -1)  { message.reply("esse operador não funciona aqui amigão"); return; }
        if(value < 0)  { message.reply("o valor tem que ser positivo amigão"); return; }

        const alert = { id_item: item.id, alert_type: alertType, value: value, id_channel: message.channel.id, id_message: message.id }
        con.query(
            'INSERT INTO `ge-price-alert-osrs` SET ?',
            alert,
            (err, res) => {
                if(err) throw err
                message.reply('alert criado para o item ' + item.name + ' para o preço ' + alertType + ' ' + value)
                console.log(`New alert added with ID: ${res.insertId}`)
            }
        )
        //checaItemGE()
    }
    if(command === "checa") {
        checaItemGE()
    }
})

checaItemGE()

function sendDiscordMessage(msg, id_channel) {
    client.channels.cache.get(id_channel).send(msg)
}

function criteriaMet(value1, operator, value2) {
    switch(operator) {
        case '<':
            return value1 < value2
        case '<=':
            return value1 <= value2
        case '>':
            return value1 > value2
        case '>=':
            return value1 >= value2
        case '==':
            return value1 == value2
        case '!=':
            return value1 != value2
        default:
            return false
    }
}

function checaItemGE() {
    con.query('SELECT * FROM `ge-price-alert-osrs` WHERE enviado="N"', (err, rows) => {
        if(err) throw err
        let i = 0
        rows.forEach(row => {
            setTimeout(() => {
                console.log("Procurando "+row.id_item);
                getJson(row.id_item).then((item) => {
                    if(criteriaMet(item.price, row.alert_type, row.value) == true) {
                        sendDiscordMessage(item.name + " está custando " + item.price, row.id_channel)
                        con.query('UPDATE `ge-price-alert-osrs` SET enviado = ? WHERE ID = ?', ['S', row.id],
                            (err, res) => {
                                if(err) throw err
                                //console.log('Changed ', result)
                            }
                        )
                        console.log("Mensagem enviada para o alerta " + row.id)
                    }
                })
            }, 1000 * i)
            i += 10
        })
    })
}

const getJson = async (id) => {
    try {
        const { data } = await axios.get(
            'https://secure.runescape.com/m=itemdb_oldschool/viewitem?obj='+id,
            { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0' } }
        )
        const $ = cheerio.load(data)
        const jsonRes = {}
        $('.item-description > h2:nth-child(1)').each((_idx, el) => {
            jsonRes.name = $(el).text()
        })

        $('.stats > h3:nth-child(1) > span:nth-child(1)').each((_idx, el) => {
            jsonRes.price = parseInt($(el).attr("title").replace(/,/g, ''))
        })
    console.log(jsonRes)
        return jsonRes;
    } catch (err) { throw err }
}