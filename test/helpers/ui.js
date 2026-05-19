const { By, until } = require('selenium-webdriver');

async function waitPageLoad(driver) {
  await driver.wait(async () => {
    const state = await driver.executeScript('return document.readyState');
    return state === 'complete';
  }, 10000);
}

async function findByText(driver, text, timeout = 10000) {
  const xpath = `//*[contains(normalize-space(.), "${text}") and not(*[contains(normalize-space(.), "${text}")])]`;
  await driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
  return driver.findElement(By.xpath(xpath));
}

async function clickByText(driver, text, timeout = 10000) {
  const exactXpath = `//a[normalize-space(.)="${text}"] | //button[normalize-space(.)="${text}"]`;
  const partialXpath = `//a[contains(normalize-space(.), "${text}")] | //button[contains(normalize-space(.), "${text}")]`;
  const exactElements = await driver.findElements(By.xpath(exactXpath));
  const elements = exactElements.length > 0 ? exactElements : await driver.findElements(By.xpath(partialXpath));
  const element = elements.length > 0 ? elements[0] : await findByText(driver, text, timeout);

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
    for (const element of elements) {
      if (await element.isDisplayed()) {
        await element.click();
        return;
      }
    }
    if (elements.length > 0) {
      await driver.executeScript('arguments[0].click();', elements[0]);
      return;
    }
  }

  throw new Error(`Nenhum botao encontrado com os textos: ${texts.join(', ')}`);
}

async function fillModalFields(driver, values) {
  const fields = await driver.findElements(By.css('.modal-overlay input, .modal-overlay textarea'));

  if (fields.length < values.length) {
    throw new Error(`Esperava pelo menos ${values.length} campos no modal, mas encontrei ${fields.length}.`);
  }

  for (let i = 0; i < values.length; i++) {
    await fields[i].clear();
    await fields[i].sendKeys(values[i]);
  }
}

async function selectModalOptionByValue(driver, selectIndex, value) {
  const selects = await driver.findElements(By.css('.modal-overlay select'));

  if (selects.length <= selectIndex) {
    throw new Error(`Select ${selectIndex} nao encontrado no modal.`);
  }

  await selects[selectIndex].findElement(By.css(`option[value="${value}"]`)).click();
}

async function selectFirstPageOptionByValue(driver, value) {
  await driver.wait(until.elementLocated(By.css('select')), 10000);
  const select = await driver.findElement(By.css('select'));
  await select.findElement(By.css(`option[value="${value}"]`)).click();
}

module.exports = {
  waitPageLoad,
  findByText,
  clickByText,
  fillFirstAvailableInput,
  clickFirstButtonByPossibleTexts,
  fillModalFields,
  selectModalOptionByValue,
  selectFirstPageOptionByValue
};
