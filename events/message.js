//client.on("message", (message) => {
module.exports = (client, message) => {

    if (message.author.bot) return;

    var responsefile = fs.readFileSync("response.json")
    var response = JSON.parse(responsefile)
  
    /*
    if (!message.content.startsWith(prefix) && (message.content.includes('garf') || message.content.includes('garfield'))) {
      const gainsfield = client.emojis.find(emoji => emoji.name === "gainsfield");
      //message.reply(`You called ${gainsfield}`)
      message.channel.send(`You called? ${gainsfield}`)
    }
    */

  
    //Start of prefix only commands
    if (!message.content.startsWith(prefix)) {
        if(response[message.content]) {
            message.channel.send(response[message.content])
        }
        return;
    }
  
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
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