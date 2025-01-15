import WelcomePage from "../../support/pageObjects/WelcomePage"

describe('welcome page tests', () => {

    const welcomePage = new WelcomePage()

    before(() => {
        cy.userRegistration()
    })

    it('', () => {
        cy.url().should('eq', 'https://gitlab.testautomate.me/users/sign_up/welcome')
        cy.welcomePageVerification()
        cy.url().should('eq', 'https://gitlab.testautomate.me/dashboard/projects')
    })

})