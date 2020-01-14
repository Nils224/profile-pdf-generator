const puppeteer = require("puppeteer");
const fs = require("fs");

const pdfCreate = async (user) => {
    const browser =  await puppeteer.launch();
    const page = await browser.newPage();
    const options = {
        path: `./${user}.pdf`,
        format: "letter"
    };
    const content = fs.readFileSync(`./${user}.html`, "utf-8");

    await page.setContent(content);
    // await page.setContent(content, { waitUntil: "networkidle2" }); ---> npm suggested this code but not sure what it's for?
    
    await page.pdf(options);

    await browser.close();

    await console.log("profile PDF created");
}

module.exports = {
    pdfCreate: pdfCreate
}