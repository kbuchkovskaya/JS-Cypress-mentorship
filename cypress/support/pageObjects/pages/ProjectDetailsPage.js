class ProjectDetailsPage {

    elements = {
        projectName : () => cy.get('h1[data-qa-selector="project_name_content"]'),
        projectCreationAlert : () => cy.get('div[data-qa-selector="flash_container"]')
    }

    checkProjectName(projectName) {
        this.elements.projectName().should('contain', projectName)
    }

    checkProjectAlertCreation(projectName) {
        this.elements.projectCreationAlert().invoke('text').then((text) => {
            expect(text.trim()).to.equal(`Project '${projectName}' was successfully created.`)
        })
    }

}

export default ProjectDetailsPage