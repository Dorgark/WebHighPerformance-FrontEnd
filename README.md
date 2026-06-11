# 🛍️ WebHighPerformance - Frontend

Uma plataforma de e-commerce moderno e de alta performance, desenvolvida com React e otimizada para uma experiência de usuário excepcional.

---

## ✨ Features Principais

- ✅ **Autenticação de Usuários** - Sistema seguro de login e cadastro
- ✅ **Carrinho de Compras** - Gerenciamento dinâmico com Context API
- ✅ **Dashboard Administrativo** - Painel para gerenciamento de produtos
- ✅ **Busca e Filtros** - Filtros avançados para encontrar produtos rapidamente
- ✅ **Interface Responsiva** - Design adaptável para todos os dispositivos
- ✅ **Alta Performance** - Otimizado com Vite e React moderno
- ✅ **Roteamento Avançado** - Rotas protegidas e públicas com React Router

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **[React 19](https://react.dev/)** - Biblioteca para construção de interfaces
- **[Vite 8](https://vitejs.dev/)** - Build tool ultrarrápido
- **[React Router 7](https://reactrouter.com/)** - Roteamento de aplicação
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utilitário
- **[Zustand 5](https://zustand-demo.vercel.app/)** - Gerenciamento de estado
- **[Lucide React](https://lucide.dev/)** - Ícones de alta qualidade

### Ferramentas de Desenvolvimento
- **[ESLint](https://eslint.org/)** - Linter para JavaScript
- **[Autoprefixer](https://autoprefixer.github.io/)** - Prefixos CSS automáticos
- **[PostCSS](https://postcss.org/)** - Processador de CSS

---

## 📋 Pré-requisitos

Antes de começar, você precisará ter instalado:

- **Node.js** (v18 ou superior) - [Download](https://nodejs.org/)
- **npm** ou **yarn** (gerenciador de pacotes)

Você pode verificar suas versões com:
```bash
node --version
npm --version
```

---

## 🚀 Como Instalar e Rodar

### 1️⃣ Clone o Repositório
```bash
git clone https://github.com/seu-usuario/WebHighPerformance-FrontEnd.git
cd WebHighPerformance-FrontEnd
```

### 2️⃣ Instale as Dependências
```bash
npm install
```

### 3️⃣ Rode o Servidor de Desenvolvimento
```bash
npm run dev
```

A aplicação será aberta automaticamente em `http://localhost:5173`

### 4️⃣ Construa para Produção
```bash
npm run build
```

A build otimizada será gerada na pasta `dist/`

### 5️⃣ Visualize a Produção Localmente
```bash
npm run preview
```

---

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── BarraBusca.jsx   # Barra de busca de produtos
│   ├── BotaoCarrinho.jsx # Botão do carrinho
│   ├── Filter.jsx       # Componente de filtros
│   ├── Header.jsx       # Cabeçalho da aplicação
│   └── ProductCard.jsx  # Card de produto
├── context/             # Context API para gerenciamento de estado
│   ├── CartContext.jsx  # Contexto do carrinho
│   └── CartStore.jsx    # Store do carrinho
├── pages/               # Páginas da aplicação
│   ├── Home.jsx         # Página inicial
│   ├── admin/           # Área administrativa
│   │   ├── Cadastro.jsx # Página de cadastro
│   │   ├── Dashboard.jsx # Dashboard administrativo
│   │   └── Login.jsx    # Página de login
│   └── client/          # Área do cliente
│       └── CartDrawer.jsx # Drawer do carrinho
├── services/            # Serviços e utilitários
│   └── auth.js          # Autenticação e autorizações
├── fonts/               # Fontes personalizadas
├── App.jsx              # Componente raiz
├── main.jsx             # Ponto de entrada
└── index.css            # Estilos globais
```

---

## 🔐 Autenticação

O projeto utiliza um sistema de autenticação com rotas protegidas:

- **Rotas Públicas**: Acessíveis a qualquer usuário
- **Rotas Protegidas**: Requerem autenticação para acesso

O sistema verifica a autenticação usando a função `isAuthenticated()` do serviço de auth.

---

## 🛒 Carrinho de Compras

O carrinho é gerenciado através do **Context API** com as seguintes funcionalidades:

- Adicionar/remover produtos
- Atualizar quantidades
- Calcular total
- Persistência de dados

---

## 📊 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento com HMR |
| `npm run build` | Cria build otimizada para produção |
| `npm run lint` | Verifica código com ESLint |
| `npm run preview` | Visualiza a build de produção localmente |

---

## 🌐 Deployment

O projeto está configurado para deploy na **Vercel** com o arquivo `vercel.json`.

Para fazer deploy:

1. Conecte seu repositório ao [Vercel](https://vercel.com/)
2. A build será gerada automaticamente
3. Acesse sua aplicação em `https://seu-projeto.vercel.app`

---

## 📝 Padrões de Código

Este projeto segue as melhores práticas:

- ✅ Componentes funcionais com Hooks
- ✅ Separação de responsabilidades
- ✅ Nomes descritivos para variáveis e funções
- ✅ Código limpo e bem organizado

---

## 🤝 Como Contribuir

Contribuições são bem-vindas! Para contribuir:

1. Faça um **Fork** do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um **Pull Request**

---

## 👤 Autor

Desenvolvido pela equipe FilaZero