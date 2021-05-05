const Discord = require('discord.js');
const WOKcommands = require('wokcommands');
require('dotenv').config()
const client  = new Discord.Client();
const nbx = require('noblox.js');
const axios = require('axios');

client.on('ready', () => {
    console.log(`Bot is ready!`);
    client.user.setActivity(`Cha's Automation`, { type: 'WATCHING'});

    new WOKcommands(client, 'commands', 'features')
      .setDefaultPrefix('!')
  });
  
  client.login(process.env.TOKEN);


  async function run() {
    nbx.setCookie(process.env.COOKIE);
    console.log('Logged in as ROBLOX!')
  };
  
  run();
