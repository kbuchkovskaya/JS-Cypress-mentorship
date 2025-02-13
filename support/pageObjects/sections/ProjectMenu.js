class ProjectMenu {

    elements = {
        projectInformation : () => cy.get('.shortcuts-project-information'),
        issues : () => cy.get('.shortcuts-issues')
    }

    openIssues() {
        this.elements.issues().click()
    }
    
}

export default ProjectMenu