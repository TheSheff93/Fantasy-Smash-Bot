//dependencies
const getFiles = require('./getFiles');

// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Message } = require('discord.js');
const { prefix, token } = require('./config.json');

// Create a new client instance and define the intents of the bot
const client = new Client({ 	intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
], 
});



const commandFiles = getFiles('./commands', ".js")
const commands = {};
//for all the files in directory and all subdirectories
for(const command of commandFiles){
    //import as a requirement
    let commandFile = require(command);
    //adjust if necessaryS
    if(commandFile.default) commandFile = commandFile.default;
    //operating system bullshit
    const split = command.replace(/\\/g, '/').split('/')
    //create a command name so that you can call within an array
    const commandName = split[split.length-1].replace('.js', '');
    //add the commandFile requirement to a command array list
    
    commands[commandName.toLowerCase()] = commandFile;
}
// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);

//message event handler
client.on('messageCreate', async (message) => {
    //check that message isn't from a bot
    if(message.author.bot) return;
    
    //check that the message actually has the damn prefix
    if(!message.content.startsWith(prefix)) return;
    
    //drop the prefix and split the command
    let msgContent = message.content.substring(1).split(" ");
    var commandName = msgContent[0];
    //check if the command is within the command array
    if(!commands[commandName]){
        return;
    }
    //try running the command and log the error to the console if something went wrong
    try{
        commands[commandName](message);
    }
    catch(error){
        console.error(error);
    }
});