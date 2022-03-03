const faker = require('faker')
const cpf = require('gerador-validador-cpf')
export default {
  deliver: function () {
    let firstName = faker.name.firstName()
    let lastName = faker.name.lastName()
    let data = {
      name: `${firstName} ${lastName}`,
      cpf: cpf.generate(),
      email: faker.internet.email(firstName),
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
    return data
  },
}
