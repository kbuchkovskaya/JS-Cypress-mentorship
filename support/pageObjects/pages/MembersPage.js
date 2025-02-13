class MembersPage {

    elements = {
        inviteMembersButton : () => cy.get('button[data-qa-selector="invite_members_button"]'),
        inviteMembersPopup : () => cy.get('#invite-members-modal-2___BV_modal_content_'),
        memberItem : () => cy.get('li[role="presentation"]'),
        memberInput : () => cy.get('input[data-testid="members-token-select-input"]'),
        roleDropdown : () => cy.get('div[data-qa-selector="access_level_dropdown"]'),
        roleDropdownContents : () => cy.xpath('//div[@class="gl-new-dropdown-item-text-wrapper"][contains(., "Developer")]/p/div'), //invite member (dropdown), mentioned 'Developer' in xPath
        inviteButton : () => cy.get('button[data-qa-selector="invite_button"]')
    }

    openInvitemembersPopup(){
        this.elements.inviteMembersButton().click()
        this.elements.inviteMembersPopup().should('be.visible')
    }

    addMember(member) {
        this.elements.memberInput().type(member).then(() => {
            this.elements.memberItem().should('contain.text', member)
            this.elements.memberInput().type('{enter}')
        })
        this.elements.roleDropdown().should('be.visible').click().then(() => {
            this.elements.roleDropdownContents().click()
        })
        this.elements.inviteButton().click()
    }
}

export default MembersPage