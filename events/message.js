//client.on("message", (message) => {
module.exports = (client, message) => {

    if (message.author.bot) return;

    // Respond to any words in the responses.json
    if (!message.content.startsWith(client.prefix)) {
        if(client.responses[message.content]) {
            const gainsfield = client.emojis.find(emoji => emoji.name === "gainsfield");
            message.channel.send(client.responses[message.content] + gainsfield)
        }
        return;
    }
  
    const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    console.log(`Commands are ${command} args are ${args}`)
  
    if (command === 'garf') {
      let [subcommand] = args
      if (subcommand == null) {
        message.channel.send('Yes, Jon?\nAsk me for a comic by typing !garf comic\nGet a list of emojis I can access with listemojis')
      } else
      if (subcommand === 'listemojis') {
        console.log(`Listing emojis`)
        const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ");
        message.channel.send(emojiList);
      } else
      if (subcommand === 'comic'){
        message.channel.send('https://garfield.com/comic/random')
      }
    } 
  
  };