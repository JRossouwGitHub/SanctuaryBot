const express = require('express')
const app = express()
const PORT = require("./config.json").PORT;
const bodyParser = require('body-parser')
const fs = require("fs");
const { createCanvas, loadImage } = require('canvas')

let canvas
let ctx

app.use(bodyParser.json())

function drawText(sources) {
    ctx.font = "30px Arial";
    ctx.fillText(sources.killer.Name, 30, 70);

    ctx.font = "30px Arial";
    ctx.fillText(sources.victim.Name, 745, 70);

    ctx.font = "30px Arial";
    ctx.fillText(sources.event.fame.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), 550, 185);

    ctx.font = "30px Arial";
    ctx.fillText(sources.event.date, 520, 400);
    ctx.font = "30px Arial";
    ctx.fillText(sources.event.time, 555, 435);
}

const drawImage = async (sources) => {
    switch(true){
        case sources.background.includes("1"):
            canvas = createCanvas(1200, 800)
            break;
        case sources.background.includes("2"):
            canvas = createCanvas(1200, 930)
            break;
        case sources.background.includes("3"):
            canvas = createCanvas(1200, 1060)
            break;
        case sources.background.includes("4"):
            canvas = createCanvas(1200, 1190)
            break;
        case sources.background.includes("5"):
            canvas = createCanvas(1200, 1341)
            break;
        default:
            canvas = createCanvas(1200, 596)
    }

    ctx = canvas.getContext('2d')

    let locations = [
        { x: 0, y: 0, w: 1200, h: canvas.height, src: sources.background },
        { x: 45, y: 240, w: 135, h: 135, src: sources.killer.MainHand }, // Killer MainHand
        { x: 305, y: 240, w: 135, h: 135, src: sources.killer.OffHand }, // Killer OffHand
        { x: 175, y: 125, w: 135, h: 135, src: sources.killer.Head }, // Killer Head
        { x: 175, y: 240, w: 135, h: 135, src: sources.killer.Armor }, // Killer Armor
        { x: 175, y: 350, w: 135, h: 135, src: sources.killer.Shoes }, // Killer Shoes
        { x: 20, y: 115, w: 135, h: 135, src: sources.killer.Bag }, // Killer Bag
        { x: 325, y: 115, w: 135, h: 135, src: sources.killer.Cape }, // Killer Cape
        { x: 175, y: 465, w: 135, h: 135, src: sources.killer.Mount }, // Killer Mount
        { x: 20, y: 365, w: 135, h: 135, src: sources.killer.Potion }, // Killer Potion
        { x: 325, y: 365, w: 135, h: 135, src: sources.killer.Food }, // Killer Food
        { x: 760, y: 240, w: 135, h: 135, src: sources.victim.MainHand }, // Victim MainHand
        { x: 1020, y: 240, w: 135, h: 135, src: sources.victim.OffHand }, // Victim OffHand
        { x: 890, y: 125, w: 135, h: 135, src: sources.victim.Head }, // Victim Head
        { x: 890, y: 240, w: 135, h: 135, src: sources.victim.Armor }, // Victim Armor
        { x: 890, y: 350, w: 135, h: 135, src: sources.victim.Shoes }, // Victim Shoes
        { x: 735, y: 115, w: 135, h: 135, src: sources.victim.Bag }, // Victim Bag
        { x: 1040, y: 115, w: 135, h: 135, src: sources.victim.Cape }, // Victim Cape
        { x: 890, y: 465, w: 135, h: 135, src: sources.victim.Mount }, // Victim Mount
        { x: 735, y: 365, w: 135, h: 135, src: sources.victim.Potion }, // Victim Potion
        { x: 1040, y: 365, w: 135, h: 135, src: sources.victim.Food }, // Victim Food
    ]

    let inventoryX = 20
    let inventoryY = 655

    sources.inventory.items.map((item, index) => {
        if([9, 18, 27, 36].includes(index)){
            inventoryX = 20
            inventoryY += 135
        }

        locations.push(
            { x: inventoryX, y: inventoryY, w: 135, h: 135, src: "https://render.albiononline.com/v1/item/" + item.Type + "?quality=" + item.Quality}
        )

        inventoryX += 130      
    })

    await Promise.all(
        locations.map(async (location) => {
            try {
                var img = await loadImage(location.src);
                ctx.drawImage(img, location.x, location.y, location.w, location.h);
            } catch (error) {
                console.error(`Error loading image '${location.src}':`, error);
            }
        })
    );

    drawText(sources)

    return canvas.toBuffer()
}

app.get('/', (req, res) => {
    res.send('Server is running.')
})

app.get('/image', async (req, res) => {
    var img = await drawImage(req.body)

    res.set('Content-Type', 'image/png');
    res.set('Content-Length', img.length);

    res.send(img)
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})