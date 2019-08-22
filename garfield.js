const Discord = require("discord.js");
const fs = require("fs");
const randomDate = require('random-date-generator')
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
require('dotenv').config();
const client = new Discord.Client();
const prefix = process.env.PREFIX;
const responses = require('./responses');
const validEmojis = require('./emojis.json')
client.prefix = prefix;
client.responses = responses;
client.randomDate = randomDate;
client.validEmojis = validEmojis;

 
client.on("ready", () => {
  console.log("I am ready!");
});

const init = async () => {

  // Then we load events, which will include our message and ready event.
  const evtFiles = await readdir("./events/");
  console.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    console.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${file}`);
    // Bind the client to any event, before the existing arguments
    // provided by the discord.js event. 
    // This line is awesome by the way. Just sayin'.
    client.on(eventName, event.bind(null, client));
  });

  client.login();
};

init();