import RegistrationPage from "../support/pageObjects/RegistrationPage"

describe('user registration', () => {
    const registrationPage = new RegistrationPage()

    beforeEach(() => {
        registrationPage.visit()
    })

    it('user registered succesfully', () => {
        cy.fixture('user').then((user) => {
            registrationPage.fillFirstName(user.firstName)
            registrationPage.fillLastName(user.lastName)
            registrationPage.fillUsername(user.username)
            registrationPage.fillEmail(user.email)
            registrationPage.fillPassword(user.password)
        })
        registrationPage.registerAction()
        cy.url().should('include', '/sign_up/welcome')
    })

    it('username already registered', () => {
        cy.fixture('user').then((user) => {
            registrationPage.fillUsername(user.username)
        })
        registrationPage.registerAction()
        cy.fixture('registrationValidation').then((validationError) => {
            registrationPage.getUserNameError(validationError.takenUsername).should('not.have.attr', 'hide')
            registrationPage.getUserNameInput().should('have.attr', 'title', validationError.alphanumericalCharsUsername).and('not.have.attr', 'class' , ':contains("hidden)')
        })
    })

    it('all fields required', () => {
        registrationPage.registerAction()
        cy.fixture('registrationValidation').then((validationError) => {
            registrationPage.getFirstNameInput().should('have.attr', 'title', validationError.requiredField).and('not.have.attr', 'class' , ':contains("hidden)')
            registrationPage.getLastNameInput().should('have.attr', 'title', validationError.requiredField).and('not.have.attr', 'class' , ':contains("hidden)')
            registrationPage.getUserNameInput().should('have.attr', 'title', validationError.alphanumericalCharsUsername).and('not.have.attr', 'class' , ':contains("hidden)')
            registrationPage.getEmailInput().should('have.attr', 'title', validationError.invalidemail).and('not.have.attr', 'class' , ':contains("hidden)')
            registrationPage.getPasswordInput().should('have.attr', 'title', validationError.shortPassword).and('not.have.attr', 'class' , ':contains("hidden)')
        })
    })

    it('password less than 8 chars', () => {
        cy.fixture('user').then((user) => {
            registrationPage.fillPassword(user.shortPassword)
            registrationPage.registerAction()
            cy.fixture('registrationValidation').then((validationError) => {
                registrationPage.getPasswordInput().should('have.attr', 'title', validationError.shortPassword)
                registrationPage.getPasswordInput().clear()
                registrationPage.fillPassword(user.password)
                registrationPage.getPasswordInput().should('not.have.attr', 'class' , ':contains("hidden)')
            })
        })
    })

    it.only('username only alphanumerical', () => {
        cy.fixture('user').then((user) => {
            registrationPage.fillUsername(user.incorrectUsername)
            cy.fixture('registrationValidation').then((validationError) => {
                registrationPage.getUserNameInput().should('have.attr', 'title', validationError.alphanumericalCharsUsername).and('not.have.attr', 'class' , ':contains("hidden)')
            })
            
        })
    })
})
