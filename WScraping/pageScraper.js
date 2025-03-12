const puppeteer = require("puppeteer");

const scraperObject = {
    url:  "https://www.elempleo.com/co/ofertas-empleo/",
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        
        await page.setDefaultNavigationTimeout(0)
        await page.goto(this.url);
        await page.waitForSelector('.row');

        let urls = await page.$$eval('a.text-ellipsis.js-offer-title', links => {
            links = links.map(el => el.href);
            return links;
        });

        let pagePromise = (link) => new Promise(async (resolve, reject) => {
            let dataObj = {};
            let newPage = await browser.newPage();
            await newPage.goto(link, {waitUntil: 'load', timeout: 0} );

            dataObj['Title'] = await newPage.$eval('h1.ee-mod.ee-offer-title.js-offer-title', text => text.innerText)
            dataObj['Vacancy'] = await newPage.$eval('p.js-vacancy', text => text.innerText)
            dataObj['City'] = await newPage.$eval('span.js-joboffer-city', text => text.innerText)

            resolve(dataObj);
            await newPage.close();
        });

        for(link in urls) {
            let currentPageData = await pagePromise(urls[link]);
            console.log(currentPageData);
        }
    }
}

module.exports = scraperObject;