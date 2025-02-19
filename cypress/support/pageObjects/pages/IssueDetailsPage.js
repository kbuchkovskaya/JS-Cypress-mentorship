class IssueDeailsPage {

    elements = {
        closeIssueButton : () => cy.get('button[data-qa-selector="close_issue_button"]'),
        issueStatusBox : () => cy.get('.issuable-status-box'),
        issueAssignee : () => cy.get('div[class="block assignee qa-assignee-block"]')
    }

    closeIssue() {
        this.elements.closeIssueButton().click().then(() => {
            this.elements.issueStatusBox().should('contain.text', 'Closed')
        })
    }

    checkIssueAssignee(user) {
        this.elements.issueAssignee().should('contain', user)
    }
}

export default IssueDeailsPage