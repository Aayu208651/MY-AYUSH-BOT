const crypto = require('crypto');
const os = require("os");
const axios = require("axios");
const config = require('../config.json');
const package = require('../package.json');

module.exports.getYoutube = async function(t, e, i) {
    require("ytdl-core");
    const o = require("axios");
    if ("search" == e) {
      const e = require("youtube-search-api");
      return t ? a = (await e.GetListByKeyword(t, !1, 6)).items : console.log("Missing data")
    }
    if ("getLink" == e) {
      var a = (await o.post("https://aiovideodl.ml/wp-json/aio-dl/video-data/", {
        url: "https://www.youtube.com/watch?v=" + t
      })).data;
        return "video" == i ? {
          title: a.title,
          duration: a.duration,
          download: {
            SD: a.medias[1].url,
            HD: a.medias[2].url
          }
        } : "audio" == i ? {
          title: a.title,
          duration: a.duration,
          download: a.medias[3].url
        } : void 0
      }
};

module.exports.throwError = function (command, threadID, messageID) {
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	return global.client.api.sendMessage(global.getText("utils", "throwError", ((threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX), command), threadID, messageID);
}

module.exports.cleanAnilistHTML = function (text) {
	text = text
		.replace('<br>', '\n')
		.replace(/<\/?(i|em)>/g, '*')
		.replace(/<\/?b>/g, '**')
		.replace(/~!|!~/g, '||')
		.replace("&amp;", "&")
		.replace("&lt;", "<")
		.replace("&gt;", ">")
		.replace("&quot;", '"')
		.replace("&#039;", "'");
	return text;
}

module.exports.downloadFile = async function (url, path) {
	const { createWriteStream } = require('fs');
	const axios = require('axios');

	const response = await axios({
		method: 'GET',
		responseType: 'stream',
		url
	});

	const writer = createWriteStream(path);

	response.data.pipe(writer);

	return new Promise((resolve, reject) => {
		writer.on('finish', resolve);
		writer.on('error', reject);
	});
};

module.exports.getContent = async function(url) {
	try {
		const axios = require("axios");

		const response = await axios({
			method: 'GET',
			url
		});

		const data = response;

		return data;
	} catch (e) { return console.log(e); };
}

module.exports.randomString = function (length) {
	var result           = '';
	var characters       = 'ABCDKCCzwKyY9rmBJGu48FrkNMro4AWtCkc1flmnopqrstuvwxyz';
	var charactersLength = characters.length || 5;
	for ( var i = 0; i < length; i++ ) result += characters.charAt(Math.floor(Math.random() * charactersLength));
	return result;
}

module.exports.homeDir = function () {
	var returnHome, typeSystem;
	const home = process.env["HOME"];
	const user = process.env["LOGNAME"] || process.env["USER"] || process.env["LNAME"] || process.env["USERNAME"];

	switch (process.platform) {
		case "win32": {
			returnHome = process.env.USERPROFILE || process.env.HOMEDRIVE + process.env.HOMEPATH || home || null;
			typeSystem = "win32"
			break;
		}
		case "darwin": {
			returnHome = home || (user ? '/Users/' + user : null);
			typeSystem = "darwin";
			break;
		}
		case "linux": {
			returnHome =  home || (process.getuid() === 0 ? '/root' : (user ? '/home/' + user : null));
			typeSystem = "linux"
			break;
		}
		default: {
			returnHome = home || null;
			typeSystem = "unknow"
			break;
		}
	}

	return [typeof os.homedir === 'function' ? os.homedir() : returnHome, typeSystem];
}