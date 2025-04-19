const axios = require('axios');
const cheerio = require('cheerio');

let imageUrls = new Set(); // Use Set to prevent duplicates

/**
 * Fetches image URLs from https://www.dingusland.fun/frank
 * using a custom User-Agent header, and stores them in imageUrls set.
 * @returns {Promise<string[]>} An array of unique image source URLs
 */
async function getImageSources() {
    try {
        const url = 'https://www.dingusland.fun/frank';

        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'FrankDiscordBot/1.0 (+creeper@104.is-a.dev)'
            }
        });

        const html = response.data;
        const $ = cheerio.load(html);

        imageUrls.clear();

        $('img').each((_, img) => {
            const $img = $(img);

            // Extract from multiple attributes
            const src = $img.attr('src');
            const dataSrc = $img.attr('data-src');
            const dataImage = $img.attr('data-image');
            const srcset = $img.attr('srcset');

            if (src) imageUrls.add(src);
            if (dataSrc) imageUrls.add(dataSrc);
            if (dataImage) imageUrls.add(dataImage);

            if (srcset) {
                // srcset is a comma-separated list of URLs with size indicators
                const srcsetUrls = srcset.split(',').map(part => part.trim().split(' ')[0]);
                srcsetUrls.forEach(url => imageUrls.add(url));
            }
        });

        return Array.from(imageUrls);
    } catch (err) {
        console.error('Error fetching image sources:', err.message);
        return [];
    }
}

module.exports = {
    getImageSources,
    imageUrls,
};
