//Initialize Discord object
const Discord = require('discord.js')
const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, Events, Partials, AttachmentBuilder, ActivityType } = require('discord.js')
const client = new Discord.Client(
    {
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions],
        partials: [Partials.Message, Partials.Channel, Partials.Reaction]
    }
)
//Constants
const config = require('./config.json')
const token = config.DISCORD.DISCORD_TOKEN
const PREFIX = config.DISCORD.PREFIX

//Called after login
client.on('ready', () => {
    console.log('SanctuaryBot is Online!')
    client.user.setPresence({
        activities: [{ name: `Albion Online East`, type: ActivityType.Playing }],
    })
})



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