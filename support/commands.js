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
import LoginPage from "./pageObjects/LoginPage"

//supportFile: 'cypress/support/e2e/js'

Cypress.Commands.add('loginUser', ()  => {

    const loginPage = new LoginPage()
    const userHelper = new UserHelper()
    let userModel

    return userHelper.readFromFile('userInfo.json') // Read the file
        .then((user) => {
            userModel = user;
            loginPage.visit()
            loginPage.fillUserName(userModel.userName)
            loginPage.fillPassword(userModel.password)
            loginPage.signIn()   
        }) 
       
})