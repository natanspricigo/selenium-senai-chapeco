# Selenium WebDriver - SENAI Testes Sistema

Projeto de testes automatizados com **Selenium WebDriver + JavaScript + Chrome** para o sistema Reserva de Notebooks do SENAI.

Sistema testado:

```txt
https://senai-testes-sistema.onrender.com/
```

API base usada para reset dos dados:

```txt
https://senai-testes-sistema.onrender.com/api
```

## 1. Requisitos

- Node.js instalado
- Google Chrome instalado
- VSCode recomendado

Verifique:

```bash
node -v
npm -v
```

## 2. Instalação

```bash
npm install
```

## 3. Executar os testes

Rodar todos os testes:

```bash
npm test
```

Rodar com o Chrome visível:

```bash
npm run test:visible
```

Rodar suites específicas:

```bash
npm run test:home
npm run test:professores
npm run test:carrinhos
npm run test:reservas
npm run test:api-docs
```

## 4. Estrutura

```txt
test/
  helpers/
    driver.js       # configura o Chrome
    resetApi.js     # restaura os dados antes dos testes
    ui.js           # funções auxiliares para interagir com a UI
  specs/
    api-docs.test.js
    carrinhos.test.js
    home.test.js
    professores.test.js
    reservas.test.js
```

## 5. Testes iniciais

- Cada arquivo de teste possui um caso inicial pronto.
- Os demais fluxos ficam como exercícios para os alunos.
- Helpers de UI já incluem funções úteis para cadastro, modal e select.

## 6. Observação para aula

Os testes usam seletores por texto e CSS genéricos para facilitar a didática. Em projetos reais, o ideal é adicionar atributos próprios para teste no HTML, por exemplo:

```html
<button data-testid="btn-salvar-professor">Salvar</button>
```

E no Selenium:

```js
await driver.findElement(By.css('[data-testid="btn-salvar-professor"]')).click();
```
