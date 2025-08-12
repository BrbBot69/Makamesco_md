const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'MAKAMESCO-MD<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEtWSndIMEtwQVh6bDZ3SldpV2YwZFZZMnpVaWEzNS8wU3NXdFNKYldtND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieW5pL2RVNVo1ZithelBTeForTEVnM3hIcThodzhrTVB0RFFXRk1NazBFVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0TW1PZHZxdjZoSDJvY0dVY0JLcTZra1pXS1JQbGN2OUd0SEdhcEZBbG5FPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJoMjJEaWJDVktrV1NkOE1SWlRCRDAxUHdQakFTZk8xMnBGcTBjRVJzbmxNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtJc3JiNGtHcEZDTlMyZFhoZ3YxdHdkZ1lKck9QamhvVXd2QmxudGJDVUk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik13MHYyMm01TEs2WjlhQjR6Z0VMbm9OdzZ6eG5nSU5xQ3lzbXNuc2RSMnc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUl6dkVBSUVkNFEwclE0eUtsV0lFbkszdVZ3RnBJWFJmZEFROVdnRzZXMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVzNwajNHQ0lSS25BaFRDMlREV09hNkgwVkJKM0FHeU1DRFE2TzdVNkluWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRMcHg5c2VwcklhUGFTVWxGVUN0aTl2clJmeHpMUVhnemI1N3Zaa3g4SFVYVWJkOHZpNVpmTm5raTdLU1JhOENVcnEvL1I4TGYvQUVpN09zWFowYkF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTkxLCJhZHZTZWNyZXRLZXkiOiJlYXNMd0s3OGRYMVNaVTg5VERzWS8rYmU1ZzRIZDUvSGdPTDAwbnc2RzMwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI3ODE4MjMyMjY5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkVDRjc2MkNEQzBFRjBFQzkzQjg3QThGOTJDQzVCRDcyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQ5OTIyMTV9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI3ODE4MjMyMjY5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjE0OEM4MUJGMkNBQ0E0RjdEOEI3MUU1QUVCNDU4RUM1In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQ5OTIyMTV9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI3ODE4MjMyMjY5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjZGNjFDMzkxMUJEOEU5REUyODI5Qzk5QjYyQjZCRjg5In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQ5OTIyMTl9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjpmYWxzZSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pDZDgwRVF4SnpzeEFZWUFTQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ik9tKzZucDZWZEFyQU45S2J2ck93WU8vejFFOE1hOXoxaWZmSFR1eXdoRkU9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjBCVG9Ea2hnbU1XZndPWEhKeEtSRWNJYWVtTkEzYjg5QnZFcTJKUUwvSzJwM29KYWduVWFXZmxmMThtMVlFQ3JZRFFXeG5hQnh1UElvcE42YTgvWUJ3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJCM2tZa05jRks5bmZzdEI4SjJibDJ3QXZQNnNXNDhsMUFUMkpLc09UbzZocUh2YU1xK2xGTzFEYzFEc3hQNlhkOEJGOVMva09DT1phM2tnQnZBbUVEUT09In0sIm1lIjp7ImlkIjoiMjc4MTgyMzIyNjk6M0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJCYWxsYXMiLCJsaWQiOiIxNzQ1OTEwOTE2NzUzMjg6M0BsaWQifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjc4MTgyMzIyNjk6M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUcHZ1cDZlbFhRS3dEZlNtNzZ6c0dEdjg5UlBER3ZjOVluM3gwN3NzSVJSIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQVVJQ0E9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTQ5OTIyMTAsImxhc3RQcm9wSGFzaCI6IlBXazVCIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFKMmYifQ==hoRjZWaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMVZiQVl3VTREM1lVRTRXUTVwV0tZS2dpL3E4S0luMDNzT01xTGo2U2tWMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrUHdLb0FpZVFvalh3L1V3WllGendPeS9VTkE1eTc5ZGFIQVNLUFVaU0ZVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxOE5zdjJmSG9MTVJka1Y2VDhkK093ZmMwb1dIem9IMW1LNFh0bjJjVENvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVNdW43VEFjNStsS0R3QURVQ083OWx3UTRKMFg3Qkpid2t3a1YzS0JuVlk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im45enFPUFN4MWFpSWhLZW9OMnhrTWhrRmhQTm1VTytmMXBEYU55Y0JKMnM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0luS3hsd1ZEdFc3SUhHei9iRVVVdEZwK0lNaWVlWVFhWmxubEFxNFNraz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSVRmRlNQODVBQnlaUDBvWkZlaG9qMldyVVpvSUphOXkxN2FESzRFdU1nST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjV5QVY4TTBhWXp2Wm9RdDl0MlFob2J0K3VVV25GdS9hNzZRK0pXSjVNd3ZsMHRzc21HN0VmbkxuOC9aODdNVGRHSUhqYjBsZG50Rzh0Nlh2eGM5SWlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTIyLCJhZHZTZWNyZXRLZXkiOiJ6RjM4aDc4U3o2TWJtTWhXSWFwM1NVL1BnMTkwU2ZxejVZZzRoMlJZUVI4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI3ODE4MjMyMjY5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjIzODE1QzEyQUUzRkQ2Mzg1RjlDODEyOEY4QjE3OEI5In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQ2NzA3MTZ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI3ODE4MjMyMjY5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkNFNDAwQjJGMjFENTI4RjQ2NEZCMEExMEJCNEUxRTE0In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQ2NzA3MTZ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI3ODE4MjMyMjY5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkJCNzI1OEQ3NDk4NzY0OEM3MUNERDQyQzFDQzUyMkY3In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQ2NzA3NTN9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IlZESzlQOEdRIiwibWUiOnsiaWQiOiIyNzgxODIzMjI2OTo4NUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJCYWxsYXMiLCJsaWQiOiIxNzQ1OTEwOTE2NzUzMjg6ODVAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJK2Q4MEVRNWN6WXhBWVlFU0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJqdGhXZzZkWjVzT1diTTFiTVBFN2ZCZVZZemp1Q2xsL0VDRDhTbzBLamhvPSIsImFjY291bnRTaWduYXR1cmUiOiJINk5mc2dhU1lvczV1VmRBTXRQUUdGSXkvWFVMK1NsQnlyUjRVRTkzYks5dld6MUZGUTA2cDRlSmZhdUduVVIzdXlYR241bnREcUEvaVRPaTc1UXdBdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoicUFqRENqVm5lMEFxM1FveE9aSXNmRFBZQ2dzWEVveFFGeU1pZ01NaUdId3FYbmE0ZGhMQkFXTUkwTElPRlJFMnJmSGVxakhTVTNHQytUQTBzR1JSZ3c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNzgxODIzMjI2OTo4NUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZN1lWb09uV2ViRGxtek5XekR4TzN3WGxXTTQ3Z3BaZnhBZy9FcU5DbzRhIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQVVJQ0E9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTQ2NzA3MDgsImxhc3RQcm9wSGFzaCI6IlBXazVCIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFJaUcifQ==',
    PREFIXE: process.env.PREFIX || ";",
    GITHUB : process.env.GITHUB|| 'https://github.com/BrbBot69/Makamesco_md',
    OWNER_NAME : process.env.OWNER_NAME || "♤𝗑ᴾᴿᴼ♧",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "27767494368",
    DEV : process.env.DEV || "♤𝗑ᴾᴿᴼ♧",
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT : process.env.AUTO_REACTION || "no", 
    AUTO_STICKER : process.env.AUTO_STICKER || "no",
    AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/x167jb.jpg",  
    URL2: process.env.URL2 || "https://files.catbox.moe/x167jb.jpg",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'yes',              
    CHAT_BOT: process.env.CHAT_BOT || "no",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'yes', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    GREET : process.env.GREET_MESSAGE || "no", 
    AUTO_STICKER : process.env.AUTO_STICKER || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By Ballas 𝗑ᴾᴿᴼ',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    ANTI_BUG : process.env.ANTI_BUG || "no",
    ANTI_MENTION_GROUP : process.env.ANTI_MENTION_GROUP || "on",
    ANTI_TAG : process.env.ANTI_TAG || "on",
    ANTI_BAD : process.env.ANTI_BAD || "on",
    ANTI_SHARE_GROUP : process.env.ANTI_SHARE_GROUP || "on",
    ANTI_LINK_GROUP : process.env.ANTI_LINK_GROUP || "on",
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VbAEL9r5vKA7RCdnYG0S",
    WEBSITE :process.env.GURL || "https://Makamescodigitalsolutions.com",
    CAPTION : process.env.CAPTION || "Ballas 𝗑ᴾᴿᴼ",
    BOT : process.env.BOT_NAME || 'Ballas 𝗑ᴾᴿᴼ',
    MODE: process.env.PUBLIC_MODE || "yes",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Johannesburg", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGES || 'no',
    ANTI_DELETE_GROUP : process.env.ANTI_DELETE_GROUP || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'no', 
    VOICE_CHATBOT_INBOX : process.env.VOICE_CHATBOT_INBOX || "no",
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
