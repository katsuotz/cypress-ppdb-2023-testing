describe('akun-sekolah', () => {
  beforeEach(() => {
    cy.visit('https://daftar-ppdb2023.deltamaya.tech/')
    cy.get('input[name=Username]')
      .type('20219271')
    cy.get('input[name=Password]')
      .type('12345678')
    cy.get('button')
      .click()
    cy.saveLocalStorage('user')
  })

  it('get akun sekolah', () => {
    cy.visit('https://daftar-ppdb2023.deltamaya.tech/akun-sekolah')
    cy.wait(1000)
    cy.get("table tbody tr:nth-child(1)")
      .find('td:nth-child(1)').should('have.text', '1')
      .next().should('have.text', 'Admin SMAN 1 BANDUNG')
      .next().should('have.text', '20219271')
      .next().should('have.text', 'Admin')

    cy.get("table tbody tr:nth-child(2)")
      .find('td:nth-child(1)').should('have.text', '2')
      .next().should('have.text', 'Arif Ali Abdillah, M.Pd., Gr.')
      .next().should('have.text', 'Adv_Ayih')
      .next().should('have.text', 'Advisor')

    cy.get("table tbody tr:nth-child(4)")
      .find('td:nth-child(1)').should('have.text', '4')
      .next().should('have.text', 'Dicky Nugraha, S.Pd.')
      .next().should('have.text', 'Op_Dicky')
      .next().should('have.text', 'Operator')
  })

  it('add akun', () => {
    cy.visit('https://daftar-ppdb2023.deltamaya.tech/akun-sekolah')
    cy.wait(1000)
    cy.get('button').contains('Tambah Akun Baru').click({force: true})
    cy.get('input[name=Nama]').type('ABC User')
    cy.get('input[name=Username]').type('abcuser')
    cy.get('input[name=Password]').type('12345678')
    cy.get('.ts-wrapper').click({force: true})
    cy.get('[data-value="operator-highschool"]').click({force: true})
    cy.contains('Simpan').click({force: true})

    cy.wait(2000)

    cy.get("table tbody tr:nth-child(1)")
      .find('td:nth-child(1)').should('have.text', '1')
      .next().should('have.text', 'ABC User')
      .next().should('have.text', 'abcuser')
      .next().should('have.text', 'Operator')
  })

  it('add akun with same username', () => {
    cy.visit('https://daftar-ppdb2023.deltamaya.tech/akun-sekolah')
    cy.wait(1000)
    cy.get('button').contains('Tambah Akun Baru').click({force: true})
    cy.get('input[name=Nama]').type('ABC User')
    cy.get('input[name=Username]').type('abcuser')
    cy.get('input[name=Password]').type('12345678')
    cy.get('.ts-wrapper').click({force: true})
    cy.get('[data-value="operator-highschool"]').click({force: true})
    cy.contains('Simpan').click({force: true})

    cy.wait(500)

    cy.get('.toastify').find('.font-medium').should('have.text', 'Username abcuser sudah terdaftar oleh orang lain!')
  })

  it('login new user', () => {
    cy.visit('https://daftar-ppdb2023.deltamaya.tech/')
    cy.get('[aria-haspopup=menu]').click()
    cy.contains('Logout').click()

    cy.saveLocalStorage('user')

    cy.wait(1000)

    cy.get('input[name=Username]')
      .type('abcuser')
    cy.get('input[name=Password]')
      .type('12345678')
    cy.get('button')
      .click()

    cy.wait(1000)

    cy.saveLocalStorage('user')

    cy.contains('ABC User').should('have.text', 'ABC User')
    cy.contains('Operator SMA').should('have.text', 'Operator SMA')
  })

  it('delete user', () => {
    cy.visit('https://daftar-ppdb2023.deltamaya.tech/akun-sekolah')
    cy.wait(1000)

    cy.contains('ABC User')
      .parent()
      .contains('Hapus')
      .click({force: true})

    cy.get('[data-headlessui-state=open]')
      .contains('Hapus')
      .click(({force: true}))

    cy.wait(1000)

    cy.get('.toastify').find('.font-medium').should('have.text', 'Data berhasil dihapus')

    cy.get("table tbody tr:nth-child(1)")
      .find('td:nth-child(1)').should('have.text', '1')
      .next().should('not.have.text', 'ABC User')
      .next().should('not.have.text', 'abcuser')
      .next().should('not.have.text', 'Operator')
  })
})
