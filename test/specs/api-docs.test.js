const { createDriver } = require('../helpers/driver');
const { waitPageLoad, findByText } = require('../helpers/ui');

const BASE_URL = process.env.BASE_URL || 'https://senai-testes-sistema.onrender.com/';

describe('Documentacao da API', function () {
  let driver;

  beforeEach(async function () {
    driver = await createDriver();
    await driver.get(BASE_URL);
    await waitPageLoad(driver);
  });

  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it('deve acessar a tela de rotas da API', async function () {
    await driver.get(`${BASE_URL}api-docs`);
    await waitPageLoad(driver);

    await findByText(driver, 'Rotas da API');
    await findByText(driver, '/professores');
    await findByText(driver, '/carrinhos');
    await findByText(driver, '/reservas');
  });
});
