const Discord = require("discord.js");
const fs = require("fs");
require('dotenv').config();
const client = new Discord.Client();
const prefix = process.env.PREFIX;
 
client.on("ready", () => {
  console.log("I am ready!");
});

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.login();