const { createDriver } = require('../helpers/driver');
const { resetDatabase } = require('../helpers/resetApi');
const {
  waitPageLoad,
  clickByText,
  findByText
} = require('../helpers/ui');

const BASE_URL = process.env.BASE_URL || 'https://senai-testes-sistema.onrender.com/';

describe('Carrinhos', function () {
  let driver;

  beforeEach(async function () {
    await resetDatabase();
    driver = await createDriver();
    await driver.get(BASE_URL);
    await waitPageLoad(driver);
  });

  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it('deve acessar a area de carrinhos', async function () {
    await clickByText(driver, 'Carrinhos');

    await findByText(driver, '+ Novo Carrinho');
    await findByText(driver, 'Carrinho 1');
  });
});
