class Header {

    elements = {
        userMenu : () => cy.get('li[data-qa-selector="user_menu"]'),
        signOutButton : () => cy.get('a[data-qa-selector="sign_out_link"]'),
        menuButton : () => cy.get('#__BVID__9'),
        menuOptions : () => cy.get('div[data-testid="menu-section"] button'),
        menuSubOptions : () => cy.xpath('//div[@data-testid="frequent-items-container"]/following-sibling::div/div[@data-testid="menu-section"]/a')
        
    }

    openUserMenu() {
        this.elements.userMenu().click()
    }

    signOut() {
        this.elements.signOutButton().click()
    }

    openMenu() {
        this.elements.menuButton().click()
    }

    selectMenuOption(menuOption) {
        this.elements.menuOptions().filter(`:contains("${menuOption}")`)
    }

    selectMenuSubOption(menuSubOption) {
        this.elements.menuSubOptions().filter(`:contains("${menuSubOption}")`)
    }

}

export default Header