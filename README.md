# Playwright Portfolio - Caroline Lemes Candido

## Sobre o Projeto

Este projeto tem como objetivo criar um portfólio de testes automatizados utilizando [Playwright](https://playwright.dev/) com TypeScript. O foco inicial é implementar um exemplo funcional de cada tipo de teste que representa um **caminho feliz completo** (como preenchimento de inputs, upload de documentos, etc.), servindo como base para demonstrações.

Os testes são desenvolvidos para a aplicação demo disponível em [DemoQA](https://demoqa.com/), que oferece diversos componentes para praticar automação.

## Funcionalidades Implementadas

- 📝 **Testes de Formulários**: Validação do preenchimento de campos como texto, e-mail, endereços e envio de formulário.

## Como Executar

### Pré-requisitos

1. **Node.js** (versão 18 ou superior)
   - Baixe em [Node.js](https://nodejs.org/).

### Instalação do projeto

1. Clone o repositório:

   - `git clone https://github.com/carolemesc/demoqa-playwright.git`

2. Entre na pasta do projeto:

   - `cd demoqa-playwright`

3. Instale as dependências:
   - `npm install`

## Instalação do Playwright

- Documentação oficial: [Playwright Docs](https://playwright.dev/docs/intro)
- Execute dentro da pasta do projeto:
  - `npx playwright install`

## Comandos para rodar os testes  
- Para rodar todos os testes no modo headless:  
  - `npx playwright test`  

- Para rodar os testes com interface visível (headed):  
  - `npx playwright test --headed`  

- Para rodar os testes no modo debug (step by step):  
  - `npx playwright test --debug`  

- Para rodar uma suíte específica (exemplo "textBox") no modo debug:  
  - `npx playwright test textBox --debug` 
