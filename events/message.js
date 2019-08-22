//client.on("message", (message) => {
module.exports = (client, message) => {

    if (message.author.bot) return;

    
    if (!message.content.startsWith(client.prefix)) {
        // Respond to garf or garfield
        if (message.content.toLowerCase().includes('garf') || message.content.toLowerCase().includes('garfield')) {
            myEmoji = client.emojis.random();
            message.channel.send(`${myEmoji} `)
            return;
        }
        // Respond to any words in the responses.json
        var triggerWords = Object.keys(client.responses);
        for(key in triggerWords) {
            if(message.content.toLowerCase().includes(triggerWords[key])) {
                message.channel.send(`${client.responses[triggerWords[key]]}`)
            }
        }
    }
  
    const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    //console.log(`Commands are ${command} args are ${args}`)
  
    if (command === 'garf') {
      let [subcommand] = args
      switch (subcommand){
        case 'comic':
            var currentDate = new Date();
            var firstComic = new Date(1978, 6, 19);
            var comicDate = client.randomDate.getRandomDateInRange(firstComic, currentDate);
            var url = `https://d1ejxu6vysztl5.cloudfront.net/comics/garfield/${comicDate.getFullYear()}/${comicDate.toISOString().substring(0, 10)}.gif`
            message.channel.send(`${url}`)
            break;
        case 'listemojis':
            const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ");
            message.channel.send(emojiList);
            break;
        case 'help':
            const gainsfield = client.emojis.find(emoji => emoji.name === "gainsfield");
            message.channel.send(`--== Garfieldbot help ${gainsfield} ==--\nAsk me for a comic by typing !garf comic\nGet a list of emojis I can access with !garf listemojis`)
            break;
        default:
            message.channel.send(`try '!garf help' for valid commands!`)
      }
    } 
  
  };