const {
    WebhookClient,
    AttachmentBuilder
} = require('discord.js');

const MessageEmbed = require('./MessageEmbed').MessageEmbed

exports.CreateDiscordAttachment = (data) => {
    return new AttachmentBuilder(data, {
        name: 'image.png'
    })
}

exports.CreateGuildPVPEmbed = (
    title, //Card title
    author, //Author of the card, i.e. {name: 'Mighty Albion Mob'}
    description, //Card description
    fields, //Fields in card, i.e. {name: 'Title1', value: 'Value for title 1'}, {name: 'Title2', value: 'Value for title 2'}
    footer //Bottom of card, i.e. {text: 'Mighty Albion Mob', iconURL: 'https://imgur.com/a/3jNXyuV'}
) => {
    return MessageEmbed(
        title, author, description, fields, footer
    )
}

exports.SendToDiscord = async (
    url, // webhook URL
    id, // this is a name for the author of the msg
    { files = [], embeds = [] }, // can be constructed with the above functions
    messageId = null // if you want to update a discord message, incl the ID
) => {
    const wh = new WebhookClient({
        id: id,
        url: url
    })

    if (messageId == null) {
        var message = await wh.send({
            embeds: embeds,
            files: files,
        })

        return message.id // this is the message ID that we can update later
    } else {
        var message = await wh.editMessage(messageId, {
            embeds: embeds,
            files: files,
        })
        return message.id
    }
}