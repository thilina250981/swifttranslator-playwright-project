# SwiftTranslator Playwright Project

This repository contains automated end-to-end tests built with **Playwright (JavaScript)** for the website:
https://www.swifttranslator.com/

## What’s Included
- **Positive Functional** test cases (Singlish → Sinhala output validation)
- **Negative Functional** test cases (known issues / incorrect outputs are detected)
- **UI Tests** (e.g., clearing input clears output, response time check for long gibberish input)

Test file location:
- `tests/neww.spec.js`

---

## Requirements
- Node.js 18+ recommended
- npm (comes with Node.js)

---

## Setup / Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/thilina250981/swifttranslator-playwright-project.git
   cd swifttranslator-playwright-project
## install dependancies 
  npm install
  
## install Playwright browsers:

npx playwright install

## Run the test file
 npx playwright test tests/neww.spec.js --project=chromium --workers=6 or
 npx playwright test tests/neww.spec.js --project=chromium 

 ## View the report 
   npx playwright show-report


















