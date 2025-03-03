import truncate from 'truncate'
import RegistrationPage from '../pageObjects/pages/RegistrationPage'


describe('user registration', () => {
    const registrationPage = new RegistrationPage()
    let userModel 

    before(() => {
        cy.readUserData('userInfo.json')
            .then((user) => {
                userModel = user
            })
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
        cy.userRegistration('userInfo.json')
        cy.url().should('include', '/sign_up/welcome')
    })

    it('username already registered', () => {
        registrationPage.fillUsername(userModel.userName)
        registrationPage.registerAction()
        cy.fixture('registrationValidation').then((validationMessage) => {
            registrationPage.getUserNameValidation(validationMessage.takenUsername).should('not.have.attr', 'hide')
            registrationPage.getUserNameInput().should('have.attr', 'title', validationMessage.alphanumericalCharsUsername).and('not.have.attr', 'class' , ':contains("hidden)')
        })
    })

    it('password less than 8 chars', () => {
        registrationPage.fillPassword(truncate(userModel.password, 7))
        registrationPage.registerAction()
        cy.fixture('registrationValidation').then((validationMessage) => {
            registrationPage.getPasswordInput().should('have.attr', 'title', validationMessage.shortPassword)
            registrationPage.getPasswordInput().clear()
            registrationPage.fillPassword(userModel.password)
            registrationPage.getPasswordInput().should('not.have.attr', 'class' , ':contains("hidden")') 
        })
    })

    it('username only alphanumerical', () => {
        registrationPage.fillUsername(`!@#${userModel.userName}`)
        cy.fixture('registrationValidation').then((validationMessage) => {
            registrationPage.getUserNameInput().should('have.attr', 'title', validationMessage.alphanumericalCharsUsername).and('not.have.attr', 'class' , ':contains("hidden")')
            registrationPage.getUserNameInput().clear()
            registrationPage.getUserNameInput().should('have.attr', 'title', validationMessage.shortUsername)
        })
    })

})