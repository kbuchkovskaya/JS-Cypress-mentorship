import truncate from 'truncate'
import RegistrationPage from '../../support/pageObjects/RegistrationPage'
import UserHelper from '../../support/modules/UserHelper'
import UserModel from '../../support/modules/UserModel'


describe('user registration', () => {
    const registrationPage = new RegistrationPage()
    const userHelper = new UserHelper()
    let userModel

    before(() => {
        cy.task('clearFileContent', { filename: 'userInfo.json' }).then((message) => {
            cy.log(message);
        })

        let userModel1 = new UserModel()
        const userData = JSON.stringify(userModel1, null, 1);  // Stringify data
        userHelper.writeToFile(userData);  // Write to file
        cy.wait(1000)

        return userHelper.readFromFile('userInfo.json') // Read the file
        .then((user) => {
          userModel = user;
        })
    })

    /*after(() => {
        cy.task('clearFileContent', { filename: 'userInfo.json' }).then((message) => {
            cy.log(message);
        })

    })*/

    /*it('Should verify file creation', () => {
        cy.fixture('userInfo.json')
            .should('not.be.empty')  // Ensure the file is not empty
            .then((data) => {
                expect(data.firstName).to.include('Name');
                expect(data.lastName).to.include('LastName');
                expect(data.email).to.include('@example.com');
            });
    });*/


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
        registrationPage.fillFirstName(userModel.firstName)
        registrationPage.fillLastName(userModel.lastName)
        registrationPage.fillUsername(userModel.userName)
        registrationPage.fillEmail(userModel.email)
        registrationPage.fillPassword(userModel.password)
        registrationPage.registerAction()
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

    /*it('username only alphanumerical', () => {
        registrationPage.fillUsername(`!@#${userModel.userName}`)
        cy.fixture('registrationValidation').then((validationMessage) => {
            registrationPage.getUserNameInput().should('have.attr', 'title', validationMessage.alphanumericalCharsUsername).and('not.have.attr', 'class' , ':contains("hidden")')
            registrationPage.getUserNameInput().clear()
            registrationPage.getUserNameInput().should('have.attr', 'title', validationMessage.shortUsername)
        })*/

})