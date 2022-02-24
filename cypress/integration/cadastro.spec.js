describe('Cadastro', () => {
  it('usuário deve se tornar um entregador', () => {
    cy.viewport(1440, 900)
    cy.visit('https://buger-eats.vercel.app')
    cy.get('a[href^="/deliver"]').click()
    cy.get('#page-deliver form h1').should(
      'have.text',
      'Cadastre-se para  fazer entregas'
    )
    let entregador = {
      nome: 'Ryan Nobrega',
      cpf: '00000014141',
      email: 'ryanlindo@hotmail.com',
      whatsapp: '11999999999',
      endereco: {
        cep: '58025140',
        rua: 'Rua Deputado Álvaro Gaudêncio',
        numero: '80',
        complemento: 'Ap 204',
        bairro: 'Treze de Maio',
        cidade_uf: 'João Pessoa/PB',
      },
      metodoEntrega: 'Moto',
      cnh: 'cnh-digital.jpg',
    }
    // Validando primeiros campos do cadastro
    cy.get('.field input[name^="name"]').type(entregador.nome)
    cy.get('.field input[name^="cpf"]').type(entregador.cpf)
    cy.get('.field input[name^="email"]').type(entregador.email)
    cy.get('.field input[name^="whatsapp"]').type(entregador.whatsapp)
    cy.get('.field input[name^="postalcode"]').type(entregador.endereco.cep)
    cy.get('.field input[type="button"][value="Buscar CEP"] ').click()

    // após o click, ele valida se as informações retornadas condizem com o esperado.
    cy.get('.field input[type="text"][name="address-number"]').type(
      entregador.endereco.numero
    )
    cy.get('.field input[type="text"][name="address-details"]').type(
      entregador.endereco.complemento
    )
    cy.get('.field input[name="address"][placeholder="Rua"]').should(
      'have.value',
      entregador.endereco.rua
    )
    cy.get('.field input[name="district"]').should(
      'have.value',
      entregador.endereco.bairro
    )
    cy.get('.field input[name="city-uf"]').should(
      'have.value',
      entregador.endereco.cidade_uf
    )
    // validando método de entrega
    cy.contains('.delivery-method li', entregador.metodoEntrega).click()

    // validando  upload de imagens, através da biblioteca  cypress-file-upload
    cy.get('.dropzone input[accept^="image"]').attachFile(
      '/images/' + entregador.cnh
    )
    //enviando formulário
    cy.get('form button[type^="submit"]').click()

    const expectedMessage =
      'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
    cy.get('.swal2-container .swal2-html-container').should(
      'have.text',
      expectedMessage
    )
  })
})
