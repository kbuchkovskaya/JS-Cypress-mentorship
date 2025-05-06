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

import UserHelper from "../e2e/modules/UserHelper"
import UserModel from "../e2e/modules/UserModel"
import Header from "../e2e/pageObjects/sections/Header"
import LoginPage from "../e2e/pageObjects/pages/LoginPage"
import RegistrationPage from "../e2e/pageObjects/pages/RegistrationPage"
import WelcomePage from "../e2e/pageObjects/pages/WelcomePage"
import CreateNewProjectPage from "../e2e/pageObjects/pages/CreateNewProjectPage"
import CreateGroupPage from "../e2e/pageObjects/pages/CreateGroupPage"
import ProjectMenu from "../e2e/pageObjects/sections/ProjectMenu"
import GroupPage from "../e2e/pageObjects/pages/GroupPage"
import IssuesPage from "../e2e/pageObjects/pages/IssuesPage"
import MembersPage from "../e2e/pageObjects/pages/MembersPage"
import GroupNavigation from "../e2e/pageObjects/sections/GroupNavigation"

import 'dotenv/config'
import IssueDeailsPage from "../e2e/pageObjects/pages/IssueDetailsPage"

Cypress.Commands.add('createUserData', (filename) => {
    const userHelper = new UserHelper()
    let userModel = new UserModel()

    const userData = JSON.stringify(userModel, null, 1);  // Stringify data
    userHelper.writeToFile(filename, userData);  // Write to file
})

Cypress.Commands.add('readUserData', (filename) => {
    const userHelper = new UserHelper()
    let userModel

    return userHelper.readFromFile(filename) // Read the file
        .then((user) => {
            userModel = user;
    })
})

Cypress.Commands.add('clearUserData', (filename) => {
    const userHelper = new UserHelper()

    userHelper.clearFile(filename)
})

Cypress.Commands.add('userRegistration', (filename) => {
    const registrationPage = new RegistrationPage()

    cy.createUserData(filename)

    cy.readUserData(filename)
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

Cypress.Commands.add('loginUser', (filename)  => {
    const loginPage = new LoginPage()
    
    cy.readUserData(filename)
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

Cypress.Commands.add('createProject', (projectName) => {
    const createProjectPage = new CreateNewProjectPage()
    const groupPage = new GroupPage()
    
    groupPage.createNewProject()

    createProjectPage.openCreateBlankProjectWizard()
    createProjectPage.enterProjectName(projectName)
    createProjectPage.createNewProject()
    
})

Cypress.Commands.add('createGroup', (groupName) => {
    const createGroupPage = new CreateGroupPage()

    createGroupPage.visit()
    createGroupPage.openCreateGroupForm()
    createGroupPage.enterGroupName(groupName)
    createGroupPage.createGroup()
})

Cypress.Commands.add('addMemeberToGroup', (filename) => {
    const groupNavigation = new GroupNavigation()
    const membersPage = new MembersPage()

    groupNavigation.hoverOverGroupInfoButton()
    groupNavigation.openGroupMembers()

    membersPage.openInvitemembersPopup()
    cy.fixture(filename).then((userInfo) => {
        membersPage.addMember(userInfo.firstName)
    })
})

Cypress.Commands.add('createIssue', (issueName, filename) => {
    const issuePage = new IssuesPage()
    const issueDetailsPage = new IssueDeailsPage()
    const projectMenu = new ProjectMenu()

    projectMenu.openIssues()

    issuePage.openNewIssueFrom()
    issuePage.enterIssueTitle(issueName)
    cy.fixture(filename).then((userInfo) => {
        issuePage.assignIssueToTheUser(userInfo.firstName)
        issuePage.createIssue()
        issueDetailsPage.checkIssueAssignee(userInfo.userName)
    })
    
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

const token = Cypress.env('GITLAB_API_TOKEN');
Cypress.Commands.add('createApiUser', (filename) => {
    cy.createUserData(filename)
    cy.readUserData(filename).then((user) => {
        cy.request({
            method: 'POST',
            url: 'https://gitlab.testautomate.me/api/v4/users',
            headers: {
                'Authorization' : `Bearer ${token}`  
            },
            body: {
                "name": user.firstName,
                "email" : user.email,
                "username" : user.userName,
                "password" : user.password,
                "skip_confirmation" : true
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
        })
    })
})




