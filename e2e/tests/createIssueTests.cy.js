import IssueDeailsPage from "../../support/pageObjects/pages/IssueDetailsPage"
import IssuesPage from "../../support/pageObjects/pages/IssuesPage"
import ProjectsPage from "../../support/pageObjects/pages/ProjectsPage";
import ProjectMenu from "../../support/pageObjects/sections/ProjectMenu";

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
        cy.сreateApiUser('userInfo.json')
        cy.сreateApiUser('user2.json')
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

    /*it('close opened issue', () => {

    })*/
})