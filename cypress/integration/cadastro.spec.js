import SignupPage from '../pages/SignupPage'

describe('Cadastro', () => {
  before(() => {
    cy.log('Tudo aqui pe executado sempre ANTES de TODOS os casos de testes')
  })
  beforeEach(() => {
    cy.log('Tudo aqui é executado sempre ANTES de CADA caso de teste')
  })
  after(() => {
    cy.log(
      'Tudo aqui é executado uma única vez DEPOIS de TODOS os casos de testes'
    )
  })
  afterEach(() => {
    cy.log('Tudo aqui é executado sempre DEPOIS de cada caso de teste')
  })

  it('usuário deve se tornar um entregador', () => {
    let deliver = {
      name: 'Ryan Nobrega',
      cpf: '00000014141',
      email: 'ryanlindo@hotmail.com',
      whatsapp: '11999999999',
      address: {
        postalcode: '58025140',
        street: 'Rua Deputado Álvaro Gaudêncio',
        number: '80',
        details: 'Ap 204',
        district: 'Treze de Maio',
        city_state: 'João Pessoa/PB',
      },
      delivery_method: 'Moto',
      cnh: 'cnh-digital.jpg',
    }

    const signup = new SignupPage()
    signup.go()
    signup.fillForm(deliver)
    signup.submit()
    const expectedMessage =
      'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
    signup.modalContentShouldBe(expectedMessage)
  })

  it('CFP INCORRETO', () => {
    let deliver = {
      name: 'Ryan Nobrega',
      cpf: '0000AA14141',
      email: 'ryanlindo@hotmail.com',
      whatsapp: '11999999999',
      address: {
        postalcode: '58025140',
        street: 'Rua Deputado Álvaro Gaudêncio',
        number: '80',
        details: 'Ap 204',
        district: 'Treze de Maio',
        city_state: 'João Pessoa/PB',
      },
      delivery_method: 'Moto',
      cnh: 'cnh-digital.jpg',
    }
    const signup = new SignupPage()
    signup.go()
    signup.fillForm(deliver)
    signup.submit()
    signup.alertMessageShouldBe('Oops! CPF inválido')
  })
})
