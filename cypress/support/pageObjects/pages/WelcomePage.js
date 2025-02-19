class WelcomePage {

    elements = {
        roleDropdown : () => cy.get('#user_role'),
        gitLabPurposeDropdown : () => cy.get('#user_registration_objective'),
        getStartedButton : () => cy.get('button[data-qa-selector="get_started_button"]')
    }

    visit() {
        cy.visit('https://gitlab.testautomate.me/users/sign_up/welcome')
    }

    selectRole(role) {
        this.elements.roleDropdown().select(role)
    }

    selectGitLabPurpose(purpose) {
        this.elements.gitLabPurposeDropdown().select(purpose)
    }

    clickGetStarted() {
        this.elements.getStartedButton().click()
    }
}

export default WelcomePage