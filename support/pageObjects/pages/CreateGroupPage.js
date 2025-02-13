class CreateGroupPage {

    elements = {
        createGroupButton : () => cy.contains('Create group'),
        groupNameInput : () => cy.get('#group_name'),
        groupPathInput : () => cy.get('#group_path'),
        memberEmail1Input : () => cy.get('#email-1'),
        createFinalGroupButton : () => cy.get('input[value="Create group"]')
    }

    visit() {
        cy.visit('https://gitlab.testautomate.me/groups/new')
    }

    openCreateGroupForm() {
        this.elements.createGroupButton().click()
    }

    enterGroupName(groupName) {
        this.elements.groupNameInput().type(groupName)
    }

    addMemeberToGroup(memberEmail) {
        this.elements.memberEmail1Input().type(memberEmail)
    }

    createGroup() {
        this.elements.createFinalGroupButton().click()
    }

}

export default CreateGroupPage