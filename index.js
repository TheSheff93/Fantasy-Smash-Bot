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

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);

//message event handler
client.on('messageCreate', async (Message) => {
    //check that message isn't from a bot
    if(Message.author.bot) return;
    
    //check that the message actually has the damn prefix
    if(!Message.content.startsWith(prefix)) return;
    let msgContent = Message.content.split(" ");
    if(msgContent[0] == ".fuck"){
        Message.channel.send("SHIT!")
    }
});