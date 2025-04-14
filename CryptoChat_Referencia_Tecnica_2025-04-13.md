# 📘 Documento Técnico de Referência — CryptoChat

## 📌 Visão Geral

**CryptoChat** é uma plataforma de IA conversacional desenvolvida para simplificar e personalizar o investimento em criptomoedas. A aplicação permite que usuários conversem com uma IA treinada, acessem relatórios personalizados, gerenciem sua carteira e recebam insights de mercado — tudo em uma interface elegante, responsiva e interativa.

---

## 🧱 Tech Stack Geral

| Camada | Tecnologias |
|--------|-------------|
| **Frontend** | React, TypeScript, TailwindCSS, React Router DOM, Context API, Framer Motion |
| **Backend** | Java (Spring Boot), WebSocket, Firebase (Auth + Firestore), OpenAI API, CoinGecko API, CoinMarketCap API, CryptoPanic API |
| **Hospedagem & DevOps** | Vercel (frontend), Firebase Hosting e Functions (backend), GitHub, Windsurf (IDE) |
| **Design** | Figma (UI) , Sequel Sans + Power Grotesk Trial (tipografia) |



## 🌐 Navegação (Rotas)

| Caminho | Componente | Descrição |
|--------|------------|-----------|
| `/` | `StartPage.tsx` | Tela de introdução com opções de login/cadastro |
| `/login` | `LoginPage.tsx` | Tela de login |
| `/signup` | `SignupStepOne.tsx` | Primeiro passo do cadastro (e-mail) |
| `/signup-step-2` | `SignupStepTwo.tsx` | Segundo passo (senha) |
| `/dashboard` | `DashboardExpanded.tsx` | Tela principal com sidebar aberta |
| `/dashboard-compact` | `DashboardCollapsed.tsx` | Tela principal com sidebar recolhida |

---

## 👥 Fluxos de Usuário

### 1. Cadastro/Login

- O usuário acessa a `StartPage`.
- Pode seguir para `/signup` ou `/login`.
- O processo de cadastro é dividido em 2 etapas (`SignupStepOne` e `SignupStepTwo`).
- Autenticação via Firebase Auth.
- Após login bem-sucedido, é redirecionado para o `/dashboard`.

### 2. Conversa com IA

- Ao acessar o dashboard, o usuário visualiza um prompt inicial e o avatar do assistente.
- Pode digitar mensagens na `PromptBar`.
- As mensagens são enviadas para o backend via chamada HTTP e/ou WebSocket.
- A IA responde com base no prompt e nos dados da carteira (se conectado).
- As mensagens são renderizadas com os componentes `AvatarMessage`, `ChatMessageText`, `ChatMessageWithMedia`.

### 3. Histórico e Funções Avançadas

- O usuário pode acessar sessões anteriores via botão "Histórico".
- Caso possua plano Pro, pode desbloquear cards especiais, visualizações premium e estratégias.
- As mensagens ficam salvas no Firestore em `/users/{uid}/conversas/`.

---

## 🧠 Backend (Java + Firebase + OpenAI)

### Estrutura:

- Spring Boot com controllers para:
  - `/auth/login`
  - `/auth/signup`
  - `/chat/send`
- Firebase Admin SDK para autenticação, tokens e Firestore.
- WebSocket (Spring WebSocket) para comunicação em tempo real no chat.
- Integração com OpenAI para geração de mensagens.
- CoinGecko API para dados de mercado em tempo real.

### Firebase:

- Auth: login/cadastro com email e senha
- Firestore:
  - `users/` → perfil do usuário
  - `conversas/` → histórico
  - `mensagens/` → prompts e respostas

---

## 🧩 Componentes Reutilizáveis

- `<LoginInput />`, `<PasswordInput />` — inputs personalizados
- `<AuthButton />`, `<GoogleButton />` — botões de ação
- `<PromptBarFull />`, `<PromptBarSimple />` — barra de prompt
- `<ChatCard />` — mensagem com mídia (gráfico, insights)
- `<AvatarMessage />` — introdução visual com assistente

---

## 📡 Integrações de API

- OpenAI (GPT): geração de respostas contextuais
- Firebase Auth: autenticação e segurança
- Firestore: persistência dos dados
- CoinGecko API: cotação e info de mercado

---

## ✅ Checklist para Devs


- [ ] Chat funcional com integração via WebSocket
- [ ] Context API gerenciando estado de login/chat
- [ ] Conexão segura com backend (Axios + token)
- [ ] Histórico sendo salvo corretamente por usuário
- [ ] Deploy final na Vercel com variáveis de ambiente

---

## 🔐 Segurança

- Firebase Auth com token JWT no header das requisições
- Regras no Firestore para isolar dados por UID
- Proteção de rotas no frontend (via contexto de auth)

---

## 🚀 Deploy

- **Frontend** → [Vercel](https://vercel.com)
- **Backend** → Firebase Functions (Java via REST)
- **Banco de Dados** → Firestore

---

## 👨‍💻 Contribuição

Este projeto está em constante expansão. Caso você seja um desenvolvedor colaborando com o CryptoChat:

- Leia este documento completo
- Confirme se está usando o padrão de componentes
- Comunique mudanças na estrutura com a equipe
- Prefira abstração e reutilização sempre que possível

---

Feito com ❤️ pela equipe CryptoChat.
