const { frankChat } = require('../utils/frankChat');

module.exports = {
    name: 'messageCreate',
    execute(message, client) {
        // ignore bots
        //if (message.author.bot) return;

        if (message.content.includes('<@1363061528579936355>')){
            const input = message.content.replaceAll("<@1363061528579936355>", "frank");
            const response = frankChat(input);
            message.reply({content: response});
        }
    }
  };
  