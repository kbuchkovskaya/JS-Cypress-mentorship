class Header {

    elements = {
        userMenu : () => cy.get('li[data-qa-selector="user_menu"]'),
        signOutButton : () => cy.get('a[data-qa-selector="sign_out_link"]')
    }

    openUserMenu() {
        this.elements.userMenu().click()
    }

    signOut() {
        this.elements.signOutButton().click()
    }

}

export default Header