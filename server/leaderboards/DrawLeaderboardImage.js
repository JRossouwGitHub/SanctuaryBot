const { createCanvas, loadImage } = require('canvas')

const albionIcons = "https://assets.albiononline.com/assets/images/killboard/fame-list__icons.png"

const canvasWidth = 1200
const gap = 100
const totalSections = 3
const sectionWidth = (canvasWidth - ((totalSections + 1) *gap)) / (totalSections)

exports.Draw = async (data) => {
    let canvas = createCanvas(canvasWidth, 600);
    let ctx = canvas.getContext('2d')

    await drawBackground(ctx, canvas);
    await drawTitleWithImage(ctx)


    data.map((d, i) => {
        drawSection(d, ctx, i)
    })

    return canvas.toBuffer();
}

const drawTitleWithImage = async (ctx) => {
    ctx.font = "45px Arial";
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'black';

    var title = "Biggest Kills"
    var fameIcon = await loadImage(albionIcons)

    const imgwidth = 50
    const padding = 20
    const textWidth = ctx.measureText(title).width;

    const textAndImageWidth = textWidth + padding + imgwidth

    const text_x = ((canvasWidth - textAndImageWidth) / 2);
    const img_x = text_x + textWidth + padding
    const text_y = 65;
    const img_y = text_y - 40

    ctx.drawImage(fameIcon, 0, 0, 100, 100, img_x, img_y, 50, 50);
    ctx.fillText(title, text_x, text_y);
}

const drawBackground = async (ctx, canvas) => {
    ctx.globalAlpha = 1;  // set the opacity level
    ctx.fillStyle = '#cdae91';
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    var bg = await loadImage(__dirname + '\\images\\bg.png')
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)
}

const drawSection = (data, ctx, index) => {
    var sectionHeight = 470

    var x_offset = (gap * (index + 1)) + (sectionWidth * index)

    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 10;

    // draw card for names
    ctx.fillStyle = '#cdae91';
    ctx.fillRect(x_offset, gap, sectionWidth, sectionHeight)
    ctx.shadowColor = 'transparent';

    drawSectionTitle(ctx, data.display, x_offset, gap, sectionWidth)

    drawSectionRecords(ctx, data.data, x_offset, gap + 105)    
}


const drawSectionTitle = (ctx, title, x, y, sectionWidth) => {
    ctx.font = "35px Arial";
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'black';
    
    var text = title
    const textSize = ctx.measureText(text);

    const text_x = x + ((sectionWidth - textSize.width) / 2);
    const text_y = y + 50;

    ctx.fillText(text, text_x, text_y);

    var centerX = x + (sectionWidth / 2)
    var lineY = text_y + 20

    ctx.beginPath();
    ctx.moveTo(centerX - 100, lineY);
    ctx.lineTo(centerX + 100, lineY);
    ctx.stroke();
}

const drawSectionRecords = (ctx, data, x, y) => {
    data.map((record, i) => {
        var row_y = y + (i * 25);
        var name = record.Killer.Name
        var fame = record.TotalVictimKillFame.toLocaleString()
        drawRow(ctx, name, fame, x, row_y)
    })
}

const drawRow = (ctx, name, fame, x, y) => {
    ctx.font = "20px Arial";
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'black';

    var x_padding = 20
    var text_x = x + x_padding

    const fameWidth = ctx.measureText(fame).width;
    var fameX = x + sectionWidth - x_padding - fameWidth

    ctx.fillText(nameLengthCheck(ctx, name, text_x, fameX), text_x, y)
    ctx.fillText(fame, fameX, y)
}

const nameLengthCheck = (ctx, name, name_x, fame_x) => {
    const paddingWidth = 15
    const nameWidthAllowed = name_x + ctx.measureText(name).width + paddingWidth
    if (nameWidthAllowed > fame_x) {
        return name.substring(0, 10).concat('...')
    }
    return name
}