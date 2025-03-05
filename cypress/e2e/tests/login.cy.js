import LoginPage from "../pageObjects/pages/LoginPage"

describe ('log in page', () => {
  const loginPage = new LoginPage()

  beforeEach(() => {
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

  it('user successfully logged in (API user)', () => {
    cy.loginUser('userInfo.json')
    cy.url().should('eq', 'https://gitlab.testautomate.me/')

  })

  it('register new user', () => {
    loginPage.registerNewUser()
    cy.url().should('eq', 'https://gitlab.testautomate.me/users/sign_up')
  })

  after(() => {
    cy.clearUserData('userInfo.json')
 })

})
