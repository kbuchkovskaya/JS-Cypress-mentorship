// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import UserHelper from "./modules/UserHelper"
import UserModel from "./modules/UserModel"
import Header from "./pageObjects/Header"
import LoginPage from "./pageObjects/LoginPage"
import RegistrationPage from "./pageObjects/RegistrationPage"
import WelcomePage from "./pageObjects/WelcomePage"

require('cypress-xpath');

//supportFile: 'cypress/support/e2e/js'

Cypress.Commands.add('createUserData', () => {
    const userHelper = new UserHelper()

    cy.task('clearFileContent', { filename: 'userInfo.json' }).then((message) => {
        cy.log(message);
    })

    let userModel = new UserModel()
    const userData = JSON.stringify(userModel, null, 1);  // Stringify data
    userHelper.writeToFile(userData);  // Write to file
    cy.wait(1000)

    cy.readUserData()
})

Cypress.Commands.add('readUserData', () => {
    const userHelper = new UserHelper()
    let userModel

    return userHelper.readFromFile('userInfo.json') // Read the file
        .then((user) => {
            userModel = user;
    })
})

Cypress.Commands.add('clearUserData', () => {
    cy.task('clearFileContent', { filename: 'userInfo.json' }).then((message) => {
        cy.log(message);
    })
})

Cypress.Commands.add('userRegistration', () => {
    const registrationPage = new RegistrationPage()

    cy.createUserData()

    cy.readUserData()
        .then((user) => {
            registrationPage.visit()
            registrationPage.fillFirstName(user.firstName)
            registrationPage.fillLastName(user.lastName)
            registrationPage.fillUsername(user.userName)
            registrationPage.fillEmail(user.email)
            registrationPage.fillPassword(user.password)
            registrationPage.registerAction()
        })
})

Cypress.Commands.add('loginUser', ()  => {
    const loginPage = new LoginPage()
    
    cy.readUserData()
        .then((user) => {
            loginPage.visit()
            loginPage.fillUserName(user.userName)
            loginPage.fillPassword(user.password)
            loginPage.signIn()
        })
})

Cypress.Commands.add('welcomePageVerification', () => {
    const welcomePage = new WelcomePage()

    welcomePage.selectRole('Data Analyst')
    welcomePage.selectGitLabPurpose('I want to learn the basics of Git')
    welcomePage.clickGetStarted()
})

Cypress.Commands.add('signOut', () => {
    const header = new Header()

    header.openUserMenu()
    header.signOut()
})

Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes('classList')) {
        return false; // Ignore the error
    }
});



