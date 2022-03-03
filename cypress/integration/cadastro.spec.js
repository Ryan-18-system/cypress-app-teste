import SignupPage from '../pages/SignupPage'
import SignupFactory from '../factories/signupFactory'
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
})
