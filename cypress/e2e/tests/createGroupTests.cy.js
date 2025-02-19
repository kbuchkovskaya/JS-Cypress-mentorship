import GroupDetailsPage from "../../support/pageObjects/pages/GroupDetailsPage"
const { faker } = require('@faker-js/faker');

describe('new group tests', () => {
    const groupDatilsPage = new GroupDetailsPage()

    let groupName = faker.lorem.word()

    before(() => {
        cy.createApiUser('userInfo.json')
        cy.loginUser('userInfo.json')
    })

    it('create new group', () => {
        cy.createGroup(groupName)
        groupDatilsPage.checkGroupName(groupName)
        groupDatilsPage.checkGroupCreationAlert(groupName)
    })
})