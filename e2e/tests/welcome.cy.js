import WelcomePage from "../../support/pageObjects/pages/WelcomePage"

describe('welcome page tests', () => {

    //const welcomePage = new WelcomePage()

    before(() => {
        //cy.clearUserData('userInfo.json')
        cy.createApiUser('userInfo.json')
        cy.loginUser('userInfo.json')
    })

    it('set role and purpose for newly crated user', () => {
        cy.url().should('eq', 'https://gitlab.testautomate.me/users/sign_up/welcome')
        cy.welcomePageVerification()
        cy.url().should('eq', 'https://gitlab.testautomate.me/dashboard/projects')
    })

    /*after(() => {
        cy.clearUserData('userInfo.json')
    })*/

})