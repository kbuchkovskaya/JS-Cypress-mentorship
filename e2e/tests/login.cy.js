import UserHelper from "../../support/modules/UserHelper"
import LoginPage from "../../support/pageObjects/LoginPage"

describe ('log in page', () => {
  const loginPage = new LoginPage()
  const userHelper = new UserHelper()
  let userModel
  
  before(() => {
    return userHelper.readFromFile('userInfo.json') // Read the file
    .then((user) => {
      userModel = user;
    })    
  })

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

  it('user successfully logged in', () => {
    cy.loginUser()
    cy.url().should('include', 'users/sign_up/welcome')

  })

  it('register new user', () => {
    loginPage.registerNewUser()
  })

})
