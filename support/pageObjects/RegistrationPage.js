class RegistrationPage {
    
    elements = {
        firstNameInput : () => cy.get('#new_user_first_name'),
        lastNameInput : () => cy.get('#new_user_last_name'),
        userNameInput : () => cy.get('#new_user_username'),
        emailInput : () => cy.get('#new_user_email'),
        passwordInput : () => cy.get('#new_user_password'),
        registerButton : () => cy.get('input[data-disable-with="Register"]'),
    }
    
    visit() {
        cy.visit('https://gitlab.testautomate.me/users/sign_up')
    }

    getFirstNameInput(){
        return this.elements.firstNameInput()
    }

    getLastNameInput(){
        return this.elements.lastNameInput()
    }

    getEmailInput(){
        return this.elements.emailInput()
    }

    getUserNameInput(){
        return this.elements.userNameInput()
    }

    getPasswordInput(){
        return this.elements.passwordInput()
    }

    fillFirstName(username){
        this.elements.firstNameInput().type(username)
    }

    fillLastName(lastname){
        this.elements.lastNameInput().type(lastname)
    }

    fillUsername(username){
        this.elements.userNameInput().type(username)
    }

    fillEmail(email){
        this.elements.emailInput().type(email)
    }

    fillPassword(password){
        this.elements.passwordInput().type(password)
    }

    registerAction(){
        this.elements.registerButton().click()
    }

    getUserNameValidation(validation){
        return this.elements.userNameInput().nextUntil(`*:contains("${validation}")`)
    }

    getPasswordValidation(validation){
        return this.elements.passwordInput().nextUntil(`*:contains("${validation}")`)
    }


}

export default RegistrationPage