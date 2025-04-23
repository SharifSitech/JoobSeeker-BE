const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeJobs(searchTerm = "developer") {
    const query = searchTerm.replace(" ", "+");
    // const url = `https://wuzzuf.net/search/jobs/?q=${query}&a=navbl`;
    const url = `https://wuzzuf.net/a/Jobs-in-Riyadh?ref=browse_jobs_by_locationq=${query}&a=navbl`;

    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const jobs = [];

        $(".css-1gatmva").each((i, el) => {
            const title = $(el).find(".css-o171kl").text().trim();
            const company = $(el).find(".css-17s97q8").text().trim().replace(/-$/, "");
            const link = $(el).find("a").attr("href");
            const location = $(el).find(".css-5wys0k").text().trim();
            let logo = $(el).find(".css-17095x3").attr("src");

            if (title && company && link && location && logo) {
                jobs.push({ title, company, link, location, logo });
            }
        });

        return jobs.slice(0, 10); // limit to 10 for now
    } catch (error) {
        console.error("Error scraping jobs:", error.message);
        return [];
    }
}

module.exports = { scrapeJobs };
