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
2. **Yarn** (gerenciador de pacotes)
   - Execute:
   - `corepack enable` - para habilitar as features adicionais do node que vêm por padrão desligadas
   - `yarn --version` - pra conferir que o yarn ta instalado

### Instalação do projeto

1. Clone o repositório:

   - `git clone https://github.com/carolemesc/demoqa-playwright.git`

2. Entre na pasta do projeto:

   - `cd demoqa-playwright`

3. Instale as dependências:
   - `yarn install`

## Instalação do Playwright

- Documentação oficial: [Playwright Docs](https://playwright.dev/docs/intro)
- Execute dentro da pasta do projeto:
  - `yarn create playwright`

## Comandos para rodar os testes  
- Para rodar todos os testes no modo headless:  
  - `yarn playwright test`  

- Para rodar os testes com interface visível (headed):  
  - `yarn playwright test --headed`  

- Para rodar os testes no modo debug (step by step):  
  - `yarn playwright test --debug`  

- Para rodar uma suíte específica (exemplo "textBox") no modo debug:  
  - `yarn playwright test textBox --debug` 
