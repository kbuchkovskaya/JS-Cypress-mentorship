import { faker } from '@faker-js/faker';
import { default as CreateNewProjectPage } from '../pageObjects/pages/CreateNewProjectPage';
import { default as ProjectDetailsPage } from '../pageObjects/pages/ProjectDetailsPage';

describe('create project tests', () => {

    const createNewProjectPage = new CreateNewProjectPage()
    const projectDetailsPage =  new ProjectDetailsPage()

    let projectName = faker.lorem.word()

    before(() => {
        cy.createApiUser('userInfo.json')
        
    })

    beforeEach(() => {
        cy.loginUser('userInfo.json')
        createNewProjectPage.visit()
        createNewProjectPage.openCreateBlankProjectWizard()
    })

    it('create blank project page tests', () => {
        cy.url().should('eq', 'https://gitlab.testautomate.me/projects/new#blank_project')
    })

    it('create new project with visibility level = private', () => {
        createNewProjectPage.enterProjectName(projectName)
        createNewProjectPage.createNewProject()
        cy.readUserData('userInfo.json').then((user) => {
            cy.url().should('eq', `https://gitlab.testautomate.me/${user.userName}/${projectName}`)
        })
        projectDetailsPage.checkProjectName(projectName)
        projectDetailsPage.checkProjectAlertCreation(projectName)
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