const assert = require('assert');
const { createDriver } = require('../helpers/driver');
const { waitPageLoad, findByText } = require('../helpers/ui');

const BASE_URL = process.env.BASE_URL || 'https://senai-testes-sistema.onrender.com/';

describe('Página inicial', function () {
  let driver;

  beforeEach(async function () {
    driver = await createDriver();
  });

  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it('deve abrir o sistema no Chrome', async function () {
    await driver.get(BASE_URL);
    await waitPageLoad(driver);

    const title = await driver.getTitle();

    assert.ok(
      title.toLowerCase().includes('reserva') || title.toLowerCase().includes('notebook') || title.toLowerCase().includes('carrinhos'),
      `Título inesperado: ${title}`
    );
  });

  it('deve exibir conteúdo relacionado ao sistema de reserva', async function () {
    await driver.get(BASE_URL);
    await waitPageLoad(driver);

    await findByText(driver, 'Reserva');
  });
});
