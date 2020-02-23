const axios = require("axios"); 
const fs = require("fs"); 
const path = require("path"); 
const puppeteer = require('puppeteer'); 

const askQuestions = require("./askQuestions"); 
const generateHTML = require("./generateHTML"); 

// Function to call GitHub Api
async function callAPI(username, colorChosen){

    // First API call to get user Info
    const queryUrl1 = `https://api.github.com/users/${username}`;
    const resName = await axios.get(queryUrl1);
    
    // Second API call to get Starred Repositories Info
    const queryUrl2 = `https://api.github.com/users/${username}/starred`;
    const resStarred = await axios.get(queryUrl2);
       
    // Function to generate HTML based on user info provided 
    await generateHTML(username, colorChosen, resName, resStarred);
      
    // Function to create a PDF from the html created using PUPPETEER npm library
    const createPDF = async (colorChosen, generateHTML) => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const options = {
            path: `./pdf/${username}_PDF.pdf`,
            format:'A4'
        };

        const contentHtml = await fs.readFileSync(path.resolve(__dirname, `../${username}.html`)).toString('utf-8');
        await page.setContent(contentHtml);
        await page.waitForSelector('main');

        await page.pdf(options);
        await page.screenshot({ path: 'screenshot.png', fullPage: true });

        await page.close();
        await browser.close();

        console.log("pdf compiled")
    }

    //calling the function to create PDF
    createPDF();

};

module.exports = callAPI;