const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser')
const fs = require("fs");
const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(1200, 596)
const ctx = canvas.getContext('2d')

app.use(bodyParser.json())

function drawText(sources){
    ctx.font = "30px Arial";
    ctx.fillText(sources.killer.Name, 30, 70);

    ctx.font = "30px Arial";
    ctx.fillText(sources.victim.Name, 745, 70);

    ctx.font = "30px Arial";
    ctx.fillText(sources.event.fame.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), 550, 185);

    ctx.font = "30px Arial";
    ctx.fillText(sources.event.date, 525, 400);
    ctx.font = "30px Arial";
    ctx.fillText(sources.event.time, 560, 435);
}

function drawImage(sources){
    let locations = [
        {x: 0, y: 0, w: 1200, h: 596, src: "background.png"},
        {x: 45, y: 240, w: 135, h: 135, src: sources.killer.MainHand}, // Killer MainHand
        {x: 305, y: 240, w: 135, h: 135, src: sources.killer.OffHand}, // Killer OffHand
        {x: 175, y: 125, w: 135, h: 135, src: sources.killer.Head}, // Killer Head
        {x: 175, y: 240, w: 135, h: 135, src: sources.killer.Armor}, // Killer Armor
        {x: 175, y: 350, w: 135, h: 135, src: sources.killer.Shoes}, // Killer Shoes
        {x: 20, y: 115, w: 135, h: 135, src: sources.killer.Bag}, // Killer Bag
        {x: 325, y: 115, w: 135, h: 135, src: sources.killer.Cape}, // Killer Cape
        {x: 175, y: 465, w: 135, h: 135, src: sources.killer.Mount}, // Killer Mount
        {x: 325, y: 365, w: 135, h: 135, src: sources.killer.Potion}, // Killer Potion
        {x: 20, y: 365, w: 135, h: 135, src: sources.killer.Food}, // Killer Food
        {x: 760, y: 240, w: 135, h: 135, src: sources.victim.MainHand}, // Victim MainHand
        {x: 1020, y: 240, w: 135, h: 135, src: sources.victim.OffHand}, // Victim OffHand
        {x: 890, y: 125, w: 135, h: 135, src: sources.victim.Head}, // Victim Head
        {x: 890, y: 240, w: 135, h: 135, src: sources.victim.Armor}, // Victim Armor
        {x: 890, y: 350, w: 135, h: 135, src: sources.victim.Shoes}, // Victim Shoes
        {x: 735, y: 115, w: 135, h: 135, src: sources.victim.Bag}, // Victim Bag
        {x: 1040, y: 115, w: 135, h: 135, src: sources.victim.Cape}, // Victim Cape
        {x: 890, y: 465, w: 135, h: 135, src: sources.victim.Mount}, // Victim Mount
        {x: 1040, y: 365, w: 135, h: 135, src: sources.victim.Potion}, // Victim Potion
        {x: 735, y: 365, w: 135, h: 135, src: sources.victim.Food}, // Victim Food
    ]
    
    locations.map((l, index) => {
        loadImage(l.src).then((image) => {
            drawText(sources)
            ctx.drawImage(image, l.x, l.y, l.w, l.h) 
            const buffer = canvas.toBuffer("image/png");
            if (fs.existsSync(__dirname + '/image.png')) {
                fs.unlinkSync(__dirname + '/image.png', (err) => { console.log(err)});
            }
            fs.writeFileSync("./image.png", buffer);
        })
    })
}

app.get('/', (req, res) => {
    res.send('Server is running.')
})

app.get('/image', (req, res) => {
    drawImage(req.body)
    res.json({message: "Image generated."})
})
  
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})