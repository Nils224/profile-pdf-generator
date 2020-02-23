
const inquirer = require("inquirer"); 
const callAPI1 = require('./callApi'); 

// questions to ask user
function askQuestions(){
    const questions = [
        {
            message: "Enter your GitHub username:",
            name: "username"
        },
        {
            type: 'list',
            message: "Choose any color",
            choices: ['grey', 'green', 'blue', 'pink', 'red', 'multicolor'],
            name: "colorChosen"
        }
    ];
    
    // call GitHub Api's get information based on users input

    inquirer.prompt(questions)

    .then(function({username, colorChosen}) {
        callAPI1(username, colorChosen);
    });
};    


module.exports = askQuestions;