require('./registration.cy')
require('./login.cy')
require('./welcome.cy')

describe('Combined Tests', () => {

    it('test run', () => {
        cy.log('successfylly passed')
    })
    
})