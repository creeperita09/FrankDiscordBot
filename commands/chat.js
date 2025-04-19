const { InteractionContextType, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');
const { frankChat } = require('../utils/frankChat')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('chat')
        .setDescription('Talk to frank!')
        .setContexts([0, 1, 2])
        .setIntegrationTypes([0, 1])
        .addStringOption(option =>
            option.setName('text')
                .setDescription('What you want to tell to frank')),
    async execute(interaction) {
        const input = interaction.options.getString('text') ?? 'Nothing';
        await interaction.reply({ content: frankChat(input) });
    },
};
