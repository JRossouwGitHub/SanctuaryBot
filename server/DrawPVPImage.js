const { createCanvas, loadImage } = require('canvas')

exports.DrawImage = async (sources) => {
    let canvas
    let ctx

    switch (true) {
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
        if ([9, 18, 27, 36].includes(index)) {
            inventoryX = 20
            inventoryY += 135
        }

        locations.push(
            { x: inventoryX, y: inventoryY, w: 135, h: 135, src: "https://render.albiononline.com/v1/item/" + item.Type + "?quality=" + item.Quality }
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

    drawText(ctx, sources)

    return canvas.toBuffer()
}

function drawText(ctx, sources) {
    ctx.font = "30px Arial";
    ctx.fillText(sources.killer.Name, 30, 70);
    ctx.fillText(sources.victim.Name, 745, 70);
    ctx.fillText(sources.event.fame.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), 550, 185);
    ctx.fillText(sources.event.date, 520, 400);
    ctx.fillText(sources.event.time, 555, 435);


    ctx.font = "bold 18px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";

    let inventoryX = 20
    let inventoryY = 655

    let locations = [
        { x: 45, y: 240, count: sources.killer.MainHand != "blank.png" ? 1 : null }, // Killer MainHand
        { x: 305, y: 240, count: sources.killer.OffHand != "blank.png" ? 1 : null }, // Killer OffHand
        { x: 175, y: 125, count: sources.killer.Head != "blank.png" ? 1 : null }, // Killer Head
        { x: 175, y: 240, count: sources.killer.Armor != "blank.png" ? 1 : null }, // Killer Armor
        { x: 175, y: 350, count: sources.killer.Shoes != "blank.png" ? 1 : null }, // Killer Shoes
        { x: 20, y: 115, count: sources.killer.Bag != "blank.png" ? 1 : null }, // Killer Bag
        { x: 325, y: 115, count: sources.killer.Cape != "blank.png" ? 1 : null }, // Killer Cape
        { x: 175, y: 465, count: sources.killer.Mount != "blank.png" ? 1 : null }, // Killer Mount
        { x: 20, y: 365, count: sources.killer.Potion != "blank.png" ? sources.killer.PotionCount : null }, // Killer Potion
        { x: 325, y: 365, count: sources.killer.Food != "blank.png" ? sources.killer.FoodCount : null }, // Killer Food
        { x: 760, y: 240, count: sources.victim.MainHand != "blank.png" ? 1 : null }, // Victim MainHand
        { x: 1020, y: 240, count: sources.victim.OffHand != "blank.png" ? 1 : null }, // Victim OffHand
        { x: 890, y: 125, count: sources.victim.Head != "blank.png" ? 1 : null }, // Victim Head
        { x: 890, y: 240, count: sources.victim.Armor != "blank.png" ? 1 : null }, // Victim Armor
        { x: 890, y: 350, count: sources.victim.Shoes != "blank.png" ? 1 : null }, // Victim Shoes
        { x: 735, y: 115, count: sources.victim.Bag != "blank.png" ? 1 : null }, // Victim Bag
        { x: 1040, y: 115, count: sources.victim.Cape != "blank.png" ? 1 : null }, // Victim Cape
        { x: 890, y: 465, count: sources.victim.Mount != "blank.png" ? 1 : null }, // Victim Mount
        { x: 735, y: 365, count: sources.victim.Potion != "blank.png" ? sources.victim.PotionCount : null }, // Victim Potion
        { x: 1040, y: 365, count: sources.victim.Food != "blank.png" ? sources.victim.FoodCount : null }, // Victim Food
    ]

    locations.map(item => {
        if (item.count) {
            let countOffsetX = 103 - item.count.toString().length
            let countOffsetY = 107
            ctx.fillText(item.count, item.x + countOffsetX, item.y + countOffsetY);
        }
    })

    sources.inventory.items.map((item, index) => {
        if ([9, 18, 27, 36].includes(index)) {
            inventoryX = 20
            inventoryY += 135
        }

        let countOffsetX = 103 - item.Count.toString().length
        let countOffsetY = 107

        ctx.fillText(item.Count, inventoryX + countOffsetX, inventoryY + countOffsetY);

        inventoryX += 130
    })
}