class LoginPage {

    elements = {
        userName : () => cy.get('#user_login'),
        userPassword : () => cy.get('#user_password'),
        registerUserButton : () => cy.get('a[data-qa-selector="register_link"]'),
        signInButton : () => cy.contains('Sign in'),
        invalidDataMessage : () => cy.get('div[data-testid="alert-danger"] span')
    }

    visit() {
        cy.visit('https://gitlab.testautomate.me/users/sign_in')
    }

    fillUserName(username){
        this.elements.userName().type(username)
    }

    fillPassword(password) {
        this.elements.userPassword().type(password)
    }

    signIn(){
        this.elements.signInButton().click()
    }

    registerNewUser(){
        this.elements.registerUserButton().click()
    }

    getBasicValidation(){
        return this.elements.invalidDataMessage()
    }
}

export default LoginPage