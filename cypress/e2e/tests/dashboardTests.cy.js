import DashboardPage from "../pageObjects/pages/DashboardPage"

describe('dashboard tests', () => {

    const dashboardPage = new DashboardPage()

    before(() => {
        cy.userRegistration('userInfo.json')
        cy.welcomePageVerification()
    })

    it('create a project', () => {
        dashboardPage.openCreateProjectPage()
        cy.url().should('eq', 'https://gitlab.testautomate.me/projects/new')
    })

    after(() => {
        cy.clearUserData('userInfo.json')
     })
})