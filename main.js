var fs = require('fs');
var SteamUser = require('steam-user');
var SteamTotp = require('steam-totp');
var steamCommunity = require('steamcommunity');
var TradeOfferManager = require('steam-tradeoffer-manager');
var request = require('request');
var config = require('./config.json');
//var mixer = require('./mixer/mixerbot');
//var steam = require('./steam/steambot');
var discord = require('./discord/discordbot');
var chalk = require('chalk');
var clear = require('clear');

console.log("Starting UP!");
clear();
console.log(`
${chalk.grey('--------------------------------------------------')}
ChisBot, an open-source, multi-platform bot.
${chalk.red('PLEASE DO NOT SELL THIS BOT/SOURCE TO OTHER PEOPLE')}
${chalk.red('PLEASE DO NOT SELL THE BOT FOR SERVICE.')}
Platforms: ${chalk.magenta('Twitch')}, ${chalk.cyan('Mixer')}, ${chalk.red('Steam')}, ${chalk.blue('Discord')}
${chalk.grey('--------------------------------------------------')}
`);

//Loading BOTS HERE!
discord.discordbot();
//mixer.mixerbot();
//steam.steambot();
