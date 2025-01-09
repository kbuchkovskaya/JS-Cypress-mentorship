import WelcomePage from "../../support/pageObjects/WelcomePage"

require('./registration.cy')

describe('welcome page tests', () => {

    const welcomePage = new WelcomePage()

    before(() => {
        cy.loginUser()
    })

    it('', () => {
        welcomePage.selectRole('Data Analyst')
        welcomePage.selectGitLabPurpose('I want to learn the basics of Git')
        welcomePage.clickGetStarted()
        cy.url().should('eq', 'https://gitlab.testautomate.me/')
    })

})