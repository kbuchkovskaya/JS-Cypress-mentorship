class CreateNewProjectPage {

    elements = {
        createBlankProjectButton : () => cy.contains('Create blank project'),
        projectNameInput : () => cy.get('#project_name'),
        visibilityLevelPrivateRadiobutton : () => cy.get('#project_visibility_level_0'),
        visibilityLeveleInternalRadiobutton : () => cy.get('#project_visibility_level_10'),
        visibilityLevelPublicRadiobutton : () => cy.get('#project_visibility_level_20'),
        createProjectButton : () => cy.xpath('//div[@id="blank-project-pane"]//input[@data-disable-with="Create project"]'),
        formValidations : () => cy.get('#error_explanation li')
    }

    visit() {
        cy.visit('https://gitlab.testautomate.me/projects/new')
    }

    openCreateBlankProjectWizard() {
        this.elements.createBlankProjectButton().click()
    }

    enterProjectName(projectName) {
        this.elements.projectNameInput().type(projectName)
    }

    selectProjectVisibilityLevel(visibilityLevel) {
        if(visibilityLevel = 'private'){
            this.elements.visibilityLevelPrivateRadiobutton().click()
        } else
            if (visibilityLevel = 'internal') {
                this.elements.visibilityLeveleInternalRadiobutton().click()
            } else
                this.elements.visibilityLevelPublicRadiobutton().click()
    }

    getProjectInput() {
        return this.elements.projectNameInput()
    }

    createNewProject() {
        this.elements.createProjectButton().click() 
    }

    getValidationMessage(validation) {
        return this.elements.formValidations().filter(`:contains("${validation}")`)
    }

}

export default CreateNewProjectPage