const util = require('util');

const fs = require('fs-extra');

const { ezra } = require(__dirname + "/../fredi/ezra");

const { format } = require(__dirname + "/../fredi/mesfonctions");

const os = require("os");

const moment = require("moment-timezone");

const s = require(__dirname + "/../set");



ezra({ nomCom: "menu", categorie: "Menu" }, async (dest, zk, commandeOptions) => {

    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;

    let { cm } = require(__dirname + "/../fredi//ezra");

    var coms = {};

    var mode = "public";

    

    if ((s.MODE).toLocaleLowerCase() != "yes") {

        mode = "private";

    }





    



    cm.map(async (com, index) => {

        if (!coms[com.categorie])

            coms[com.categorie] = [];

        coms[com.categorie].push(com.nomCom);

    });



    moment.tz.setDefault(s.TZ);



// Créer une date et une heure en GMT

const temps = moment().format('HH:mm:ss');

const date = moment().format('DD/MM/YYYY');



  let infoMsg =  `

╭──━━━━══════━━━━❂
┃ ━━⦿ *MAKAMESCO MD* ⦿━━
┃ ✯𝕄𝕠𝕕𝕖: ${mode}
┃ ✯𝕌𝕤𝕖𝕣 : ${s.OWNER_NAME}
┃ ✯𝕃𝕚𝕓𝕣𝕒𝕣𝕪 : Baileys
┃ ✯ℙ𝕣𝕖𝕗𝕚𝕩 : ${s.PREFIXE}
┃ ✯𝔻𝕒𝕥𝕖 : ${date}
┃ ✯𝕋𝕚𝕞𝕖 : ${temps}
┃ ✯𝕋𝕠𝕠𝕝𝕤 : ${cm.length}
┃ ✯ℝ𝕒𝕞 : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
┃ ✯ℍ𝕠𝕤𝕥 : ${os.platform()}
┃ ⦿━━━━═════━━━━⦿
╰──━━━━══════━━━━❂\n\n`;


    

let menuMsg = `
┏━━══════━━┓
┃⦿ _*maka ᵐᵈ ᶜᵐᵈˢ*_
┗━━══════━━┛\n


`;



    for (const cat in coms) {

        menuMsg += `╭─━━═━❍ _*${cat}*_ ❍━═━━─⊷`;

        for (const cmd of coms[cat]) {
            
            menuMsg += `
┃❂ ${cmd}`;

        }

        menuMsg += `
╰─━━━━══════━━━━⦿\n`

    }



    menuMsg += `


 ╭──━━══════━━━━┓
 ┃⦿ _*Maka 𝕞𝕕 𝟚𝟘𝟚5*_
 ┃⦿ _*𝕖𝕟𝕛𝕠𝕪 𝕝𝕚𝕗𝕖*_ 
 ╰──━━══════━━━┳┛
 ╭──━━══════━━━┻┓
 ┃⦿ _*𖣘maka ᴛᴇᴄʜ𖣘*_
 ╰──━━══════━━━━┛\n

visit bot host site Makamescodigitalsolutions.com
`;



   var lien = mybotpic();



   if (lien.match(/\.(mp4|gif)$/i)) {

    try {

        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *LUCKY-BOT*, déveloper frediezra" , gifPlayback : true }, { quoted: ms });

    }

    catch (e) {

        console.log("🥵🥵 Menu error " + e);

        repondre("🥵🥵 Menu error " + e);

    }

} 

// Vérification pour .jpeg ou .png

else if (lien.match(/\.(jpeg|png|jpg)$/i)) {

    try {

        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *TKM-bot*, déveloper cod3uchiha" }, { quoted: ms });

    }

    catch (e) {

        console.log("🥵🥵 Menu error " + e);

        repondre("🥵🥵 Menu error " + e);

    }

} 

else {

    

    repondre(infoMsg + menuMsg);

    

}



});
