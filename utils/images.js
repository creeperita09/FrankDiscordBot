const axios = require('axios');
const cheerio = require('cheerio');

let imageUrls = new Set();

/**
 * @returns {Promise<string[]>}
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
            const srcset = $img.attr('srcset');

            if (srcset) {
                const highestQualityUrl = srcset.split(',').pop().trim().split(' ')[0];
                imageUrls.add(highestQualityUrl);
            } else {
                const dataImage = $img.attr('data-image');
                const dataSrc = $img.attr('data-src');
                const src = $img.attr('src');

                if (dataImage) imageUrls.add(dataImage);
                else if (dataSrc) imageUrls.add(dataSrc);
                else if (src) imageUrls.add(src);
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
