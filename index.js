//Initialize Discord object
const GuildId = "VSpS1s5URK6vMQCB-XU5NQ"
const { rejects } = require('assert')
const axios = require('axios')
const { debug } = require('console')
const Discord = require('discord.js')
const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, Events, Partials, AttachmentBuilder, ActivityType } = require('discord.js')
const client = new Discord.Client(
    {
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions],
        partials: [Partials.Message, Partials.Channel, Partials.Reaction]
    }
)
//Constants
const fs = require("fs");
const { resolve } = require('path')
const path = require('path');
const config = require('./config.json')
const messageEmbed = require('./utilities/messageEmbed.js').messageEmbed
const helpers = require('./utilities/helpers.js')

const token = config.DISCORD_TOKEN
const PORT = config.PORT
const ChannelID = config.CHANNEL_ID
const PREFIX = '!'

let LastEvent = 0

//Called after login
client.on('ready', () => {
    console.log('SanctuaryBot is Online!')
    client.user.setPresence({
        activities: [{ name: `Albion Online East`, type: ActivityType.Playing }],
    })

    setInterval(() => {
        let storage = fs.readFileSync("./storage.json", (e) => {
            console.log(e)
        })

        LastEvent = JSON.parse(storage.toString()).EventId
        GetGuildKills(client)
    }, 1000 * 10)
})

function GetGuildKills(client) {
    axios.get("https://gameinfo-sgp.albiononline.com/api/gameinfo/events?limit=50&offset=0")
        .then((res) => {
            let data = res.data.filter(event => event.EventId > LastEvent && (event.Killer.GuildId == GuildId || event.Victim.GuildId == GuildId))
            data = data.sort((a, b) => { return (a.TimeStamp < b.TimeStamp ? -1 : 1) })
            data.length = 1
            data.map(event => {
                var [header, assists, data] = helpers.GetAllDataFromEvent(event)
                axios.get(`http://localhost:${PORT}/image`, {
                    responseType: 'arraybuffer',
                    data: data
                })
                    .then(async (response) => {
                        await client.channels.cache.get(ChannelID).send(
                            messageEmbed(
                                header,
                                null,
                                "Assist:" + (assists.length > 0 ? assists.map(p => " " + p.Name) : " none"),
                                { name: 'Details', value: 'See image below' },
                                null
                            )
                        );
                        await client.channels.cache.get(ChannelID).send({
                            embeds: [],
                            files: [{
                                attachment: response.data,
                                name: 'image.png'
                            }]
                        })
                    })

                    .catch(err => console.log(err))
            })
        })
        .catch(err => console.log(err))
}

//On each message
client.on('messageCreate', (message) => {
    //Exit if not a command or message is from bot
    if (!message.content.startsWith(PREFIX) || message.author.bot) return

    //Process message
    const command = message.content.split(" ")[0].replace("!", "").toLowerCase() //Command after "!"
    const args = message.content.split(" ").slice(1) //Array of all words after command
    const nickname = message.guild.members.cache.map(member => { if (member.user.username == message.author.username) return member.nickname == null ? message.author.username : member.nickname }).toString().replace(/,/g, "")
    switch (command) {
        case "ping":
            message.channel.send("pong!")
            break;
        default:
            message.channel.send("Sorry, I did not recognize that command.")
            break;
    }
})

client.on(Events.MessageReactionAdd, async (reaction, user) => {
    //Handle reacts
});

//Login bot
client.login(token)