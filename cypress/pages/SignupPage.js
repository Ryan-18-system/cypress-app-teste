class SignupPage {
  go() {
    cy.visit('/')
    cy.get('a[href^="/deliver"]').click()
    cy.get('#page-deliver form h1').should(
      'have.text',
      'Cadastre-se para  fazer entregas'
    )
  }
  fillForm(deliver) {
    cy.get('.field input[name^="fullName"]').type(deliver.name)
    cy.get('.field input[name^="cpf"]').type(deliver.cpf)
    cy.get('.field input[name^="email"]').type(deliver.email)
    cy.get('.field input[name^="whatsapp"]').type(deliver.whatsapp)
    cy.get('.field input[name^="postalcode"]').type(deliver.address.postalcode)
    cy.get('.field input[type="button"][value="Buscar CEP"] ').click()

    // após o click, ele valida se as informações retornadas condizem com o esperado.
    cy.get('.field input[type="text"][name="address-number"]').type(
      deliver.address.number
    )
    cy.get('.field input[type="text"][name="address-details"]').type(
      deliver.address.details
    )
    cy.get('.field input[name="address"][placeholder="Rua"]').should(
      'have.value',
      deliver.address.street
    )
    cy.get('.field input[name="district"]').should(
      'have.value',
      deliver.address.district
    )
    cy.get('.field input[name="city-uf"]').should(
      'have.value',
      deliver.address.city_state
    )
    // validando método de entrega
    cy.contains('.delivery-method li', deliver.delivery_method).click()

    // validando  upload de imagens, através da biblioteca  cypress-file-upload
    cy.get('.dropzone input[accept^="image"]').attachFile(
      '/images/' + deliver.cnh
    )
  }
  submit() {
    //enviando formulário
    cy.get('form button[type^="submit"]').click()
  }
  modalContentShouldBe(expectedMessage) {
    cy.get('.swal2-container .swal2-html-container').should(
      'have.text',
      expectedMessage
    )
  }
  alertMessageShouldBe(expectedMessage) {
    // cy.get('.alert-error').should('have.text', expectedMessage)
    cy.contains('.alert-error', expectedMessage).should('be.visible')
  }
}
export default SignupPage
