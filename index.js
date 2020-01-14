const inquirer = require("inquirer");
const axios = require("axios");
const writer = require("./docWriter");
const pdf = require("./pdfCreator");

const questions = [
    "github username",
    "favourite colour"
];

function init() {

    inquirer
        .prompt([
            {
                name: "usernmane",
                message: questions[0],
            },
            {
                type: "list",
                name: "colour",
                message: questions[1],
                choices: ["green", "blue", "pink", "red"]
            }
        ]).then(answers => {
            console.log(`Username: ${answers.usernmane}
        Favourite colour: ${answers.colour}`)

            axios.all([
                    axios.get(`https://api.github.com/users/${answers.usernmane}`),
                    axios.get(`https://api.github.com/users/${answers.usernmane}/starred`)
                ])
                .then( responses => {
                    writer.writeToFile(`${answers.usernmane}.html`, answers.colour, responses[0].data, responses[1].data.length);
                })
                .catch(function(error) {
                    console.log(error);
                })

                pdf.pdfCreate(answers.usernmane);
        })
};

init();