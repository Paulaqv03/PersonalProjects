const pageScraper = require('./pageScraper');

async function scrapeAll(browserInstance) {
    let browser;
    try{
        browser = await browserInstance;
        await pageScraper.scraper(browser);
    }catch(e){
        console.log("Could not resolve the browser instance => ", e)
    }
}

module.exports = (browserInstance) => scrapeAll(browserInstance);