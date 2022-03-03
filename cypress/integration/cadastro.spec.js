import SignupPage from '../pages/SignupPage'

describe('Cadastro', () => {
  beforeEach(function () {
    cy.fixture('deliver').then(response => {
      this.deliver = response
    })
  })
  const signup = new SignupPage()

  it('usuário deve se tornar um entregador', function () {
    signup.go()
    signup.fillForm(this.deliver.signup)
    signup.submit()
    const expectedMessage =
      'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
    signup.modalContentShouldBe(expectedMessage)
  })

  it('CFP INCORRETO', function () {
    signup.go()
    signup.fillForm(this.deliver.cpf_inv)
    signup.submit()
    signup.alertMessageShouldBe('Oops! CPF inválido')
  })

  it('Incorrect email', function () {
    signup.go()
    signup.fillForm(this.deliver.email_inv)
    signup.submit()
    signup.alertMessageShouldBe('Erro, email é inválido')
  })
})
