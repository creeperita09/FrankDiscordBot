const { SlashCommandBuilder } = require('discord.js');
const { getImageSources } = require('../utils/images');
const { AttachmentBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('image')
        .setDescription('Get a random picture of Frank!')
        .setContexts([0, 1, 2])
        .setIntegrationTypes([0, 1]),
    async execute(interaction) {
        // Get imageUrls from the function
        const imageUrls = await getImageSources();
        // Ensure that imageUrls is not empty before trying to access it
        if (imageUrls.length > 0) {
            const imageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];

            // Create an Attachment from the image URL
            const attachment = new AttachmentBuilder(imageUrl);

            // Send the image as a file
            await interaction.reply({files: [attachment] });
        } else {
            await interaction.reply({ content: 'No images found.' });
        }
    },
};
