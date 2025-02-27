class ProjectsPage {

    elements = {
        projectsListItems : () => cy.get('span.project-name')
    }

    visit() {
        cy.visit('https://gitlab.testautomate.me/dashboard/projects')
    }

    openDefinedProject(projectName) {
        this.elements.projectsListItems().filter(`:contains("${projectName}")`).click()
    }

}

export default ProjectsPage