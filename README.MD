# Refatoração do Projeto para CRM Imobiliário

## Descrição

Esta branch refatora o projeto original "Cálculos de Aluguel e Despesas" para evoluir em direção a um CRM imobiliário completo. A nova versão do projeto utiliza **Next.js** com **TypeScript**, **ShadCN/UI** e **Tailwind CSS** para fornecer uma base escalável e moderna para o sistema.

## Objetivos da Refatoração

- Migrar o frontend para **Next.js** com **TypeScript**.
- Adotar **ShadCN/UI** para uma interface moderna e responsiva.
- Utilizar **API Routes** para criar endpoints RESTful.
- Preparar o sistema para futuras implementações de funcionalidades de CRM imobiliário, como:
  - Cadastro de clientes, imóveis e contratos.
  - Controle financeiro e de recebimentos.
  - Notificações automatizadas.
  - Relatórios gerenciais.

## Tecnologias Utilizadas

- **Frontend:**
  - Next.js 14 (com suporte a App Router)
  - TypeScript
  - Tailwind CSS
  - ShadCN/UI

- **Backend (Planejado):**
  - Node.js com API Routes (futuramente um backend dedicado com Prisma e banco de dados relacional).

## Funcionalidades Implementadas

- Refatoração do layout utilizando ShadCN/UI.
- Paginação inicial para exibição de dados.
- Implementação de um sistema de formulários para entrada de dados (React Hook Form).

## Estrutura do Projeto

A estrutura do projeto foi reorganizada para melhor modularidade e escalabilidade:

```
src/
├── components/     # Componentes reutilizáveis
├── layouts/        # Layouts globais
├── pages/          # Páginas da aplicação
│   ├── api/        # API Routes
│   ├── auth/       # Autenticação
│   ├── contracts/  # Módulo de contratos
│   ├── properties/ # Módulo de imóveis
├── services/       # Consumo de APIs externas
├── styles/         # Estilos globais e Tailwind
├── utils/          # Funções utilitárias
```

## Instalação e Uso

### **1. Clone o Repositório**
```bash
git clone https://github.com/EderSouza93/Calculo-Rescis-o.git
cd Calculo-Rescis-o
```

### **2. Troque para a Branch de Refatoração**
```bash
git checkout refactor/crm-nextjs
```

### **3. Instale as Dependências**
```bash
npm install
```

### **4. Execute o Projeto**
```bash
npm run dev
```

O projeto estará disponível em: [http://localhost:3000](http://localhost:3000)

## Funcionalidades Planejadas

### **MVP (Mínimo Viável)**
- Cadastro de clientes, imóveis e contratos.
- Exibição de dados em tabelas interativas.
- Persistência de dados via API Routes.

### **Futuras Atualizações**
- Integração com banco de dados (PostgreSQL ou MongoDB).
- Sistema de autenticação com suporte a vários níveis de acesso.
- Relatórios PDF e envio automatizado de notificações por e-mail/SMS.

## Contribuições

Contribuições são bem-vindas! Abra um pull request ou relate um problema na página de [Issues](https://github.com/EderSouza93/Calculo-Rescis-o/issues).

## Licença

Este projeto está licenciado sob a [ISC](LICENSE).

