describe('auth', () => {
  it('check logged in user', () => {
    cy.visit('https://daftar-ppdb2023.deltamaya.tech/')
    cy.get('input[name=Username]')
      .type('20219271')
    cy.get('input[name=Password]')
      .type('12345678')
    cy.get('button')
      .click().then( () => {
      cy.saveLocalStorage('user')

      cy.wait(1000)

      const user = JSON.parse(localStorage.getItem('user')) || {}
      expect(user._id).to.eq('628644b379f2ff00479852f7')
      expect(user.name).to.eq('Admin SMAN 1 BANDUNG')
      expect(user.role).to.eq('admin-highschool')
    })
  })

  it('logout user', () => {
    cy.visit('https://daftar-ppdb2023.deltamaya.tech/')
    cy.get('input[name=Username]')
      .type('20219271')
    cy.get('input[name=Password]')
      .type('12345678')
    cy.get('button')
      .click()
    cy.saveLocalStorage('user')

    cy.wait(1000)

    cy.get('[aria-haspopup=menu]').click()
    cy.contains('Logout').click().then(() => {
      cy.wait(1000)

      const user = localStorage.getItem('user')
      expect(user).to.be.null
    })
  })

  it('check wrong pasword user login', () => {
    cy.visit('https://daftar-ppdb2023.deltamaya.tech/')
    cy.get('input[name=Username]')
      .type('20219271')
    cy.get('input[name=Password]')
      .type('99999999')
    cy.get('button')
      .click()

    cy.get('.toastify').find('.font-medium').should('have.text', 'User atau password salah')
  })
})
