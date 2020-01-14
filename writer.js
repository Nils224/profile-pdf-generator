const html = require("./generateHTML");
const fs = require("fs");

function writeToFile(fileName, color, user, stars) {
    fs.writeFile(fileName, html.generateHTML(color, user, stars), function (error) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("developer profiled");
        }
    })
};

module.exports = {
    writeToFile: writeToFile
  }