const { By, until } = require('selenium-webdriver');

async function waitPageLoad(driver) {
  await driver.wait(async () => {
    const state = await driver.executeScript('return document.readyState');
    return state === 'complete';
  }, 10000);
}

async function findByText(driver, text, timeout = 10000) {
  const xpath = `//*[contains(normalize-space(.), "${text}")]`;
  await driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
  return driver.findElement(By.xpath(xpath));
}

async function clickByText(driver, text, timeout = 10000) {
  const element = await findByText(driver, text, timeout);
  await driver.wait(until.elementIsVisible(element), timeout);
  await element.click();
}

async function fillFirstAvailableInput(driver, values) {
  const inputs = await driver.findElements(By.css('input'));

  if (inputs.length < values.length) {
    throw new Error(`Esperava pelo menos ${values.length} campos, mas encontrei ${inputs.length}.`);
  }

  for (let i = 0; i < values.length; i++) {
    await inputs[i].clear();
    await inputs[i].sendKeys(values[i]);
  }
}

async function clickFirstButtonByPossibleTexts(driver, texts) {
  for (const text of texts) {
    const elements = await driver.findElements(By.xpath(`//button[contains(normalize-space(.), "${text}")]`));
    if (elements.length > 0) {
      await elements[0].click();
      return;
    }
  }

  throw new Error(`Nenhum botão encontrado com os textos: ${texts.join(', ')}`);
}

module.exports = {
  waitPageLoad,
  findByText,
  clickByText,
  fillFirstAvailableInput,
  clickFirstButtonByPossibleTexts
};
