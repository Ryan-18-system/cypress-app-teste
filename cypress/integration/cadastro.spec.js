import SignupPage from '../pages/SignupPage'

import signupFactory from '../factories/signupFactory'

describe('Cadastro', () => {
  // beforeEach(function () {             // AQUI USAS-SE o arquivo  deliver.json
  //   cy.fixture('deliver').then(response => {
  //     this.deliver = response
  //   })
  // })
  const signup = new SignupPage()

  it('usuário deve se tornar um entregador', function () {
    const deliver = signupFactory.deliver()
    signup.go()
    signup.fillForm(deliver)
    signup.submit()
    const expectedMessage =
      'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
    signup.modalContentShouldBe(expectedMessage)
  })

  it('CFP INCORRETO', function () {
    const deliver = signupFactory.deliver()
    deliver.cpf = '000000141aa'
    signup.go()
    signup.fillForm(deliver)
    signup.submit()
    signup.alertMessageShouldBe('Oops! CPF inválido')
  })

  it('Incorrect email', function () {
    const deliver = signupFactory.deliver()
    deliver.email = 'user.com.br'
    signup.go()
    signup.fillForm(deliver)
    signup.submit()
    signup.alertMessageShouldBe('Oops! Email com formato inválido.')
  })
  context('Required Fields', function () {
    const messages = [
      { field: 'name', output: 'É necessário informar o nome' },
      { field: 'cpf', output: 'É necessário informar o CPF' },
      { field: 'email', output: 'É necessário informar o email' },
      { field: 'postalcode', output: 'É necessário informar o CEP' },
      { field: 'number', output: 'É necessário informar o número do endereço' },
      { field: 'delivery_method', output: 'Selecione o método de entrega' },
      { field: 'cnh', output: 'Adicione uma foto da sua CNH' },
    ]
    before(function () {
      signup.go()
      signup.submit()
    })
    messages.forEach(message => {
      it(`${message.field} is required`, () => {
        signup.alertMessageShouldBe(message.output)
      })
    })
  })
})
