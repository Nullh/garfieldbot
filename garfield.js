const Discord = require("discord.js");
require('dotenv').config();
const client = new Discord.Client();
const prefix = process.env.PREFIX;
 
client.on("ready", () => {
  console.log("I am ready!");
});
 
client.on("message", (message) => {

  if (message.author.bot) return;

  if (message.content.includes('garf') || message.content.includes('garfield')) {
    message.channel.send('You called?')
  }

  //Start of prefix only commands
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  console.log(`Commands are ${command}`)

  if (command === 'garf') {
    let [subcommand] = args
    if (subcommand == null) {
      message.channel.send('Yes, Jon?\nAsk me for a comic by typing !garf comic')
    } else
    if (subcommand === 'comic'){
      message.channel.send('https://garfield.com/comic/random')
    }
  } 

});
 
client.login();