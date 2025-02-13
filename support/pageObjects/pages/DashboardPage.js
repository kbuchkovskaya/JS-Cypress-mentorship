class DashboardPage {

    elements = {
        createProjectButton : () => cy.contains('Create a project'),
        createGroupButton : () => cy.contains('Create a group')
    }

    openCreateProjectPage() {
        this.elements.createProjectButton().click()
    }

    openCreteGroupPage() {
        this.elements.createGroupButton().click()
    }

}

export default DashboardPage