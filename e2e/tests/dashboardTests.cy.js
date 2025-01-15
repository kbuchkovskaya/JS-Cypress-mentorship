import DashboardPage from "../../support/pageObjects/DashboardPage"

describe('dashboard tests', () => {

    const dashboardPage = new DashboardPage()

    before(() => {
        cy.userRegistration()
        cy.welcomePageVerification()
    })

    it('create a project', () => {
        dashboardPage.openCreateProjectPage()
        cy.url().should('eq', 'https://gitlab.testautomate.me/projects/new')
    })
})