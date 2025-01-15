class DashboardPage {

    elements = {
        createProjectButton : () => cy.contains('Create a project')
    }

    openCreateProjectPage() {
        this.elements.createProjectButton().click()
    }

}

export default DashboardPage