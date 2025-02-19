import LoginPage from "../../support/pageObjects/pages/LoginPage"

describe ('log in page', () => {
  const loginPage = new LoginPage()

  beforeEach(() => {
    cy.create
    loginPage.visit()
  })

  it('user not found', () => {
    loginPage.fillUserName('kate')
    loginPage.fillPassword('kkkkate111')
    loginPage.signIn()
    cy.fixture('registrationValidation').then((validationMessage) => {
      loginPage.getBasicValidation().should('have.text', validationMessage.invalidUserData)
    })

  })

  /*it('user successfully logged in (WEB user)', () => {
    cy.loginUser()
    cy.url().should('include', 'users/sign_up/welcome')

  })*/

  it('user successfully logged in (API user)', () => {
    cy.loginUser('userInfo.json')
    cy.url().should('eq', 'https://gitlab.testautomate.me/users/sign_up/welcome')

  })

  it('register new user', () => {
    loginPage.registerNewUser()
    cy.url().should('eq', 'https://gitlab.testautomate.me/users/sign_up')
  })

})
