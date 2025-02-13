class GroupPage {

    elements = {
        newProjectButton : () => cy.contains('New project')
    }

    createNewProject() {
        this.elements.newProjectButton().click({force: true})
    }
}

export default GroupPage