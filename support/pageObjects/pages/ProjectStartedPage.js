class ProjectStartedPage {

    elements = {
        projectStatusAlert : () => cy.get('div[data-testid="alert-info"]')

    }
}

export default ProjectStartedPage