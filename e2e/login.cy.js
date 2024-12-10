import LoginPage from "../support/pageObjects/LoginPage"

describe ('log in page', () => {
  const loginPage = new LoginPage()

  beforeEach(() => {
    loginPage.visit()
  })

  it('user not found', () => {
    cy.fixture('user').then((user) => {
      loginPage.fillUserName(user.username)
      loginPage.fillPassword(user.password)
    })
    loginPage.signIn()
  })

  it('register new user', () => {
    loginPage.registerNewUser()
  })

})
