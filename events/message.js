module.exports = (client, message) => {

    if (message.author.bot) return;

    // Replace the string __RANDEMOJI__ with a random emoji
    function replaceEmoji(string) {
        var rand = Math.floor(Math.random() * (client.validEmojis['emojis'].length));
        var myEmoji = client.emojis.find(emoji => emoji.name === client.validEmojis['emojis'][rand]);
        string = string.replace("__RANDEMOJI__", myEmoji);
        return string;
    }

    if (!message.content.startsWith(client.prefix)) {
        // Respond to any words in the responses.json
        var triggerWords = Object.keys(client.responses);
        for(key in triggerWords) {
            if(message.content.toLowerCase().includes(triggerWords[key])) {
                if(typeof client.responses[triggerWords[key]] == 'string') {
                    message.channel.send(`${replaceEmoji(client.responses[triggerWords[key]])}`);
                    return;
                } else
                if(typeof client.responses[triggerWords[key]] == 'object') {
                    var rand = Math.floor(Math.random() * (client.responses[triggerWords[key]].length + 1));
                    message.channel.send(`${replaceEmoji(client.responses[triggerWords[key]][rand])}`);
                    return;
                }
            }
        }
    }

    // Handle commands to '!garf x'

    const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

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