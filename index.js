const { Client, Events, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const token = process.env["token"];

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (c) => {
  setTimeout(function () {
    // in leftToEight() milliseconds run this:
    sendMessage(); // send the message once
    var dayMilliseconds = 1000 * 60 * 60 * 24;
    setInterval(function () {
      // repeat this every 24 hours
      sendMessage();
    }, dayMilliseconds);
  }, leftToEight());
});

function leftToEight() {
  var d = new Date();
  return -d + d.setHours(8, 0, 0, 0);
}

function sendMessage() {
  var date1 = new Date();
  var date2 = new Date(2023, 2, 18);
  var diffDays = new Date(date2.getTime() - date1.getTime());

  var guild = client.guilds.cache.get(process.env["guildId"]);
  if (guild && guild.channels.cache.get(process.env["channelId"])) {
    guild.channels.cache
      .get(process.env["channelId"])
      .send(`@everyone Only ${diffDays.getUTCDate() - 1} days left to WAR!`);
  }
}

client.login(token);
