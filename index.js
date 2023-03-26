//Initialize Discord object
const GuildId = "VSpS1s5URK6vMQCB-XU5NQ"
const axios = require('axios')
const Discord = require('discord.js')
const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, Events, Partials, AttachmentBuilder } = require('discord.js')
const client = new Discord.Client(
    { 
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions],
        partials: [Partials.Message, Partials.Channel, Partials.Reaction]
    }
)
//Constants
const fs = require("fs");
const path = require('path');
const config = require('./config.json')
const messageEmbed = require('./utilities/messageEmbed.js').messageEmbed
const token = require("./config.json").DISCORD_TOKEN
const PREFIX = '!'
let LastEvent = 0

//Called after login
client.on('ready', () => {
    console.log('SanctuaryBot is Online!')
    client.user.setActivity('Albion Online', {type: "Playing"}) //Not working?

    setInterval(() => GetGuildKills(client), 1000 * 10)
})

function GetGuildKills(client){
    axios.get("https://gameinfo-sgp.albiononline.com/api/gameinfo/events?guildId="+GuildId)
        .then((res) => {
            let data = res.data.filter(event => event.EventId > LastEvent)
            data = data.sort((a,b) => {return  (a.TimeStamp < b.TimeStamp ? -1 : 1)})
            data.length = 1
            data.map(event => {
                let d = new Date(event.TimeStamp)
                LastEvent = event.EventId
                let header = "[*"+event.Killer.GuildName+"*] __" + event.Killer.Name + "__ ("+event.Killer.AverageItemPower.toFixed(0)+")" + ' ⚔️ ' + "[*"+event.Victim.GuildName+"*] __" +  event.Victim.Name + "__ ("+event.Victim.AverageItemPower.toFixed(0)+")"
                let assists = event.Participants.filter(p => p.Name != event.Killer.Name).map(p => p.Name)
                axios.get("http://localhost:3000/image", {
                    data: {
                        background: "background.png",
                        killer: {
                            Name: "["+event.Killer.GuildName+"] " + event.Killer.Name + " ("+event.Killer.AverageItemPower.toFixed(0)+")",
                            MainHand: (event.Killer.Equipment.MainHand ? "https://render.albiononline.com/v1/item/"+event.Killer.Equipment.MainHand.Type+"?quality="+event.Killer.Equipment.MainHand.Quality : "blank.png"),
                            OffHand: (event.Killer.Equipment.OffHand ? "https://render.albiononline.com/v1/item/"+event.Killer.Equipment.OffHand.Type+"?quality="+event.Killer.Equipment.OffHand.Quality : "blank.png"),
                            Head: (event.Killer.Equipment.Head ? "https://render.albiononline.com/v1/item/"+event.Killer.Equipment.Head.Type+"?quality="+event.Killer.Equipment.Head.Quality : "blank.png"),
                            Armor: (event.Killer.Equipment.Armor ? "https://render.albiononline.com/v1/item/"+event.Killer.Equipment.Armor.Type+"?quality="+event.Killer.Equipment.Armor.Quality : "blank.png"),
                            Shoes: (event.Killer.Equipment.Shoes ? "https://render.albiononline.com/v1/item/"+event.Killer.Equipment.Shoes.Type+"?quality="+event.Killer.Equipment.Shoes.Quality : "blank.png"),
                            Bag: (event.Killer.Equipment.Bag ? "https://render.albiononline.com/v1/item/"+event.Killer.Equipment.Bag.Type+"?quality="+event.Killer.Equipment.Bag.Quality : "blank.png"),
                            Cape: (event.Killer.Equipment.Cape ? "https://render.albiononline.com/v1/item/"+event.Killer.Equipment.Cape.Type+"?quality="+event.Killer.Equipment.Cape.Quality : "blank.png"),
                            Mount: (event.Killer.Equipment.Mount ? "https://render.albiononline.com/v1/item/"+event.Killer.Equipment.Mount.Type+"?quality="+event.Killer.Equipment.Mount.Quality : "blank.png"),
                            Potion: (event.Killer.Equipment.Potion ? "https://render.albiononline.com/v1/item/"+event.Killer.Equipment.Potion.Type+"?quality="+event.Killer.Equipment.Potion.Quality : "blank.png"),
                            Food: (event.Killer.Equipment.Food ? "https://render.albiononline.com/v1/item/"+event.Killer.Equipment.Food.Type+"?quality="+event.Killer.Equipment.Food.Quality : "blank.png"),
                        },
                        victim: {
                            Name: "["+event.Victim.GuildName+"] " + event.Victim.Name + " ("+event.Victim.AverageItemPower.toFixed(0)+")",
                            MainHand: (event.Victim.Equipment.MainHand ? "https://render.albiononline.com/v1/item/"+event.Victim.Equipment.MainHand.Type+"?quality="+event.Victim.Equipment.MainHand.Quality : "blank.png"),
                            OffHand: (event.Victim.Equipment.OffHand ? "https://render.albiononline.com/v1/item/"+event.Victim.Equipment.OffHand.Type+"?quality="+event.Victim.Equipment.OffHand.Quality : "blank.png"),
                            Head: (event.Victim.Equipment.Head ? "https://render.albiononline.com/v1/item/"+event.Victim.Equipment.Head.Type+"?quality="+event.Victim.Equipment.Head.Quality : "blank.png"),
                            Armor: (event.Victim.Equipment.Armor ? "https://render.albiononline.com/v1/item/"+event.Victim.Equipment.Armor.Type+"?quality="+event.Victim.Equipment.Armor.Quality : "blank.png"),
                            Shoes: (event.Victim.Equipment.Shoes ? "https://render.albiononline.com/v1/item/"+event.Victim.Equipment.Shoes.Type+"?quality="+event.Victim.Equipment.Shoes.Quality : "blank.png"),
                            Bag: (event.Victim.Equipment.Bag ? "https://render.albiononline.com/v1/item/"+event.Victim.Equipment.Bag.Type+"?quality="+event.Victim.Equipment.Bag.Quality : "blank.png"),
                            Cape: (event.Victim.Equipment.Cape ? "https://render.albiononline.com/v1/item/"+event.Victim.Equipment.Cape.Type+"?quality="+event.Victim.Equipment.Cape.Quality : "blank.png"),
                            Mount: (event.Victim.Equipment.Mount ? "https://render.albiononline.com/v1/item/"+event.Victim.Equipment.Mount.Type+"?quality="+event.Victim.Equipment.Mount.Quality : "blank.png"),
                            Potion: (event.Victim.Equipment.Potion ? "https://render.albiononline.com/v1/item/"+event.Victim.Equipment.Potion.Type+"?quality="+event.Victim.Equipment.Potion.Quality : "blank.png"),
                            Food: (event.Victim.Equipment.Food ? "https://render.albiononline.com/v1/item/"+event.Victim.Equipment.Food.Type+"?quality="+event.Victim.Equipment.Food.Quality : "blank.png"),
                        },
                        event: {
                            date: d.getFullYear() + "/" + ((d.getMonth() + 1) < 10 ? ("0" + (d.getMonth() + 1)) : (d.getMonth() + 1)) + "/" + (d.getDate() < 10 ? ("0"+d.getDate()) : d.getDate()),
                            time: (d.getHours() < 10 ? ("0"+d.getHours()) : d.getHours()) + ":" + (d.getMinutes() < 10 ? ("0" + d.getMinutes()) : d.getMinutes()),
                            fame: event.TotalVictimKillFame
                        }
                    }
                })
                    .then(res => {
                        //console.log(res)
                    })
                    .then(data => {
                        client.channels.cache.get('1089130944939704391').send(messageEmbed(
                            header,
                            null,
                            "Assist: " + (event.Participants.filter(p => p.Name != event.Killer.Name).length > 0 ? assists : "none"),
                            {name: 'Details', value: 'See image below'},
                            null
                        ));
                        setTimeout(() => {
                            const image = new AttachmentBuilder('image.png');
                            client.channels.cache.get('1089130944939704391').send({embeds: [], files: [image]})
                        }, 1000 * 3)
                    })
                    .catch(err => console.log(err))
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