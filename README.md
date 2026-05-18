# Selenium WebDriver - SENAI Testes Sistema

Projeto para ensinar testes automatizados com **Selenium WebDriver + JavaScript + Chrome**.

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

Rodar apenas o teste inicial:

```bash
npm run test:home
```

## 4. Estrutura

```txt
test/
  helpers/
    driver.js       # configura o Chrome
    resetApi.js     # restaura os dados antes dos testes
    ui.js           # funções auxiliares para procurar elementos
  specs/
    home.test.js
    professores.test.js
```

## 5. Observação para aula

Os testes usam seletores por texto e CSS genéricos para facilitar a didática. Em projetos reais, o ideal é adicionar atributos próprios para teste no HTML, por exemplo:

```html
<button data-testid="btn-salvar-professor">Salvar</button>
```

E no Selenium:

```js
await driver.findElement(By.css('[data-testid="btn-salvar-professor"]')).click();
```

## 6. Exercícios sugeridos

1. Criar teste para acessar a tela de notebooks.
2. Criar teste para cadastrar um notebook.
3. Criar teste para cadastrar uma reserva.
4. Criar teste para validar mensagem de erro em campos obrigatórios.
5. Criar teste para validar duplicidade de professor.
