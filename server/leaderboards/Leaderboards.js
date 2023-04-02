const fs = require("fs");
const axios = require('axios')
const path = require('path');

const config = require("../../config.json");
const webhookUrl = config.COMMON.LEADERBOARD_WEBHOOK_URL;

const DrawImage = require('./DrawLeaderboardImage')
const DiscordHelper = require('../../utilities/DiscordHelper')

const biggestKillKey = "biggestKillMessageId"

const topInRangeUrl = (range) => `https://gameinfo-sgp.albiononline.com/api/gameinfo/guilds/VSpS1s5URK6vMQCB-XU5NQ/top?range=${range}&limit=15&region=total`


process.on('message', async (message) => {
    console.log(`Worker thread: ${path.basename(__filename)} \nExecuting message: ${message.action}` )
    await setInterval(async () => {
        try {
            await GetAndUpdateLeaderboard()
        } catch (err) {
            console.log(err)
        }
    }, 1000 * 60 * 5) // every 5 mins
})

const GetAndUpdateLeaderboard = async () => {
    var ranges = [
        {queryParam: "day", display: "Daily"},
        {queryParam: "week", display: "Weekly"},
        {queryParam: "month", display: "Monthly"},
    ]
    await Promise.all(
        ranges.map(async (range, index) => {
            var res = await axios.get(topInRangeUrl(range.queryParam))
            ranges[index].data = res.data
        })
    )

    var image = await DrawImage.Draw(ranges)
    var file = DiscordHelper.CreateDiscordAttachment(image)
    
    var messageId = GetMessageId(biggestKillKey)

    var _messageId = await DiscordHelper.SendToDiscord(
        webhookUrl,
        "",
        { files: [file], embeds: [] },
        messageId
    )
    
    if (messageId != _messageId) {
        SetMessageId(biggestKillKey, _messageId)
    }
}

const GetMessageId = (key) => {
    let storage = fs.readFileSync(__dirname + "\\storage.json")
    var message = JSON.parse(storage.toString())
    return message?.[GetWebhookKey(webhookUrl)]?.[key] ?? null
}

const SetMessageId = (key, id) => {
    var data = {[GetWebhookKey(webhookUrl)]: {[key]: id}}
    fs.writeFileSync(__dirname + "\\storage.json", JSON.stringify(data), 'utf8')
}

const GetWebhookKey = (wh) => wh.split("/").slice(-2).join("/")