describe('welcome page tests', () => {

    before(() => {
        cy.userRegistration('userInfo.json')
    })

    it('set role and purpose for newly crated user', () => {
        cy.url().should('eq', 'https://gitlab.testautomate.me/users/sign_up/welcome')
        cy.welcomePageVerification()
        cy.url().should('eq', 'https://gitlab.testautomate.me/dashboard/projects')
    })

    after(() => {
        cy.clearUserData('userInfo.json')
     })
})