const Discord = require("discord.js");
require('dotenv').config();
const client = new Discord.Client();
const prefix = process.env.PREFIX;
 
client.on("ready", () => {
  console.log("I am ready!");
});
 
client.on("message", (message) => {

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'comic') {
    message.channel.send('https://garfield.com/comic/random')
  } else
  if (message.content.startsWith("!garf")) {
    message.channel.send("Yes, Jon?\nAsk me for a comic by typing !garf comic");
  }


});
 
client.login();