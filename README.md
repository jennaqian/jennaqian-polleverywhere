# Take Home Assessment Overview
In approaching this take-home assessment, I opted for Puppeteer as my preferred JavaScript framework. Being an avid user of Chrome, the decision was straightforward. Despite lacking prior experience in Puppeteer, testing, and script writing, I supplemented my knowledge by watching video tutorials and studying the provided documentation.

### Project Setup
To initiate the project:

Created a GitHub repository.
Cloned it into the local terminal.
Initialized the project and installed Puppeteer using npm.

### Implementation Details
Utilizing an async function for its benefits, such as leveraging await to pause execution until promises are resolved, the assessment proceeded as follows:

#### Automated Clicking on "Malevolent":
Employed a selector from the web page to automate clicks on the word "Malevolent."
Checked the length of buttons; if less than three, logged an error message.
Navigated to the response page after clicking on the third word/button.

#### Observing Percentage Correlation:
Extracted selectors with the amount of clicks for each option (a, b, c, or d).
Summed up the total clicks, compared individual word clicks to the sum, calculated the percentage, and logged results to the console.

#### Button Clickability Test:
Ensured each button is clickable and examined the correlation with the response page.
Found that the percentage changes based on the clicked button.

### Error Handling
Implemented a try-catch mechanism for error handling throughout the assessment.

### Future Improvements
Given more time, the following enhancements are envisioned:

Refining selectors to directly grab words for console logging.
Code consolidation by using a single for loop for percentage calculation.
