import UserHelper from "../support/modules/UserHelper";
import RegistrationPage from "../support/pageObjects/RegistrationPage"
import truncate from 'truncate'


describe('user registration', () => {
    const registrationPage = new RegistrationPage()
    const userHelper = new UserHelper()

    let user;

    before(() => {
        user = {
            firstName : userHelper.getRandomUser().firstName,
            lastName : userHelper.getRandomUser().lastName,
            userName : userHelper.getRandomUser().userName,
            email : userHelper.getRandomUser().email,
            password : userHelper.getRandomUser().password
        }
    })

    beforeEach(() => {
        registrationPage.visit()
    })
    
    it('all fields required', () => {
        registrationPage.registerAction()
        cy.fixture('registrationValidation').then((validationMessage) => {
            registrationPage.getFirstNameInput().should('have.attr', 'title', validationMessage.requiredField).and('not.have.attr', 'class' , ':contains("hidden)')
            registrationPage.getLastNameInput().should('have.attr', 'title', validationMessage.requiredField).and('not.have.attr', 'class' , ':contains("hidden)')
            registrationPage.getUserNameInput().should('have.attr', 'title', validationMessage.alphanumericalCharsUsername).and('not.have.attr', 'class' , ':contains("hidden)')
            registrationPage.getEmailInput().should('have.attr', 'title', validationMessage.invalidemail).and('not.have.attr', 'class' , ':contains("hidden)')
            registrationPage.getPasswordInput().should('have.attr', 'title', validationMessage.shortPassword).and('not.have.attr', 'class' , ':contains("hidden)')
        })
    })

    it('user registered succesfully', () => {
        registrationPage.fillFirstName(user.firstName)
        registrationPage.fillLastName(user.lastName)
        registrationPage.fillUsername(user.userName)
        registrationPage.fillEmail(user.email)
        registrationPage.fillPassword(user.password)
        registrationPage.registerAction()
        cy.url().should('include', '/sign_up/welcome')
    })

    it('username already registered', () => {
        registrationPage.fillUsername(user.userName)
        registrationPage.registerAction()
        cy.fixture('registrationValidation').then((validationMessage) => {
            registrationPage.getUserNameValidation(validationMessage.takenUsername).should('not.have.attr', 'hide')
            registrationPage.getUserNameInput().should('have.attr', 'title', validationMessage.alphanumericalCharsUsername).and('not.have.attr', 'class' , ':contains("hidden)')
        })
    })

    it('password less than 8 chars', () => {
        registrationPage.fillPassword(truncate(user.password, 7))
        registrationPage.registerAction()
        cy.fixture('registrationValidation').then((validationMessage) => {
            registrationPage.getPasswordInput().should('have.attr', 'title', validationMessage.shortPassword)
            registrationPage.getPasswordInput().clear()
            registrationPage.fillPassword(user.password)
            registrationPage.getPasswordInput().should('not.have.attr', 'class' , ':contains("hidden")') //do not work!!
        })
    })

    it.only('username only alphanumerical', () => {
        registrationPage.fillUsername(`!@#${user.userName}`)
        cy.fixture('registrationValidation').then((validationMessage) => {
            registrationPage.getUserNameInput().should('have.attr', 'title', validationMessage.alphanumericalCharsUsername).and('not.have.attr', 'class' , ':contains("hidden)')
            registrationPage.getUserNameInput().clear()
            registrationPage.getUserNameInput().should('have.attr', 'title', validationMessage.shortUsername)
        })
    })
})
