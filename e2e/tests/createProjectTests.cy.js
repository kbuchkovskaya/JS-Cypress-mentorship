import CreateNewProjectPage from "../../support/pageObjects/CreateNewProjectPage"

const { faker } = require('@faker-js/faker');

describe('create project tests', () => {

    const createNewProjectPage = new CreateNewProjectPage()

    let projectName = faker.lorem.word()

    before(() => {
        cy.userRegistration()
        cy.welcomePageVerification()
        cy.signOut()
    })

    beforeEach(() => {
        cy.loginUser()
        createNewProjectPage.visit()
        createNewProjectPage.openCreateBlankProjectWizard()
    })

    it('create blank project page tests', () => {
        cy.url().should('eq', 'https://gitlab.testautomate.me/projects/new#blank_project')
    })

    it('create new project with visibility level = private', () => {
        createNewProjectPage.enterProjectName(projectName)
        createNewProjectPage.createNewProject()
        cy.readUserData().then((user) => {
            cy.url().should('eq', `https://gitlab.testautomate.me/${user.userName}/${projectName}`)
        })
    })

    it('validate project name has already taken', () => {
        createNewProjectPage.enterProjectName(projectName)
        createNewProjectPage.createNewProject()
        cy.fixture('projectValidations').then((validationMessage) => {
            createNewProjectPage.getValidationMessage(validationMessage.takenProjectName).should('be.visible')
            createNewProjectPage.getValidationMessage(validationMessage.takenProjectPath).should('be.visible')
        })
        
    })


})