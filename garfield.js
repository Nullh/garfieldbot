const Discord = require("discord.js");
require('dotenv').config();
const client = new Discord.Client();
 
client.on("ready", () => {
  console.log("I am ready!");
});
 
client.on("message", (message) => {
  if (message.content.startsWith("ping")) {
    message.channel.send("Look, I updated!");
  }
});
 
client.login();