const assert = require('assert');
const { createDriver } = require('../helpers/driver');
const { resetDatabase } = require('../helpers/resetApi');
const {
  waitPageLoad,
  clickByText,
  fillFirstAvailableInput,
  clickFirstButtonByPossibleTexts,
  findByText
} = require('../helpers/ui');

const BASE_URL = process.env.BASE_URL || 'https://senai-testes-sistema.onrender.com/';

describe('Professores', function () {
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

  it('deve acessar a área de professores', async function () {
    await clickByText(driver, 'Professores');
    await findByText(driver, 'Professor');
  });

  it('deve cadastrar um professor pela interface', async function () {
    await clickByText(driver, 'Professores');

    try {
      await clickByText(driver, 'Novo');
    } catch (error) {
      await clickByText(driver, 'Adicionar');
    }

    await fillFirstAvailableInput(driver, [
      'Professor Teste Selenium',
      'professor.selenium@senai.br'
    ]);

    await clickFirstButtonByPossibleTexts(driver, ['Salvar', 'Cadastrar', 'Enviar']);

    await findByText(driver, 'Professor Teste Selenium');

    const bodyText = await driver.findElement({ css: 'body' }).getText();
    assert.ok(bodyText.includes('Professor Teste Selenium'));
  });
});
