# Playwright Portfolio - Caroline Lemes Candido

## Sobre o Projeto

Este projeto tem como objetivo demonstrar a manipulação e automação de interações com diferentes componentes de uma aplicação utilizando [Playwright](https://playwright.dev/)t com TypeScript.

A abordagem inicial foca em criar exemplos práticos e funcionais que representam **caminhos felizes completos** (como preenchimento de inputs, upload de documentos, etc.), destacando a versatilidade e eficiência do Playwright.

As interações são realizadas na aplicação demo disponível em [DemoQA](https://demoqa.com/), que fornece uma variedade de componentes ideais para explorar e exibir diferentes técnicas de automação.

## Funcionalidades Implementadas

- 🖱️ **Testes de Interação de Elementos**:
  - 🖋️ TextBox
  - ☑️ CheckBox
  - 🔘 RadioButton
  - 🗂️ WebTables

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
