import "cypress-real-events/support";

class GroupNavigation {

    elements = {
        groupInfoButton : () => cy.get('a[aria-label="Group information"]'),
        groupInfoMenu : () => cy.get('.sidebar-sub-level-items'),
        membersButton : () => cy.get('li[data-track-label="members"]')
    }

    hoverOverGroupInfoButton() {
        this.elements.groupInfoButton()
            .should('be.visible')
            .realHover()
            .then(() => {
                this.elements.groupInfoMenu().should('be.visible')
            })
        
    }

    openGroupMembers() {
        this.elements.membersButton().click()
    }
}

export default GroupNavigation