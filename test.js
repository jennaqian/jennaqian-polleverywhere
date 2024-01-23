const puppeteer = require('puppeteer')

const poll = "https://pollev.com/qainterview880"

const main = async () => {
    // Launch browser with UI
    const browser = await puppeteer.launch({headless:false});

    // Opens a new page 
    const page = await browser.newPage();

    // Navigate to poll page 
    await page.goto(poll, {waitUntil: "networkidle0"});

    // Enter name and wait 2 seconds 
    await page.type('input[id="participant_presenter_relationship_screen_name"]', 'Jenna Qian')

    // Click continue to bypass modal 
    await page.click('button[data-controller="material--mdc-ripple"]')

    // Click on the button "Malevolent" for word of the day
    await page.evaluate((selector)=> {
        const buttons = document.querySelectorAll(selector)

        if(buttons.length >= 3){
            buttons[2].click();
        } else {
            console.log('There are less than three buttons matching the selector.')
        }
    }, 'button[class="component-response-multiple-choice__option__vote"]')

}

main();