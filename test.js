const puppeteer = require('puppeteer')

const poll = "https://pollev.com/qainterview880"

const main = async () => {
    // Launch browser with UI
    const browser = await puppeteer.launch({headless:false});

    // Opens a new page 
    const page = await browser.newPage();

    // Navigate to poll page 
    await page.goto(poll, {waitUntil: "networkidle0"});

}

main();