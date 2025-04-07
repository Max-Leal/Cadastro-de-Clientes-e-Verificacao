# 📋 Sistema de Gerenciamento de Cadastros

Este projeto é um sistema simples de **cadastro de usuários** com funcionalidades de **edição, exclusão, busca por CEP via API**, e **filtro em tempo real**. Os dados são armazenados localmente no navegador utilizando o `localStorage`.

## 🚀 Funcionalidades

- ✅ Cadastro de nome, email, telefone e endereço completo.
- 🔎 Busca automática de dados pelo CEP (via API ViaCEP).
- ✏️ Edição e exclusão de cadastros.
- 🔍 Filtro em tempo real por ID, nome, email, telefone ou CEP.
- 📦 Armazenamento persistente usando `localStorage`.
- 📱 Formatação automática do número de telefone.

## 🧪 Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript Vanilla
- API ViaCEP
- localStorage

## 📁 Estrutura do Projeto

```bash
├── index.html            # Página principal onde é feito os cadastros
├── Cadastros.html        # Página para verificação e gerenciamento de cadastros
├── styles.css            # Estilo do sistema
└── script.js             # Lógica principal do sistema
