const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'MAKAMESCO-MD<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK05sUGcvY3MwVUVFcStpd0JLeEpsSkp1Skc5a0dQdStPcmR1QmVKQ0ZYQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRWZXeXdUNkltSGt5bE91cCswamNQVzcxUHJYeFBOY2pvZ0lOS1NsbDEzTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrR1UzSGU5aitZWHczYkZZdk9KeVVQQy9pSExrLzNXY1U5Ujh1QXhyL0hJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0enpJaDNQWGd4SVZCSHQwRFZEMmVJVkVsbTJhdU1GV3NDQmh0RllhL0ZrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitOQkpGREk3Z1JmcnhyU1RHaDh0SmNGaUpWaTZpWXptZU5XZ3REb1R0VUk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii83MmJueVRJenJFMS9nVThGamJXemFTL3FvNWJJRFRVZlRqWFByUnZtaHc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRU10TittbHhBV0U2eFZ0endUQlFCM3VVeXdNYmxKWFZlSWhVTlFUMGsxbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMS9XTGY1QVlMczBNUHFua1RNemxUVkp1U1YyeWlBRmwzQ2VyWmU5bTlUND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZaL0orM2R1cC9MU0dBKzdUMVVZUXJyRzZIbEYxWFFUY3dtRFBjcDMvV1pjQ3VEbjVyZ2NXbDB6TWpnYkFjSzdKcTY0ZjV0K2VBT2JqSnljdXhLaUFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjA4LCJhZHZTZWNyZXRLZXkiOiJtUElFY3pnTmpzMmNpOUJIeVFGNURSOVRJYWdkaDgzSUFYelBxYkMrdjlRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJtanM1VkQ1Q1NEbWU0R3hXbDhyRkdRIiwicGhvbmVJZCI6ImNiZjUzOWRlLWQ2ZjMtNGZmNy05MGY4LTBlNWFiOTdlOGQ0YSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLMEtGSE01MUtiUE9XS01UWkYwdng2dzRWaVU9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJmNkgyc1RYV0RvUWduc1hGN1VjejVmeGg0Yz0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1ArMncyWVEvSjdkd3dZWUZDQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InI2V3I4S0RyMGt1TUh1am1OczlHeDVra0xzSG13REU3QWtEQzRpaXNYMWc9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjlXWHRxWUU1WVRIaUg5MEJwWklIWXYrS05IVXZNemlhbXZKUUVoMXQ1KzNLYnhaclZjU2FDOFlPd25XNkFkcXBwMkg4NjB0Y2ZJOHpjMGJMTDA2YUJnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJUa3R1bEFFMGtscHhzWnpEY2tIYUtja3ZtWE5CNnJKMXp4K3pSRjdrY2djSGNOclpzT3M2NXYxblJyODVlQ29zUW5vOTdLeDNzQUpqdjJORFJKbUhBZz09In0sIm1lIjp7ImlkIjoiMjc4MTgyMzIyNjk6MzhAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQmFsbGFzIiwibGlkIjoiMTc0NTkxMDkxNjc1MzI4OjM4QGxpZCJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNzgxODIzMjI2OTozOEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJhK2xxL0NnNjlKTGpCN281amJQUnNlWkpDN0I1c0F4T3dKQXd1SW9yRjlZIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQVVJQ0E9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTI2NDk2MDksImxhc3RQcm9wSGFzaCI6IlBXazVCIn0=',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/BrbBot69/TOXIC-LOVER-MD',
    OWNER_NAME : process.env.OWNER_NAME || "𝕬𝖛𝖊.𝕭",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "27767494368",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    AUTO_REACT: process.env.AUTO_REACTION || "no",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/bhuppk.jpg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'no',              
    CHAT_BOT: process.env.CHAT_BOT || "no",              
    AUTO_READ: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "yes", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'your status have been viewed by ꀭꀤꈤꅏꂦꂦ-XMD',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VawCel7GOj9ktLjkxQ3g",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VawCel7GOj9ktLjkxQ3g",
    CHANNEL :process.env.CHANNEL || "https://whatsapp.com/channel/0029VawCel7GOj9ktLjkxQ3g",
    CAPTION : process.env.CAPTION || "✧ꀭꀤꈤꅏꂦꂦ-XMD✧",
    BOT : process.env.BOT_NAME || '✧ꀭꀤꈤꅏꂦꂦ TECH✧⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Johannesburg", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'no',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
