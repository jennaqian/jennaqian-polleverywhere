const puppeteer = require('puppeteer')

const poll = "https://pollev.com/qainterview880";
const resultsPage = 'https://viz.polleverywhere.com/multiple_choice_polls/AxE2ULWiYsaGgmZ0Zundf';
const nameSelector = 'input[id="participant_presenter_relationship_screen_name"]';
const nameText = "Jenna Qian";
const continueSelector = 'button[data-controller="material--mdc-ripple"]';
const clickBtnSelector = 'button[class="component-response-multiple-choice__option__vote"]';
const unclickBtnSelector = 'button[class="component-response-multiple-choice__option__undo"]'

const main = async () => {
    const browser = await puppeteer.launch({headless:false});

    const page = await browser.newPage();

    try {
            await page.goto(poll, {waitUntil: "networkidle0"});
        
            await page.type(nameSelector, nameText)
        
            await page.click(continueSelector)
        
            await page.evaluate(async (clickSelector, unclickSelector) => {
                const clickButtons = document.querySelectorAll(clickSelector);
                const unclickButtons = document.querySelectorAll(unclickSelector);

                for(let i = 0; i < 4; i++){
                    const clickButton = clickButtons[i];
                    const unclickButton = unclickButtons[i];

                    clickButton.click();
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    unclickButton.click();
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
                console.log('All buttons have been clicked')
            }, clickBtnSelector, unclickBtnSelector)


            await page.evaluate((selector)=> {
                const buttons = document.querySelectorAll(selector)
        
                if(buttons.length >= 3){
                    buttons[2].click();
                } else {
                    console.log('There are less than three buttons matching the selector.')
                }
            }, clickBtnSelector)

            await new Promise(resolve => setTimeout(resolve, 1000));
        
            await page.goto(resultsPage)
        
            const divSelectors = [
                ['span[id="keyword_poll_option_51559428"]>div[class="font-semibold"]','div#count_label_poll_option_51559428'],
                ['span[id="keyword_poll_option_51559429"]>div[class="font-semibold"]','div#count_label_poll_option_51559429'],
                ['span[id="keyword_poll_option_51559430"]>div[class="font-semibold"]','div#count_label_poll_option_51559430'],
                ['span[id="keyword_poll_option_51559431"]>div[class="font-semibold"]','div#count_label_poll_option_51559431']
            ]
        
            let totalValue = 0;
            let percentages = [];
        
            for (const [choiceSelector, divSelector] of divSelectors){
                await page.waitForSelector(divSelector);
        
                const spanValue = await page.$eval(choiceSelector, span => span.textContent.trim());
                const divValue = await page.$eval(divSelector, div => parseFloat(div.textContent.trim()));
        
                totalValue += divValue;
                percentages.push({spanValue, divValue})
            }
        
            for(const {spanValue, divValue} of percentages){
                const decimalNumber = divValue / totalValue;
                const percentageValue = (decimalNumber * 100).toFixed(0);
                console.log(`${spanValue} : ${percentageValue}%, ${divValue} votes out of ${totalValue}`)
            }

            await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
        console.error('Error, unable to reach URL')
    } finally {
        await browser.close()
    }

};

main();