const Discord = require("discord.js");
const WebTorrent = require("webtorrent");
const os = require("os");

/**
 *
 * @param {WebTorrent.Torrent} torrent
 * @returns {Discord.MessageEmbed}
 */
module.exports = function (torrent) {
  return {
    description: `Press the button to cancel this torrent`,
    fields: [
      [
        {
          name: "**ETA**",
          value: `\`\`\`${fancyTimeFormat(torrent.timeRemaining / 1000)}\`\`\``,
          inline: true,
        },
        {
          name: "**Speed**",
          value: `\`\`\`${(torrent.downloadSpeed / 1000000).toFixed(
            2
          )}Mb/s\`\`\``,
          inline: true,
        },
        {
          name: "**Peers**",
          value: `\`\`\`${torrent.numPeers}\`\`\``,
          inline: true,
        },
        {
          name: "**Progress**",
          value: `\`\`\`${(torrent.progress * 100).toFixed(2)}% | ${(
            torrent.downloaded / 1000000
          ).toFixed(2)}Mb/${(torrent.length / 1000000).toFixed(2)}Mb\`\`\``,
          inline: false,
        },
        {
          name: "Ram usage",
          value: `\`\`\`${(process.memoryUsage().rss / 1048576).toFixed(
            2
          )}Mb\`\`\``,
        },
      ],
    ],
  };
};

function fancyTimeFormat(duration) {
  // Hours, minutes and seconds
  var hrs = ~~(duration / 3600);
  var mins = ~~((duration % 3600) / 60);
  var secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = "";

  if (hrs > 0) {
    ret += "" + hrs + "h:" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + "m:" + (secs < 10 ? "0" : "");
  ret += "" + secs + "s";
  return ret;
}
