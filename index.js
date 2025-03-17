
const fs = require('fs');
const  js2xml =require ('jstoxml');
var getDirName = require('path').dirname;

let cardfile = fs.readFileSync("./lorcanaCards.json");
let cards = JSON.parse(cardfile).cards;
//console.log(cards);
let cardsToConvert = []; 
cards.forEach((card) => {
    tempCard = {'card':{
        'name': card.fullName, 
        'set':{
            _attrs:{
            rarity:card.rarity,
            uuid:card.fullIdentifier,
            picurl: card.images.full
        }},
        'prop':{
            'lore': card.lore,
            'maintype':card.type,
            'type': card.type,
            'colors': card.color,
            'pt': card.strength + '/' + card.willpower,
            'cmc': card.cost,
            'manacost': card.cost
        },
        'text': card.fullText
        
    }}
        if(tempCard.card.lore == "undefined"){
            delete tempCard.card.lore;
        }
        if (tempCard.card.prop.pt == "undefined/undefined"){
            delete tempCard.card.prop.pt;
        }
        if (tempCard.card.prop.pt && tempCard.card.prop.pt.includes("undefined/")){
            tempCard.card.prop.pt = tempCard.card.prop.pt.split('undefined')[1];
        }

    cardsToConvert.push(tempCard);
} );

let xml = js2xml.toXML(cardsToConvert);
//console.log(xml);
let path = __dirname+'/tmp/cards.xml';

fs.writeFileSync(path,xml);