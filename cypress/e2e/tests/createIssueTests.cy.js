import IssueDeailsPage from "../pageObjects/pages/IssueDetailsPage"
import IssuesPage from "../pageObjects/pages/IssuesPage"
import ProjectsPage from "../pageObjects/pages/ProjectsPage";
import ProjectMenu from "../pageObjects/sections/ProjectMenu";

const { faker, he } = require('@faker-js/faker');

describe('create an issue tests', () => {
    let issueName = faker.lorem.word()
    let projectName = faker.lorem.word()
    let groupName = faker.lorem.word()

    const projectsPage = new ProjectsPage()
    const projecMenu = new ProjectMenu()
    const issuePage = new IssuesPage()
    const issueDetailsPage = new IssueDeailsPage()

    before(() => {
        cy.createApiUser('userInfo.json')
        cy.createApiUser('user2.json')
        cy.loginUser('userInfo.json')
    })

    it('create issue and assigned to the user', () => {
        cy.createGroup(groupName)
        cy.addMemeberToGroup('user2')
        cy.createProject(projectName)
        cy.createIssue(issueName, 'user2')

        cy.signOut()
        cy.loginUser('user2.json')

        projectsPage.openDefinedProject(projectName)

        projecMenu.openIssues()


        issuePage.openDefinedIssue(issueName)
        issueDetailsPage.closeIssue()
    })
 
})