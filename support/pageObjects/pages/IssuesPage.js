class IssuesPage {

    elements = {
        //fisrt issue
        newIssueButton : () => cy.contains('New issue'),
        issueTitle : () => cy.get('#issue_title'),
        assigneeButton : () => cy.get('button[data-field-name="issue[assignee_ids][]"]'),
        searchUsersInput : () => cy.get('input[placeholder="Search users"]'),
        assigneeDropdownMenu : () => cy.get('.dropdown-menu'),
        availableAssignees : () => cy.xpath('//li[@data-user-id]'),
        createIssueButton : () => cy.contains('Create issue'),

        //2nd, 3rd etc issue
        issuesListElements : () => cy.get('a[data-qa-selector="issuable_title_link"]')
    }

    openNewIssueFrom() {
        this.elements.newIssueButton().click({force: true})
        cy.url().should('contain', 'issues/new')
    }

    enterIssueTitle(issueTitle) {
        this.elements.issueTitle().type(issueTitle)
    }

    assignIssueToTheUser(user) {
        this.elements.assigneeButton().click()
        this.elements.assigneeDropdownMenu().should('be.visible')
        this.elements.searchUsersInput().type(user).then(() => {
            this.elements.availableAssignees().should('exist', user)
            this.elements.availableAssignees().filter(`:contains("${user}")`).click()
        })
    }

    createIssue() {
        this.elements.createIssueButton().click()
    }

    openDefinedIssue(issueName) {
        this.elements.issuesListElements().filter(`:contains("${issueName}")`).click()
        cy.url().should('contain','/issues/1')
    }
}

export default IssuesPage