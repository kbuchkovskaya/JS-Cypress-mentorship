class GroupDetailsPage {

    elements = {
        groupName : () => cy.get('.home-panel-title'),
        groupCreationAlert : () => cy.get('div[data-qa-selector="flash_container"]')
    }

    checkGroupName(groupName) {
        this.elements.groupName().should('contain', groupName)
    }

    checkGroupCreationAlert(groupName) {
        this.elements.groupCreationAlert().invoke('text').then((text) => {
            expect(text.trim()).to.equal(`Group '${groupName}' was successfully created.`)
        })
    }
}

export default GroupDetailsPage