exports.discordbot = function() {
    const config = require('./../config.json');
    const subscribers = require('./../subscribers.json');
    const admin_config = require('./../admins.json');
    const getJSON = require("get-json");
    //const stats = require('./status.txt');
    const admins = config.discord.admins;
    const youtube_api_key = config.discord.youtube_api_key;
    const twitch = config.discord.twitchname;
    const twitch_api_key = config.discord.twitch_api_key;
    const owner = config.discord.owner;
    const prefix = config.discord.prefix;
    const client_id = config.discord.client_id;
    const started = Date()
    const os = require('os');
    const util = require("util");
    const request = require("request");
    const schedule = require('node-schedule');
    const markdown = require("markdown").markdown;
    const errorlog = require("./data/errors.json")
    const Promise = require('bluebird');
    const fs = require('fs');
    const chalk = require('chalk');
    const clear = require('clear');

    //start discord
    const Discord = require('discord.js');

    const dclient = new Discord.Client();
    const token = config.discord.token;

    const rb = "```"

    var intent;


    dclient.on('ready', () => {
        console.log(`
${chalk.grey('--------------------------------------------------')}
${chalk.blue('Discord Loaded, Loading Modules for Discord')}
${chalk.grey('--------------------------------------------------')}
`);
        console.log('We ready, We connected at ' + dclient.guilds.size + ' Servers');
        //dclient.user.setGame('BOT is in Alpha V0.1! Still Adding commands. Read &>comingsoon for more INFO!', 'https://twitch.tv/' + twitch);
    });

    const statustxt = () => {
        dclient.user.setGame('Discord has Started. | Prefix ' + prefix + ' | ' + dclient.users.size + ' Users | ' + dclient.guilds.size + ' Servers', 'https://twitch.tv/' + twitch);
    };

    dclient.on('ready', statustxt);
    dclient.on('guildCreate', statustxt);
    dclient.on('guildDelete', statustxt);

    function secondsToString(seconds) {
        try {
            var numyears = Math.floor(seconds / 31536000);
            var numdays = Math.floor((seconds % 31536000) / 86400);
            var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
            var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
            var numseconds = Math.round((((seconds % 31536000) % 86400) % 3600) % 60);

            var str = "";
            if (numyears > 0) {
                str += numyears + " year" + (numyears == 1 ? "" : "s") + " ";
            }
            if (numdays > 0) {
                str += numdays + " day" + (numdays == 1 ? "" : "s") + " ";
            }
            if (numhours > 0) {
                str += numhours + " hour" + (numhours == 1 ? "" : "s") + " ";
            }
            if (numminutes > 0) {
                str += numminutes + " minute" + (numminutes == 1 ? "" : "s") + " ";
            }
            if (numseconds > 0) {
                str += numseconds + " second" + (numseconds == 1 ? "" : "s") + " ";
            }
            return str;
        } catch (err) {
            console.log("Could not get time")
            return 'Could not get time';
        }
    }

    //This code was made by Tobiah aka Warframe Owner
    dclient.on("guildMemberUpdate", (oldMember, newMember) => {
        let subscribers = {
            list: JSON.parse(fs.readFileSync('./../subscribers.json')) || [],
            path: './../subscribers.json',
        };
        if (newMember.guild.id === config.roles.patron_guild) {
            if (newMember.roles.has(config.roles.coal_role)) {
                if (!subscribers.list.includes(newMember.id)) {
                    console.log(dclient.users.get(newMember.id).tag + " Has Pateron Subscriber role, UserID has been Added!")
                    //newMember.guild.channels.get(config.subAlertChat).send(newMember + " You are a Subscriber of Pateron, Welcome and Thank you for suppoting me <3");
                    //newMember.guild.channels.get(config.subAnnounceChat).send("Please Welcome to New Subscriber @ " + newMember + "Welcome to PARTY! ");
                    changeSubStatus(newMember.id, 'add', subscribers);
                }
            } else
			if (newMember.roles.has(config.roles.iron_role)) {
                if (!subscribers.list.includes(newMember.id)) {
                    console.log(dclient.users.get(newMember.id).tag + " Has Pateron Subscriber role, UserID has been Added!")
                    //newMember.guild.channels.get(config.subAlertChat).send(newMember + " You are a Subscriber of Pateron, Welcome and Thank you for suppoting me <3");
                    //newMember.guild.channels.get(config.subAnnounceChat).send("Please Welcome to New Subscriber @ " + newMember + "Welcome to PARTY! ");
                    changeSubStatus(newMember.id, 'add', subscribers);
                }
            } else
			if (newMember.roles.has(config.roles.gold_role)) {
                if (!subscribers.list.includes(newMember.id)) {
                    console.log(dclient.users.get(newMember.id).tag + " Has Pateron Subscriber role, UserID has been Added!")
                    //newMember.guild.channels.get(config.subAlertChat).send(newMember + " You are a Subscriber of Pateron, Welcome and Thank you for suppoting me <3");
                   //newMember.guild.channels.get(config.subAnnounceChat).send("Please Welcome to New Subscriber @ " + newMember + "Welcome to PARTY! ");
                    changeSubStatus(newMember.id, 'add', subscribers);
                }
            } else
			if (newMember.roles.has(config.roles.diamond_role)) {
                if (!subscribers.list.includes(newMember.id)) {
                    console.log(dclient.users.get(newMember.id).tag + " Has Pateron Subscriber role, UserID has been Added!")
                    //newMember.guild.channels.get(config.subAlertChat).send(newMember + " You are a Subscriber of Pateron, Welcome and Thank you for suppoting me <3");
                    //newMember.guild.channels.get(config.subAnnounceChat).send("Please Welcome to New Subscriber @ " + newMember + "Welcome to PARTY! ");
                    changeSubStatus(newMember.id, 'add', subscribers);
                }
            } else
			if (newMember.roles.has(config.roles.emerald_role)) {
                if (!subscribers.list.includes(newMember.id)) {
                    console.log(dclient.users.get(newMember.id).tag + " Has Pateron Subscriber role, UserID has been Added!")
                    //newMember.guild.channels.get(config.subAlertChat).send(newMember + " You are a Subscriber of Pateron, Welcome and Thank you for suppoting me <3");
                    //newMember.guild.channels.get(config.subAnnounceChat).send("Please Welcome to New Subscriber @ " + newMember + "Welcome to PARTY! ");
                    changeSubStatus(newMember.id, 'add', subscribers);
                }
            } else
            if (newMember.roles.has(config.roles.PRVSub_role)) {
                if (!subscribers.list.includes(newMember.id)) {
                    console.log(dclient.users.get(newMember.id).tag + " Has Private Subscriber role, UserID has been Added!")
                    changeSubStatus(newMember.id, 'add', subscribers);
                }
            } else if (subscribers.list.includes(newMember.id)) {
                if (!subscribers.list.includes(newMember.username)) {
                    //newMember.guild.channels.get(config.subAlertChat).send(newMember + " Your Subscriber Has Expired!, Means you can't Access PRO commands. Make sure you Resub at Gamewisp/Pateron get access again. thank you for support <3");
                    //newMember.guild.channels.get(config.subAnnounceChat).send(newMember + " Has been Removed, Because Subscriber Role has been Expired on User!. Make sure Resub If want keep Your Role.... ");
                }
                console.log(dclient.users.get(newMember.id).tag + " Subscriber has been Expired! Announced has been take Place.")
                changeSubStatus(newMember.id, 'remove', subscribers);
            }
        }

        let staff = {
            list: JSON.parse(fs.readFileSync('./../admins.json')) || [],
            path: './../admins.json',
        };
        if (newMember.guild.id === config.roles.patron_guild) {
            if (newMember.roles.has(config.roles.admin_role)) {
                if (!staff.list.includes(newMember.id)) {
                    console.log(dclient.users.get(newMember.id).tag + " Has Admin role, UserID has been Added!")
                    changeSubStatus(newMember.id, 'add', staff);
                }
            } else
            if (newMember.roles.has(config.roles.mod_role)) {
                if (!staff.list.includes(newMember.id)) {
                    console.log(dclient.users.get(newMember.id).tag + " Has Mod role, UserID has been Added!")
                    changeSubStatus(newMember.id, 'add', staff);
                }
            } else if (staff.list.includes(newMember.id)) {
                if (!staff.list.includes(newMember.username)) {}
                console.log(dclient.users.get(newMember.id).tag + " Staff role has been Removed from this user.")
                changeSubStatus(newMember.id, 'remove', staff);
            }
        }
    });
    ///////////////////////////////////////////////////

    //Array and DATA HERE!
    //This code was made by Tobiah aka Warframe Owner
    const changeSubStatus = async(memberId, change, subscribers) => {
        if (change === 'remove') {
            // Remove from subs
            subscribers.list.splice(subscribers.list.indexOf(memberId), 1);
        }
        if (change === 'add') {
            subscribers.list.push(memberId);
        }
        fs.writeFileSync(subscribers.path, JSON.stringify(subscribers.list), "utf8");
    };
    ///////////////////////////////////////////////////


    function getRandomInt(max) {
        return Math.floor(Math.random() * (max + 1));
    }

    dclient.on('message', message => {
        const isCommander = (id) => {
            return config.owner_id === id || admin_config.includes(id);
        };

        const isSubscriber = (id) => {
            return config.owner_id === id || subscribers.includes(id) || admin_config.includes(id);
        };

        //Commands HERE!

        if (message.content.startsWith(prefix + 'ping')) {
            let embed = new Discord.RichEmbed();
            if (isCommander(message.author.id)) {
                try {
                    message.channel.send("HAI ADMIN")
                } catch (err) {
                    message.channel.send("BYE! Admin")
                }
            } else {
                message.channel.send("Sorry, you do not have permissisons to use this command, **" + message.author.username + "**.")
            }
        }

        if (message.content.startsWith(prefix + 'bf1')) {
            let embed = new Discord.RichEmbed();
            if (isSubscriber(message.author.id)) {
                try {
                    //get content

                    var playername = message.content.split(" ")[1];
                    var plat = message.content.split(" ")[2];


                    if (!message.content.split(" ")[1]) return message.reply("Please enter a user to query.");
                    if (!message.content.split(" ")[2] || message.content.split(" ")[2].toLowerCase().match(/1|2|3/gmi) == null) return message.reply("Please enter a platform to query. E.G Xbox Live = 1 / PSN = 2 / ORIGIN = 3");

                    var bf1basicstats = { url: "https://battlefieldtracker.com/bf1/api/Stats/BasicStats?platform=" + plat + "&displayName=" + playername + "&game=tunguska", headers: { 'trn-api-key': config.discord.bf1trnkey } };

                    var bf1detailedstats = { url: "https://battlefieldtracker.com/bf1/api/Stats/DetailedStats?platform=" + plat + "&displayName=" + playername + "&game=tunguska", headers: { 'trn-api-key': config.discordbf1trnkey } };



                    //url

                    var bf1stats = "https://battlefieldtracker.com/bf1/profile/" + plat + "/";

                    var url = bf1stats + playername;

                    request(bf1detailedstats, function(err, res, body) {

                        if (!err && res.statusCode == 200) {
                            var info = JSON.parse(body);
                            let embed = new Discord.RichEmbed();
                            embed.setColor(0x9900FF)
                            embed.setTitle("Battlefield 1 Status " + playername)
                            embed.setURL("https://battlefieldtracker.com/bf1/profile/" + plat + "/")
                            embed.setThumbnail("https://psmedia.playstation.com/is/image/psmedia/battlefield-1-badge-01-ps4-eu-29apr16?$HugeHero_Badge$")
                            embed.addField("Name: ", playername, true)
                            embed.addField("Platform: ", plat, true)
                            embed.addField("Your Rank: ", "Ranks Coming Soon!", true)
                            embed.addField("Your Skill: ", "Skill Coming Soon!", true)
                            embed.addField("Your K/D: ", info.result.kdr, true)
                            embed.setFooter("Sent via " + dclient.user.username, dclient.user.avatarURL)
                            message.channel.send({ embed });
                        } else {
                            let embed = new Discord.RichEmbed();
                            embed.setColor(0x9900FF)
                            embed.setTitle("Battlefield 1 Status " + playername)
                            embed.setURL("https://battlefieldtracker.com/bf1/profile/" + plat + "/")
                            embed.setThumbnail("https://psmedia.playstation.com/is/image/psmedia/battlefield-1-badge-01-ps4-eu-29apr16?$HugeHero_Badge$")
                            embed.addField("Error: ", "Username not FOUND!", true)
                            embed.setFooter("Sent via " + dclient.user.username, dclient.user.avatarURL)
                            message.channel.send({ embed });
                        }
                    })
                } catch (err) {
                    message.channel.send("Error Occred: Command might be Broken or Unvalid command!")
                }
            } else {
                message.channel.send("Sorry, you do not have permissisons to use this command, **" + message.author.username + "**. You need be subscriber on Pateron or Gamewisp Access this.")
            }
        }

        if (message.content.startsWith(prefix + 'bf4')) {
            //get content

            var playername = message.content.split(" ")[1];
            var plat = message.content.split(" ")[2];


            if (!message.content.split(" ")[1]) return message.reply("Please enter a user to query.");
            if (!message.content.split(" ")[2] || message.content.split(" ")[2].toLowerCase().match(/ps4|xbox|pc|ps3|xone/gmi) == null) return message.reply("Please enter a platform to query. E.G ps3 / ps4 / xbox = Xbox 360 / xone = xbox one / pc");
            //apicc

            var bf4statsapi = "http://api.bf4stats.com/api/playerInfo?plat=" + plat + "&name=" + playername + "&opt=stats,extra";


            //url

            var bf4stats = "http://bf4stats.com/" + plat + "/";

            var url = bf4stats + playername;

            getJSON(bf4statsapi, function(err, res) {
                if (!err && typeof res.error == 'undefined') {
                    let embed = new Discord.RichEmbed();
                    embed.setColor(0x9900FF)
                    embed.setTitle("Battlefield 4 Status " + playername)
                    embed.setURL("http://bf4stats.com/" + plat + "/")
                    embed.setThumbnail("https://vignette.wikia.nocookie.net/battlefield/images/b/bd/High_Resolution_BF4_Logo.png/revision/latest?cb=20130709173244")
                    embed.addField("Name: ", playername, true)
                    embed.addField("Platform: ", plat, true)
                    embed.addField("Your Rank: ", res.stats.rank, true)
                    embed.addField("Your Skill: ", res.stats.skill, true)
                    embed.addField("Your K/D: ", res.stats.extra.kdr.toFixed(2), true)
                    embed.setFooter("Sent via " + dclient.user.username, dclient.user.avatarURL)
                    message.channel.send({ embed });
                } else {
                    let embed = new Discord.RichEmbed();
                    embed.setColor(0x9900FF)
                    embed.setTitle("Battlefield 4 Status " + playername)
                    embed.setURL("http://bf4stats.com/" + plat + "/")
                    embed.setThumbnail("https://vignette.wikia.nocookie.net/battlefield/images/b/bd/High_Resolution_BF4_Logo.png/revision/latest?cb=20130709173244")
                    embed.addField("Error: ", "Player not identified", true)
                    embed.setFooter("Sent via " + dclient.user.username, dclient.user.avatarURL)
                    message.channel.send({ embed });
                }
            })
        }

        if (message.content.startsWith(prefix + 'bfh')) {
            //get content

            var playername = message.content.split(" ")[1];
            var plat = message.content.split(" ")[2];


            if (!message.content.split(" ")[1]) return message.reply("Please enter a user to query.");
            if (!message.content.split(" ")[2] || message.content.split(" ")[2].toLowerCase().match(/ps4|xbox|pc|ps3|xone/gmi) == null) return message.reply("Please enter a platform to query. E.G ps3 / ps4 / xbox = Xbox 360 / xone = xbox one / pc");
            //api

            var bfhstatsapi = "http://api.bfhstats.com/api/playerInfo?plat=" + plat + "&name=" + playername + "&opt=stats,extra";


            //url

            var bfhstats = "http://bfhstats.com/" + plat + "/";

            var url = bfhstats + playername;

            getJSON(bfhstatsapi, function(err, res) {
                if (!err && typeof res.error == 'undefined') {
                    let embed = new Discord.RichEmbed();
                    embed.setColor(0x9900FF)
                    embed.setTitle("Battlefield Hardline Status " + playername)
                    embed.setURL("http://bfhstats.com/" + plat + "/")
                    embed.setThumbnail("https://vignette.wikia.nocookie.net/battlefield/images/7/78/Battlefield_Hardline.png/revision/latest?cb=20140527162857")
                    embed.addField("Name: ", playername, true)
                    embed.addField("Platform: ", plat, true)
                    embed.addField("Your Rank: ", res.stats.rank, true)
                    embed.addField("Your Skill: ", res.stats.scores.score.toFixed(0), true)
                    embed.addField("Your K/D: ", res.stats.kdRatio.toLocaleString(), true)
                    embed.setFooter("Sent via " + dclient.user.username, dclient.user.avatarURL)
                    message.channel.send({ embed });
                } else {
                    let embed = new Discord.RichEmbed();
                    embed.setColor(0x9900FF)
                    embed.setTitle("Battlefield Hardline Status " + playername)
                    embed.setURL("http://bfhstats.com/" + plat + "/")
                    embed.setThumbnail("https://vignette.wikia.nocookie.net/battlefield/images/7/78/Battlefield_Hardline.png/revision/latest?cb=20140527162857")
                    embed.addField("Error: ", "Player not identified", true)
                    embed.setFooter("Sent via " + dclient.user.username, dclient.user.avatarURL)
                    message.channel.send({ embed });
                }
            })
        }

        if (message.content.startsWith(prefix + 'mcstats')) {
            var suffix = message.content.split(" ").slice(1).join(" ");
            let embed = new Discord.RichEmbed();
            if (suffix == "" || suffix == null) return message.channel.sendMessage("Do " + prefix + "mcstats <IP:PORT> for Checking Server is Online for Minecraft!");
            request("https://eu.mc-api.net/v3/server/info/" + suffix + "/json",
                function(err, res, body) {
                    var data = JSON.parse(body);
                    if (data.online) {
                        embed.setTitle("Minecraft Server Status")
                        embed.setColor(0x00FF00)
                        embed.setThumbnail("https://cdn.worldvectorlogo.com/logos/minecraft-1.svg")
                        embed.setTimestamp()
                        embed.addField("IP: ", suffix, true)
                        embed.addField("Online Players: ", data.players.online, true)
                        embed.addField("Max Players: ", data.players.max, true)
                        embed.addField("Online: ", data.online, true)
                        embed.addField("Version: ", data.version.name, true)
                        embed.setFooter("Sent via " + dclient.user.username, dclient.user.avatarURL)
                        message.channel.send({ embed })
                    } else {
                        embed.setTitle("Minecraft Server Status")
                        embed.setColor(0xFF0000)
                        embed.setThumbnail("https://cdn.worldvectorlogo.com/logos/minecraft-1.svg")
                        embed.setTimestamp()
                        embed.addField("Is OFFLINE! ", true)
                        embed.setFooter("Sent via " + dclient.user.username, dclient.user.avatarURL)
                        message.channel.send({ embed })
                    }
                })
        }

        if (message.content.startsWith(prefix + 'bf3')) {
            //get content

            var playername = message.content.split(" ")[1];
            var plat = message.content.split(" ")[2];


            if (!message.content.split(" ")[1]) return message.reply("Please enter a user to query.");
            if (!message.content.split(" ")[2] || message.content.split(" ")[2].toLowerCase().match(/pc|ps3|360/gmi) == null) return message.reply("Please enter a platform to query. E.G ps3 / 360 = Xbox 360 / pc");
            //api

            var bf3statsapi = "http://api.bf3stats.com/" + plat + "/player/player=" + playername + "&opt=clear,rank,global";


            //url

            var bf3stats = "http://bf3stats.com/" + plat + "/";

            var url = bf3stats + playername;

            getJSON(bf3statsapi, function(err, res) {
                if (!err && typeof res.error == 'undefined') {
                    let embed = new Discord.RichEmbed();
                    embed.setColor(0x9900FF)
                    embed.setTitle("Battlefield 3 Status " + playername)
                    embed.setURL("http://bf3stats.com/" + plat + "/")
                    embed.setThumbnail("https://psmedia.playstation.com/is/image/psmedia/battlefield-3-badge-01-eu-21mar14?$HugeHero_Badge$")
                    embed.addField("Name: ", playername, true)
                    embed.addField("Platform: ", plat, true)
                    embed.addField("Your Rank: ", res.stats.rank.nr, true)
                    embed.addField("Your Skill: ", res.stats.global.elo.toFixed(0), true)
                    embed.addField("Your K/D: ", res.stats.global.elo_games.toLocaleString(), true)
                    embed.setFooter("Sent via " + dclient.user.username, dclient.user.avatarURL)
                    message.channel.send({ embed });
                } else {
                    let embed = new Discord.RichEmbed();
                    embed.setColor(0x9900FF)
                    embed.setTitle("Battlefield 3 Status " + playername)
                    embed.setURL("http://bf3stats.com/" + plat + "/")
                    embed.setThumbnail("https://psmedia.playstation.com/is/image/psmedia/battlefield-3-badge-01-eu-21mar14?$HugeHero_Badge$")
                    embed.addField("Error: ", "Player not identified", true)
                    embed.setFooter("Sent via " + dclient.user.username, dclient.user.avatarURL)
                    message.channel.send({ embed });
                }
            })
        }

        if (message.content.startsWith(prefix + 'fnl')) {
            let embed = new Discord.RichEmbed();
            if (isSubscriber(message.author.id)) {
                try {
                    //get content

                    var playername = message.content.split(" ")[1];
                    var plat = message.content.split(" ")[2];

                    if (!message.content.split(" ")[1]) return message.reply("Please enter a user to query.");
                    if (!message.content.split(" ")[2] || message.content.split(" ")[2].toLowerCase().match(/pc|xbl|psn/gmi) == null) return message.reply("Please enter a platform to query. E.G Xbox Live = xbl / PSN = psn / PC = pc");

                    var fortnitestatsapi = { url: "https://api.fortnitetracker.com/v1/profile/" + plat + "/" + playername, headers: { 'trn-api-key': config.discord.fnltrnkey } };



                    //url

                    var fortnitestats = "https://fortnitetracker.com/profile/pc/";

                    var url = fortnitestats + playername;

                    request(fortnitestatsapi, function(err, res, body) {
                        var info = JSON.parse(body);
                        if (!err && typeof info.error == 'undefined') {
                            let embed = new Discord.RichEmbed();
                            embed.setColor(0x9900FF)
                            embed.setTitle("Fortnite Status " + playername)
                            embed.setURL("https://fortnitetracker.com/profile/pc/" + playername)
                            embed.setThumbnail("https://cdn2.unrealengine.com/Fortnite%2Fsearch-for-survivors%2FsignupBanner-155x221-7d1f31411baf91e6cadf490c6f60f98a72b38b4c.png")
                            embed.addField("Name: ", playername, true)
                            embed.addField("Platform: ", plat, true)
                            embed.addField("Top 3s: ", info.lifeTimeStats[0].value, true)
                            embed.addField("Top 5s: ", info.lifeTimeStats[1].value, true)
                            embed.addField("Top 6s: ", info.lifeTimeStats[3].value, true)
                            embed.addField("Top 12s: ", info.lifeTimeStats[4].value, true)
                            embed.addField("Top 25s: ", info.lifeTimeStats[5].value, true)
                            embed.addField("Score: ", info.lifeTimeStats[6].value, true)
                            embed.addField("Match Played: ", info.lifeTimeStats[7].value, true)
                            embed.addField("Wins: ", info.lifeTimeStats[8].value, true)
                            embed.addField("Wins %: ", info.lifeTimeStats[9].value, true)
                            embed.addField("Kills: ", info.lifeTimeStats[10].value, true)
                            embed.addField("K/D: ", info.lifeTimeStats[11].value, true)
                            embed.addField("Time Played: ", info.lifeTimeStats[13].value, true)
                            embed.addField("Avg survival Time: ", info.lifeTimeStats[14].value, true)
                            message.channel.send({ embed });
                        } else {
                            let embed = new Discord.RichEmbed();
                            embed.setColor(0x9900FF)
                            embed.setTitle("Fortnite Status " + playername)
                            embed.setURL("https://fortnitetracker.com/profile/pc/" + playername)
                            embed.setThumbnail("https://cdn2.unrealengine.com/Fortnite%2Fsearch-for-survivors%2FsignupBanner-155x221-7d1f31411baf91e6cadf490c6f60f98a72b38b4c.png")
                            embed.addField("Error: ", info.error, true)
                            message.channel.send({ embed });
                        }
                    })
                } catch (err) {
                    message.channel.send("Error Occred: Command might be Broken or Unvalid command!")
                }
            } else {
                message.channel.send("Sorry, you do not have permissisons to use this command, **" + message.author.username + "**. You need be subscriber on Pateron or Gamewisp Access this.")
            }
        }

        if (message.content.startsWith(prefix + 'overwatch')) {
            if (!message.content.split(" ")[1]) return message.reply("Please enter a user to query.");
            if (message.content.split(" ")[2] && message.content.split(" ")[2].toLowerCase().match(/pc|psn|xbl/gmi) !== null) {
                var username = message.content.split(" ")[1].replace(/#/gmi, "-");
                if (message.content.split(" ")[2].toLowerCase().match(/pc|psn|xbl/gmi)[0] !== "pc") {
                    username = username.replace(/([\w\W]*)-\d+/gmi, '$1');
                }
                request({
                    url: "https://owapi.net/api/v3/u/" + username + "/blob?platform=" + message.content.split(" ")[2].match(/pc|psn|xbl/gmi)[0],
                    headers: {
                        "user-agent": "CHISDEALHDINC ( Discord )"
                    }
                }, function(error, response) {
                    if (response == undefined) {
                        return console.log("User doesn't exist.")
                    }
                    var body = JSON.parse(response.body) || {};
                    if (body.error == 404) {
                        return message.reply("Username doesn't exist, please be sure to check your cases.")
                    } else if (body.error == 429) {
                        return message.reply(body.msg);
                    } else if (body.error) {
                        return message.reply(body.msg);
                    }
                    var current_regions = Object.keys(body);
                    var temp = current_regions.indexOf("_request");
                    current_regions.splice(temp, 1);
                    var regions = [];
                    var tempdata = {};
                    for (i = 0; i < current_regions.length; i++) {
                        if (body[current_regions[i]] !== null) {
                            tempdata[current_regions[i]] = body[current_regions[i]]
                        }
                    }
                    //                 Headache starts here
                    var number = 3;
                    var spacing = message.content.toLowerCase().split(" ");
                    if (spacing[3] === "full_dump") {
                        var start = new Date().getTime();
                        fs.writeFile('./Overwatch-' + start + '-' + spacing[1] + '.json', JSON.stringify(tempdata, null, 4), function() {
                            message.channel.send({
                                embed: {
                                    title: spacing[1],
                                    description: "Full Overwatch Statistic Dump",
                                    image: {
                                        url: tempdata[Object.keys(tempdata)[0]].stats.quickplay.overall_stats.avatar
                                    }
                                },
                                files: ['./Overwatch-' + start + '-' + spacing[1] + '.json']
                            }).then(function() {
                                fs.unlink('./Overwatch-' + start + '-' + spacing[1] + '.json');
                            })
                        })
                    } else if (spacing[3] === "profile") {
                        var fielders = [];
                        var sure = [];
                        Object.keys(tempdata[Object.keys(tempdata)[Math.floor(Math.random() * (Object.keys(tempdata).length - 1) + 0.5)]].stats.quickplay.overall_stats).forEach(function(s, v) {
                            if (s == "avatar" || s == "rank_image") return;
                            fielders[v] = {};
                            fielders[v].name = s;
                            fielders[v].value = tempdata[Object.keys(tempdata)[0]].stats.quickplay.overall_stats[s] || "None";
                            fielders[v].inline = true;
                            sure.push(fielders[v]);
                        });
                        var continues = message.content.split(" ")[2].match(/pc|psn|xbl/gmi)[0] + "/" + Object.keys(tempdata)[0] + "/" + username + ")";
                        if (message.content.split(" ")[2].match(/pc|psn|xbl/gmi)[0] == "psn") {
                            var continues = message.content.split(" ")[2].match(/pc|psn|xbl/gmi)[0] + "/" + username + ")";
                        }
                        message.channel.send({
                            embed: {
                                description: "[" + spacing[1] + "](https://playoverwatch.com/en-us/career/" + continues,
                                thumbnail: {
                                    url: tempdata[Object.keys(tempdata)[0]].stats.quickplay.overall_stats.avatar
                                },
                                fields: sure,
                                color: 4678050
                            }
                        })
                    } else if (spacing[3] === "gamestats") {
                        var fielders = [];
                        var sure = [];
                        Object.keys(tempdata[Object.keys(tempdata)[Math.floor(Math.random() * (Object.keys(tempdata).length - 1) + 0.5)]].stats.quickplay.game_stats).forEach(function(s, v) {
                            if (s == "avatar" || s == "rank_image") return;
                            fielders[v] = {};
                            fielders[v].name = s;
                            fielders[v].value = tempdata[Object.keys(tempdata)[0]].stats.quickplay.game_stats[s] || "None";
                            if (typeof fielders[v].value === "number") {
                                fielders[v].value = Math.floor(fielders[v].value);
                            }
                            fielders[v].inline = true;
                            sure.push(fielders[v]);
                        });
                        var continues = message.content.split(" ")[2].match(/pc|psn|xbl/gmi)[0] + "/" + Object.keys(tempdata)[0] + "/" + username + ")";
                        if (message.content.split(" ")[2].match(/pc|psn|xbl/gmi)[0] == "psn") {
                            var continues = message.content.split(" ")[2].match(/pc|psn|xbl/gmi)[0] + "/" + username + ")";
                        }
                        message.channel.send({
                            embed: {
                                description: "[" + spacing[1] + "](https://playoverwatch.com/en-us/career/" + continues,
                                thumbnail: {
                                    url: tempdata[Object.keys(tempdata)[0]].stats.quickplay.overall_stats.avatar
                                },
                                fields: sure,
                                color: 4678050
                            }
                        })
                    } else {
                        // Temporary Data of the body keeps appending.
                        function cleaner(spacing, tempdata, number) {
                            return new Promise(function(resolve, reject) {
                                if (typeof tempdata === "object") {
                                    var ss = tempdata;
                                    tempdata = {};
                                    for (i = 0; Object.keys(ss).length > i; i++) {
                                        if (ss[Object.keys(ss)[i]] !== null) {
                                            tempdata[Object.keys(ss)[i]] = ss[Object.keys(ss)[i]]
                                        }
                                    }
                                }
                                if (!spacing[number]) {
                                    if (typeof tempdata === "object") message.reply("Current options: ```\n" + Object.keys(tempdata).join(" ") + "```");
                                    if (typeof tempdata === "array") message.reply("Your collection: ```\n" + tempdata.join(", ") + "```");
                                    if (typeof tempdata === "string" || typeof tempdata === "number") message.reply(tempdata);
                                } else if (spacing[number] && spacing[number].match(Object.keys(tempdata).join("|"))) {
                                    tempdata = tempdata[spacing[number].match(Object.keys(tempdata).join("|"))[0]];
                                    cleaner(spacing, tempdata, (number + 1));
                                }
                            })
                        }
                        cleaner(spacing, tempdata, number);
                    }
                })
            } else {
                message.channel.send("Please enter a valid platform: `psn, xbl, pc`\n```Syntax: <command> <usertag> <platform> <(region:kr, eu, us, na)|(full_dump)|(profile)>```");
            }
        }

        if (message.content === prefix + 'server') {
            if (message.guild.available = true) {
                console.log("Server has been SCANNED at " + message.guild.name)
                if (message.guild.iconURL = null) {
                    var iconURL = "https://newagesoldier.com/wp-content/uploads/2016/12/masdclient.png";
                } else {
                    var iconURL = message.guild.iconURL;
                }
                let embed = new Discord.RichEmbed();
                embed.setTitle(message.guild.name)
                embed.setFooter("Sent via " + dclient.user.username, dclient.user.avatarURL)
                embed.setColor(0x9900FF)
                embed.setThumbnail(iconURL)
                embed.setTimestamp()
                embed.addField("Server ID", message.guild.id, true)
                embed.addField("Region", message.guild.region, true)
                embed.addField("Owner", message.guild.owner, true)
                embed.addField("Members", message.guild.memberCount, true)
                embed.addField("Roles", message.guild.roles.size, true)
                embed.addField("Channels", message.guild.channels.size, true)
                embed.addField("Created At", message.guild.createdAt)
                embed.addField("Joined Server At", message.guild.joinedAt)

                message.channel.send({ embed })
            }
        }

        if (message.content === prefix + 'servers') {
            let embed = new Discord.RichEmbed();
            embed.setColor(0x9900FF)
            embed.setThumbnail(dclient.user.avatarURL)
            embed.addField("Name: ", dclient.user.username, true)
            embed.addField("ID: ", dclient.user.id, true)
            embed.addField("Created: ", dclient.user.createdAt, true)
            embed.addField("Servers Connected!: ", dclient.guilds.size, true)
            embed.addField("Owner: ", config.owner, true)
            embed.addField("OwnerID: ", config.owner_id, true)
            embed.setFooter("Sent via " + dclient.user.username, dclient.user.avatarURL)
            embed.setTimestamp()

            message.channel.send({ embed })
        }

        /*if (message.content.startsWith(prefix + 'help')) {
            message.channel.sendMessage("", {
                embed: {
                    color: 2590000,
                    author: {
                        name: dclient.user.username,
                        icon_url: dclient.user.avatarURL
                    },
                    title: 'click here for Commands',
                    url: 'https://docs.google.com/document/d/1X2HHJ4wSkMZPs-uYBkkPjVM2FUuG4ZfTtCDntExxttM/edit?usp=sharing',
                    description: 'Where all commands Kept at.',
                    fields: [{
                            name: 'Running on:',
                            value: process.release.name + ' version ' + process.version.slice(1)
                        },
                        {
                            name: ' Created in Discord.js',
                            value: ' Version: ' + Discord.version + ' [DiscordJS](https://github.com/hydrabolt/discord.js/).'
                        }
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: dclient.user.avatarURL,
                        text: 'Sent via ' + dclient.user.username
                    }
                }
            });
        }*/

        if (message.content.startsWith(prefix + 'help')) {
            message.channel.sendMessage("Help command not be DONE! please read &>comingsoon for more INFO!");
        }

        if (message.content.startsWith(prefix + 'patreon')) {
            let embed = new Discord.RichEmbed();
            embed.setColor(0x9900FF)
            embed.setTitle("Patreon Info (Click HERE!)")
            embed.setThumbnail(dclient.user.avatarURL)
            embed.setURL("https://www.patreon.com/krampuscommunity")
            embed.addField("Coal Krampus: $5", "Info Coming SOON!", true)
            embed.addField("Iron Krampus: $10", "Info Coming SOON!", true)
			embed.addField("Gold Krampus: $15", "Info Coming SOON!", true)
			embed.addField("Diamond Krampus: $20", "Info Coming SOON!", true)
			embed.addField("Emerald Krampus: $25", "Info Coming SOON!", true)
            embed.setFooter("Sent via " + dclient.user.username, dclient.user.avatarURL)
            embed.setTimestamp()

            message.channel.send({ embed })
        }

        if (message.content.startsWith(prefix + 'comingsoon')) {
            let embed = new Discord.RichEmbed();
            embed.setColor(0x9900FF)
            embed.setTitle("Whats Coming SOON!")
            embed.setThumbnail(dclient.user.avatarURL)
            embed.addField("This is Schedule Whats going be made", "(WARNING!) \nThere will be some BUGS and Issues, so Please Report it @ \n https://discord.gg/5xpb8gV", true)
            embed.addField("TODO List", "Empty", true)
            embed.addField("TODO:", "Workign on Mixer/Twitch BOT. \nWorking on Accoint for Steam.", true)
            embed.addField("Working ON:", "Commands List. \nDeleting commands dont need.", true)
            embed.addField("DONE:", "Empty", true)
            embed.setFooter("Sent via " + dclient.user.username, dclient.user.avatarURL)
            embed.setTimestamp()

            message.channel.send({ embed })
        }

        if (message.content.startsWith(prefix + 'invite')) {
            let embed = new Discord.RichEmbed();
            embed.setColor(0x9900FF)
            embed.setTitle("Invite BOT!")
            embed.setURL("https://discordapp.com/oauth2/authorize?permissions=1341643849&scope=bot&client_id=" + client_id)
            embed.setThumbnail(dclient.user.avatarURL)
            embed.addField("Welcome to", dclient.user.username+" BOT!", true)
            embed.addField("Please Read", "First before do stuff!", true)
            embed.addField("To access SUB commands", "You need be in DISCORD @ https://discord.gg/5xpb8gV", true)
            embed.addField("IF you done Pateron and didn't came threw", "Please Contact OWNERS, Moderators @ HERE: https://discord.gg/5xpb8gV", true)
            embed.addField("All Donations goes to", "VPS Payments \nGame Servers \nWebsite hosting \nDomain", true)
            embed.addField("Rules", "Read <#415583630400815124> for more INFO!", true)
            embed.addField("Supporting", "Mental Health via Games", true)
            embed.addField("Charity", "Empty", true)
            embed.setFooter("Sent via " + dclient.user.username, dclient.user.avatarURL)
            embed.setTimestamp()

            message.channel.send({ embed })
        }
		
        if (message.content.startsWith(prefix + 'twitch')) {
            var suffix = message.content.split(" ").slice(1).join(" ");
            if (suffix == "" || suffix == null) return message.channel.sendMessage("Do " + config.prefix + "twitch <username?> for Online Status!");
            request("https://api.twitch.tv/kraken/streams/" + suffix + "?client_id=" + twitch_api_key, function(error, response, body) { //set info for the streamer in JSON
                if (error) {
                    console.log('Error encounterd: ' + err);
                    message.channel.send("Horrible stuff happend D:. Try again later.");
                    return;
                }
                if (!error && response.statusCode == 200) {
                    var stream = JSON.parse(body);
                    if (stream.stream) {
                        let embed = new Discord.RichEmbed();
                        embed.setColor(0x9900FF)
                        embed.setThumbnail(stream.stream.preview.large)
                        embed.setURL(stream.stream.channel.url)
                        embed.addField("Online", stream.stream.stream_type, true)
                        embed.addField("Title", stream.stream.channel.status, true)
                        embed.addField("Followers", stream.stream.channel.followers, true)
                        embed.addField("Game", stream.stream.channel.game, true)
                        embed.addField("Watching", stream.stream.viewers, true)
                        embed.addField("Total Views", stream.stream.channel.views, true)
                        embed.addField("Joined Twitch", stream.stream.channel.created_at, true)
                        embed.addField("Partnered", stream.stream.channel.partner, true)
                        embed.setFooter("Sent via " + dclient.user.username, dclient.user.avatarURL)
                        embed.setTimestamp()

                        message.channel.send({ embed })

                    } else {
                        message.reply("if error finding that streamer, be Offline or are you sure that was the correct name?")
                    }
                }
            })
        }

        if (message.content.startsWith(prefix + 'setname')) {
            if (isCommander(message.author.id)) {
                let suffix = message.content.split(" ").slice(1).join(" ")
                dclient.user.setUsername(suffix)
                message.channel.send("Username bene SET")
            } else {
                message.channel.send("Sorry, you do not have permissisons to use this command, **" + message.author.username + "**.")
            }
        }

        /*if (message.content.startsWith(prefix + 'emoji')) {
            message.channel.send("<:chislogo:411189995731288064> <a:acongablob:396521772687818753>")
        }*/

        if (message.content.startsWith(prefix + 'Subs')) {
            if (isSubscriber(message.author.id)) {
                var id = message.content.split(" ").slice(1).join(" ");
                request("https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + id + "&key=" + config.discord.youtube_api_key, function(err, resp, body) {
                    try {
                        var parsed = JSON.parse(body);
                        if (parsed.pageInfo.resultsPerPage != 0) {
                            for (var i = 0; i < parsed.items.length; i++) {
                                if (parsed.items[i].id.channelId) {
                                    request("https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" + parsed.items[i].id.channelId + "&key=" + config.discord.youtube_api_key, function(err, resp, body) {
                                        var sub = JSON.parse(body);
                                        if (sub.pageInfo.resultsPerPage != 0) {
                                            let embed = new Discord.RichEmbed();
                                            embed.setColor(0x9900FF)
                                            embed.setTitle(id + " Youtube Channel!")
                                            embed.setURL("https://www.youtube.com/channel/" + parsed.items[i].id.channelId)
                                            embed.setThumbnail("http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c548.png")
                                            embed.addField("Name: ", parsed.items[i].snippet.channelTitle, true)
                                            embed.addField("Subscribers: ", sub.items[0].statistics.subscriberCount, true)
                                            embed.addField("Videos on YouTube!: ", sub.items[0].statistics.videoCount, true)
                                            embed.addField("Active Viewer: ", sub.items[0].statistics.viewCount, true)
                                            embed.setFooter("Sent via " + dclient.user.username, dclient.user.avatarURL)
                                            embed.setTimestamp()
                                            message.channel.send({ embed });
                                        } else message.channel.send("Nothing found");
                                    })
                                    break;
                                }
                            }
                        } else message.channel.send("Nothing found");
                    } catch (e) {
                        message.channel.send(e);
                    }
                })
            } else {
                message.channel.send("Sorry, you do not have permissisons to use this command, **" + message.author.username + "**. You need be subscriber on Pateron or Gamewisp Access this.")
            }
        }
        if (message.content.startsWith(prefix + 'hypixel')) {
            var suffix = message.content.split(" ").slice(1).join(" ");
            if (suffix == "" || suffix == null) return message.channel.sendMessage("Do " + config.prefix + "hypixel <username?> for Hypixel Status!");
            request("https://api.hypixel.net/player?key=" + config.discord.hypixelAPI + "&name=" + suffix, function(error, response, body) { //set info for the streamer in JSON
                if (error) {
                    console.log('Error encounterd: ' + err);
                    message.channel.send("Horrible stuff happend D:. Try again later.");
                    return;
                }
                var json = JSON.parse(body);
                if (!error && response.player == null) {
                    if (json.player !== null) {
                        var lastLogin = new Date(json.player.lastLogin);
                        var firstLogin = new Date(json.player.firstLogin);
                        let embed = new Discord.RichEmbed();
                        embed.setColor(8311585)
                        embed.setAuthor("HypixelAPI", "https://i.imgur.com/n7gOYrE.png", "https://hypixel.net/")
                        embed.setDescription(suffix + "'s Profile")
                        embed.setThumbnail("https://crafatar.com/renders/body/" + json.player.uuid + "?size=100&overlay")
                        if (json.player.newPackageRank == "MVP_PLUS") {
                            embed.addField("Rank", "MVP+", true)
                        } else
                        if (json.player.newPackageRank == "MVP") {
                            embed.addField("Rank", "MVP", true)
                        } else
                        if (json.player.newPackageRank == "VIP_PLUS") {
                            embed.addField("Rank", "VIP+", true)
                        } else
                        if (json.player.newPackageRank == "VIP") {
                            embed.addField("Rank", "VIP", true)
                        } else
                        if (json.player.rank == "YOUTUBER") {
                            embed.addField("Rank", "YouTuber", true)
                        } else
                        if (json.player.newPackageRank == null) {
                            embed.addField("Rank", "Member", true)
                        }
                        if (json.player.networkLevel) {
                            embed.addField("Network Level", json.player.networkLevel, true)
                        } else
                        if (json.player.networkLevel == null) {
                            embed.addField("Network Level", "Rank Disabled or Removed", true)
                        }
                        if (json.player.networkExp) {
                            embed.addField("Network Experiance", json.player.networkExp, true)
                        } else
                        if (json.player.networkExp == null) {
                            embed.addField("Network Experiance", "NULL", true)
                        }
                        if (json.player.karma) {
                            embed.addField("Karma", json.player.karma, true)
                        } else
                        if (json.player.karma == null) {
                            embed.addField("Karma", "NULL", true)
                        }
                        if (json.player.firstLogin) {
                            embed.addField("Joined Hypixel on", firstLogin, true)
                        } else
                        if (json.player.firstLogin == null) {
                            embed.addField("Joined Hypixel on", "Hasnt Joined Server Before", true)
                        }
                        if (json.player.lastLogin) {
                            embed.addField("Last seen on", lastLogin, true)
                        } else
                        if (json.player.lastLogin == null) {
                            embed.addField("Last seen on", "Hasnt Joined Server Before", true)
                        }
                        embed.setFooter("Sent via " + dclient.user.username, dclient.user.avatarURL)
                        embed.setTimestamp()
                        message.channel.send({ embed });

                    } else {
                        let embed = new Discord.RichEmbed();
                        embed.setColor(13632027)
                        embed.setAuthor("HypixelAPI", "https://i.imgur.com/dxJzbAL.png", "https://hypixel.net/")
                        embed.setDescription(suffix + "'s Profile")
                        embed.addField("An error occured while executing the command Mojang API error: ", "Invalid username", true)
                        embed.setFooter("Sent via " + dclient.user.username, dclient.user.avatarURL)
                        embed.setTimestamp()
                        message.channel.send({ embed });
                    }
                }
            })
        }
    });

    dclient.login(token);
};
