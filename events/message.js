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
            console.log("Starting checks");
            if (args[1] == null && args[2] == null && args[3] == null) {
                // Get a random comic
                console.log("In random comic");
                message.channel.send(`Getting a random comic`)
                var currentDate = new Date();
                var firstComic = new Date(1978, 6-1, 19);
                var comicDate = client.randomDate.getRandomDateInRange(firstComic, currentDate);
            } else {
                console.log("In date comic");
                console.log("Trying to make a date");
                message.channel.send(`Getting comic for date ${args[1]}-${args[2]}-${args[3]}`)
                var comicDate = new Date(args[1], args[2]-1, args[3])
                if (isNaN(Date.parse(comicDate))) {
                    console.log("Failed to make a date");
                    message.channel.send(`Sorry, I can't find a comic for that date. Make sure you request it in the format\n!garf comic yyyy mm dd`)
                    break;
                }
            }
            console.log("Getting url");
            var url = `https://d1ejxu6vysztl5.cloudfront.net/comics/garfield/${comicDate.getFullYear()}/${comicDate.toISOString().substring(0, 10)}.gif`
            message.channel.send(`${url}`)
            break;
        case 'listemojis':
            const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ");
            message.channel.send(emojiList);
            break;
        case 'help':
            const gainsfield = client.emojis.find(emoji => emoji.name === "gainsfield");
            message.channel.send(`--== Garfieldbot help ${gainsfield} ==--\nAsk me for a comic by typing !garf comic\nGet a comic for a certain date with !garf comic yyyy mm dd\nGet a list of emojis I can access with !garf listemojis`)
            break;
        default:
            message.channel.send(`try '!garf help' for valid commands!`)
      }
    } 
  
  };