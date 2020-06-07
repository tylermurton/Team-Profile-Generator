const inquirer = require('inquirer');
const path = require("path");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const outputPath = path.resolve(__dirname, "output", "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const idArray = [];

function init() {
    function createManager() {
        console.log("Please build your team");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is the manager's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter manager's name.";
                }
            },
            {
                type: "input",
                name: "managerId",
                message: "What is the manager's id?",
                
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is the manager's email?",
                validate: answer => {
                    const pass = answer.match(/\S+@\S+\.\S+/);
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid email address.";
                }
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is the manager's office number?",
                validate: answer => {
                    const pass = answer.match(/^[1-9]\d*$/);
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid office number.";
                }
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            teamMembers.push(manager);
            idArray.push(answers.managerId);
            createTeam();
        })
    }

    function createTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "Which type of team member would you like to add?",
                choices: [
                    "Engineer",
                    "Intern",
                    "No more team members to add"
                ]
            }
        ]).then(userChoice => {
            switch (userChoice.memberChoice) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    buildTeamPage();
            }
        });
    }

    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is the engineer's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter engineer's name.";
                }
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is the engineer's id?",
                
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is the engineer's email?",
                validate: answer => {
                    const pass = answer.match(/\S+@\S+\.\S+/);
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid email address.";
                }
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is the engineer's Github username?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a Github username."
                }
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            teamMembers.push(engineer);
            idArray.push(answers.engineerId);
            createTeam();
        });
    }

    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is the intern's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter intern's name.";
                }
            },
            {
                type: "input",
                name: "internId",
                message: "What is the intern's id?",
                
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is the intern's email?",
                validate: answer => {
                    const pass = answer.match(/\S+@\S+\.\S+/);
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid email address.";
                }
            },
            {
                type: "input",
                name: "internSchool",
                message: "What is the intern's school?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter intern's school.";
                }

            }
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            teamMembers.push(intern);
            idArray.push(answers.internId);
            createTeam();
        });
    }

    function buildTeamPage() {
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
        console.log("Team page created in output folder!");
    }

    createManager();



}

init();