describe('profil-sekolah', () => {
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

  it('update school profile', () => {
    cy.visit('https://daftar-ppdb2023.deltamaya.tech/sekolah/profil')
    cy.wait(1000)
    cy.get('input[name="Nama Sekolah"]')
      .clear({force: true})
      .type("SMAN 99 BANDUNG", {force: true})

    cy.get('button')
      .click()

    cy.wait(1000)

    cy.get('.toastify').find('.font-medium').should('have.text', 'Data berhasil diperbaharui')
  })

  it('update school profile empty nama sekolah', () => {
    cy.visit('https://daftar-ppdb2023.deltamaya.tech/sekolah/profil')
    cy.wait(1000)
    cy.get('input[name="Nama Sekolah"]')
      .clear({force: true})

    cy.get('button')
      .click()

    cy.get('input[name="Nama Sekolah"]')
      .should('have.value', "")
    cy.get('.text-danger')
      .should('have.text', "Nama Sekolah harus diisi")
  })

  it('get school profile', () => {
    cy.visit('https://daftar-ppdb2023.deltamaya.tech/sekolah/profil')
    cy.wait(1000)
    cy.get('input[name="NPSN"]').should('have.value', '20219271')
    cy.get('input[name="Nama Sekolah"]').should('have.value', 'SMAN 99 BANDUNG')
  })

  it('reset school profile', () => {
    cy.visit('https://daftar-ppdb2023.deltamaya.tech/sekolah/profil')
    cy.wait(1000)
    cy.get('input[name="Nama Sekolah"]')
      .clear({force: true})
      .type("SMAN 1 BANDUNG", {force: true})

    cy.get('button')
      .click()

    cy.wait(500)

    cy.get('.toastify').find('.font-medium').should('have.text', 'Data berhasil diperbaharui')
  })
})
