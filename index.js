//Initialize Discord object
const GuildId = "VSpS1s5URK6vMQCB-XU5NQ"
const axios = require('axios')
const Discord = require('discord.js')
const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, Events, Partials } = require('discord.js')
const client = new Discord.Client(
    { 
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions],
        partials: [Partials.Message, Partials.Channel, Partials.Reaction]
    }
)
//Constants
const config = require('./config.json')
const messageEmbed = require('./utilities/messageEmbed.js').messageEmbed
const token = require("./config.json").DISCORD_TOKEN
const PREFIX = '!'

let KillEvents = []
let qualities = ["Normal", "Good", "Outstanding", "Excellent", "Masterpiece"]

//Called after login
client.on('ready', () => {
    console.log('SanctuaryBot is Online!')
    client.user.setActivity('Albion Online', {type: "Playing"}) //Not working?

    setInterval(() => GetGuildKills(client), 1000 * 60)
})

function GetGuildKills(client){
    axios.get("https://gameinfo-sgp.albiononline.com/api/gameinfo/events?guildId="+GuildId)
        .then((res) => {
            let data = res.data.filter(event => !KillEvents.includes(event.EventId))
            data.map(event => {
                KillEvents.push(event.EventId)
                let header = "[*"+event.Killer.GuildName+"*] __" + event.Killer.Name + "__ ("+event.Killer.AverageItemPower.toFixed(0)+")" + ' ⚔️ ' + "[*"+event.Victim.GuildName+"*] __" +  event.Victim.Name + "__ ("+event.Victim.AverageItemPower.toFixed(0)+")"
                let assists = event.Participants.filter(p => p.Name != event.Killer.Name).map(p => p.Name)
                client.channels.cache.get('1089130944939704391').send(messageEmbed(
                    header,
                    null,
                    "Assist: " + (event.Participants.filter(p => p.Name != event.Killer.Name).length > 0 ? assists : "none"),
                    [
                        {
                            name: "__" + event.Killer.Name + "__", 
                            value: '**Main Hand** - ' + (event.Killer.Equipment.MainHand ? event.Killer.Equipment.MainHand.Type + " | **Quality** - " + qualities[event.Killer.Equipment.MainHand.Quality] : "N/A") + '\n' + 
                                    '**Off Hand** - ' + (event.Killer.Equipment.OffHand ? event.Killer.Equipment.OffHand.Type + " | **Quality** - " + qualities[event.Killer.Equipment.OffHand.Quality] : "N/A") + '\n' + 
                                    '**Head** - ' + (event.Killer.Equipment.Head ? event.Killer.Equipment.Head.Type + " | **Quality** - " + qualities[event.Killer.Equipment.Head.Quality] : "N/A") + '\n' + 
                                    '**Armor** - ' + (event.Killer.Equipment.Armor ? event.Killer.Equipment.Armor.Type + " | **Quality** - " + qualities[event.Killer.Equipment.Armor.Quality] : "N/A") + '\n' + 
                                    '**Shoes** - ' + (event.Killer.Equipment.Shoes ? event.Killer.Equipment.Shoes.Type + " | **Quality** - " + qualities[event.Killer.Equipment.Shoes.Quality] : "N/A") + '\n' + 
                                    '**Bag** - ' + (event.Killer.Equipment.Bag ? event.Killer.Equipment.Bag.Type + " | **Quality** - " + qualities[event.Killer.Equipment.Bag.Quality] : "N/A") + '\n' + 
                                    '**Cape** - ' + (event.Killer.Equipment.Cape ? event.Killer.Equipment.Cape.Type + " | **Quality** - " + qualities[event.Killer.Equipment.Cape.Quality] : "N/A") + '\n' + 
                                    '**Mount** - ' + (event.Killer.Equipment.Mount ? event.Killer.Equipment.Mount.Type + " | **Quality** - " + qualities[event.Killer.Equipment.Mount.Quality] : "N/A") + '\n' + 
                                    '**Potion** - ' + (event.Killer.Equipment.Potion ? event.Killer.Equipment.Potion.Type + " | **Quality** - " + qualities[event.Killer.Equipment.Potion.Quality] : "N/A") + '\n' + 
                                    '**Food** - ' + (event.Killer.Equipment.Food ? event.Killer.Equipment.Food.Type + " | **Quality** - " + qualities[event.Killer.Equipment.Food.Quality] : "N/A")
                        },
                        {
                            name: "__" + event.Victim.Name + "__", 
                            value: '**Main Hand** - ' + (event.Victim.Equipment.MainHand ? event.Victim.Equipment.MainHand.Type + " | **Quality** - " + qualities[event.Victim.Equipment.MainHand.Quality] : "N/A") + '\n' + 
                                    '**Off Hand** - ' + (event.Victim.Equipment.OffHand ? event.Victim.Equipment.OffHand.Type + " | **Quality** - " + qualities[event.Victim.Equipment.OffHand.Quality] : "N/A") + '\n' + 
                                    '**Head** - ' + (event.Victim.Equipment.Head ? event.Victim.Equipment.Head.Type + " | **Quality** - " + qualities[event.Victim.Equipment.Head.Quality] : "N/A") + '\n' + 
                                    '**Armor** - ' + (event.Victim.Equipment.Armor ? event.Victim.Equipment.Armor.Type + " | **Quality** - " + qualities[event.Victim.Equipment.Armor.Quality] : "N/A") + '\n' + 
                                    '**Shoes** - ' + (event.Victim.Equipment.Shoes ? event.Victim.Equipment.Shoes.Type + " | **Quality** - " + qualities[event.Victim.Equipment.Shoes.Quality] : "N/A") + '\n' + 
                                    '**Bag** - ' + (event.Victim.Equipment.Bag ? event.Victim.Equipment.Bag.Type + " | **Quality** - " + qualities[event.Victim.Equipment.Bag.Quality] : "N/A") + '\n' + 
                                    '**Cape** - ' + (event.Victim.Equipment.Cape ? event.Victim.Equipment.Cape.Type + " | **Quality** - " + qualities[event.Victim.Equipment.Cape.Quality] : "N/A") + '\n' + 
                                    '**Mount** - ' + (event.Victim.Equipment.Mount ? event.Victim.Equipment.Mount.Type + " | **Quality** - " + qualities[event.Victim.Equipment.Mount.Quality] : "N/A") + '\n' + 
                                    '**Potion** - ' + (event.Victim.Equipment.Potion ? event.Victim.Equipment.Potion.Type + " | **Quality** - " + qualities[event.Victim.Equipment.Potion.Quality] : "N/A") + '\n' + 
                                    '**Food** - ' + (event.Victim.Equipment.Food ? event.Victim.Equipment.Food.Type + " | **Quality** - " + qualities[event.Victim.Equipment.Food.Quality] : "N/A")
                        }
                    ],
                    null
                ));
                
            })
        })
        .catch(err => console.log(err))
}

//On each message
client.on('messageCreate', (message) => {
    //Exit if not a command or message is from bot
    if(!message.content.startsWith(PREFIX) || message.author.bot) return
    
    //Process message
    const command = message.content.split(" ")[0].replace("!", "").toLowerCase() //Command after "!"
    const args = message.content.split(" ").slice(1) //Array of all words after command
    const nickname = message.guild.members.cache.map(member => { if(member.user.username == message.author.username) return member.nickname == null ? message.author.username : member.nickname}).toString().replace(/,/g, "")
    switch(command){
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