const fs = require("fs");


const GetAllDataFromEvent = (event) => {
    let header = (event.Killer.GuildName ? ("[*" + event.Killer.GuildName + "*] ") : "") +  "__" + event.Killer.Name + "__ (" + event.Killer.AverageItemPower.toFixed(0) + ")" + ' ⚔️ ' + (event.Victim.GuildName ? ("[*" + event.Victim.GuildName + "*] ") : "") + "__" + event.Victim.Name + "__ (" + event.Victim.AverageItemPower.toFixed(0) + ")"
    let assists = event.Participants.filter(p => p.Name != event.Killer.Name)
    let imgData = GetDataForImage(event)

    return [header, assists, imgData]
}

const GetDataForImage = (event) => {
    let d = new Date(event.TimeStamp)
    let eventId = { "EventId": event.EventId }
    let items = event.Victim.Inventory.filter(item => item != null)
    fs.writeFileSync('./storage.json', JSON.stringify(eventId), 'utf8', (e) => console.log(e));
    return {
        background: "background"+Math.ceil(items.length / 9)+".png",
        killer: {
            Name: (event.Killer.GuildName ? ("[" + event.Killer.GuildName + "] ") : "") + event.Killer.Name + " (" + event.Killer.AverageItemPower.toFixed(0) + ")",
            MainHand: (event.Killer.Equipment.MainHand ? "https://render.albiononline.com/v1/item/" + event.Killer.Equipment.MainHand.Type + "?quality=" + event.Killer.Equipment.MainHand.Quality : "blank.png"),
            OffHand: (event.Killer.Equipment.OffHand ? "https://render.albiononline.com/v1/item/" + event.Killer.Equipment.OffHand.Type + "?quality=" + event.Killer.Equipment.OffHand.Quality : "blank.png"),
            Head: (event.Killer.Equipment.Head ? "https://render.albiononline.com/v1/item/" + event.Killer.Equipment.Head.Type + "?quality=" + event.Killer.Equipment.Head.Quality : "blank.png"),
            Armor: (event.Killer.Equipment.Armor ? "https://render.albiononline.com/v1/item/" + event.Killer.Equipment.Armor.Type + "?quality=" + event.Killer.Equipment.Armor.Quality : "blank.png"),
            Shoes: (event.Killer.Equipment.Shoes ? "https://render.albiononline.com/v1/item/" + event.Killer.Equipment.Shoes.Type + "?quality=" + event.Killer.Equipment.Shoes.Quality : "blank.png"),
            Bag: (event.Killer.Equipment.Bag ? "https://render.albiononline.com/v1/item/" + event.Killer.Equipment.Bag.Type + "?quality=" + event.Killer.Equipment.Bag.Quality : "blank.png"),
            Cape: (event.Killer.Equipment.Cape ? "https://render.albiononline.com/v1/item/" + event.Killer.Equipment.Cape.Type + "?quality=" + event.Killer.Equipment.Cape.Quality : "blank.png"),
            Mount: (event.Killer.Equipment.Mount ? "https://render.albiononline.com/v1/item/" + event.Killer.Equipment.Mount.Type + "?quality=" + event.Killer.Equipment.Mount.Quality : "blank.png"),
            Potion: (event.Killer.Equipment.Potion ? "https://render.albiononline.com/v1/item/" + event.Killer.Equipment.Potion.Type + "?quality=" + event.Killer.Equipment.Potion.Quality : "blank.png"),
            Food: (event.Killer.Equipment.Food ? "https://render.albiononline.com/v1/item/" + event.Killer.Equipment.Food.Type + "?quality=" + event.Killer.Equipment.Food.Quality : "blank.png"),
            PotionCount: (event.Killer.Equipment.Potion ? event.Killer.Equipment.Potion.Count : null),
            FoodCount: (event.Killer.Equipment.Food ? event.Killer.Equipment.Food.Count : null),
        },
        victim: {
            Name: (event.Victim.GuildName ? ("[" + event.Victim.GuildName + "] ") : "") + event.Victim.Name + " (" + event.Victim.AverageItemPower.toFixed(0) + ")",
            MainHand: (event.Victim.Equipment.MainHand ? "https://render.albiononline.com/v1/item/" + event.Victim.Equipment.MainHand.Type + "?quality=" + event.Victim.Equipment.MainHand.Quality : "blank.png"),
            OffHand: (event.Victim.Equipment.OffHand ? "https://render.albiononline.com/v1/item/" + event.Victim.Equipment.OffHand.Type + "?quality=" + event.Victim.Equipment.OffHand.Quality : "blank.png"),
            Head: (event.Victim.Equipment.Head ? "https://render.albiononline.com/v1/item/" + event.Victim.Equipment.Head.Type + "?quality=" + event.Victim.Equipment.Head.Quality : "blank.png"),
            Armor: (event.Victim.Equipment.Armor ? "https://render.albiononline.com/v1/item/" + event.Victim.Equipment.Armor.Type + "?quality=" + event.Victim.Equipment.Armor.Quality : "blank.png"),
            Shoes: (event.Victim.Equipment.Shoes ? "https://render.albiononline.com/v1/item/" + event.Victim.Equipment.Shoes.Type + "?quality=" + event.Victim.Equipment.Shoes.Quality : "blank.png"),
            Bag: (event.Victim.Equipment.Bag ? "https://render.albiononline.com/v1/item/" + event.Victim.Equipment.Bag.Type + "?quality=" + event.Victim.Equipment.Bag.Quality : "blank.png"),
            Cape: (event.Victim.Equipment.Cape ? "https://render.albiononline.com/v1/item/" + event.Victim.Equipment.Cape.Type + "?quality=" + event.Victim.Equipment.Cape.Quality : "blank.png"),
            Mount: (event.Victim.Equipment.Mount ? "https://render.albiononline.com/v1/item/" + event.Victim.Equipment.Mount.Type + "?quality=" + event.Victim.Equipment.Mount.Quality : "blank.png"),
            Potion: (event.Victim.Equipment.Potion ? "https://render.albiononline.com/v1/item/" + event.Victim.Equipment.Potion.Type + "?quality=" + event.Victim.Equipment.Potion.Quality : "blank.png"),
            Food: (event.Victim.Equipment.Food ? "https://render.albiononline.com/v1/item/" + event.Victim.Equipment.Food.Type + "?quality=" + event.Victim.Equipment.Food.Quality : "blank.png"),
            PotionCount: (event.Victim.Equipment.Potion ? event.Victim.Equipment.Potion.Count : null),
            FoodCount: (event.Victim.Equipment.Food ? event.Victim.Equipment.Food.Count : null),
        },
        inventory: {
            items: items
        },
        event: {
            date: d.getFullYear() + "/" + ((d.getMonth() + 1) < 10 ? ("0" + (d.getMonth() + 1)) : (d.getMonth() + 1)) + "/" + (d.getDate() < 10 ? ("0" + d.getDate()) : d.getDate()),
            time: (d.getHours() < 10 ? ("0" + d.getHours()) : d.getHours()) + ":" + (d.getMinutes() < 10 ? ("0" + d.getMinutes()) : d.getMinutes()),
            fame: event.TotalVictimKillFame
        }
    }
}

module.exports = {
    GetAllDataFromEvent
}