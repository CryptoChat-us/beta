## **Objetivo**

> Construir toda a interface visual e estrutura lógica do front-end do CryptoChat , a partir dos arquivos .tsx exportados do Figma.
> 

---

## **Tech Stack a ser usada**

| Tecnologia | Descrição |
| --- | --- |
| **React** | Framework base (JSX/TSX) |
| **Tailwind CSS** | Estilização dos componentes |
| **TypeScript** | Tipagem e escalabilidade |
| **React Router DOM** | Navegação entre páginas |
| **Axios** | Requisições HTTP |
| **Context API** | Gerenciamento de estado (auth, chat) |
| **Framer Motion** | Animações (opcional) |
| **Vercel** | Hospedagem (deploy final) |

---

## **Explicação da Estrutura de Pastas no Windsurf**

```
css
CopiarEditar
/src
│
├── assets/              → imagens, logos e ícones
├── components/          → botões, inputs, card, avatar etc
├── layouts/             → Sidebar, Topbar, estrutura base
├── pages/               → LoginPage, Dashboard, StartPage...
├── services/            → Axios e chamadas à API
├── contexts/            → AuthContext (e futuramente ChatContext)
├── utils/               → Funções auxiliares (formatação, validação)
├── types/               → Interfaces e tipagens compartilhadas
├── App.tsx              → Roteamento principal
├── main.tsx             → Entrada da aplicação
└── index.css            → Tailwind + customização

```

---

## 📄 **Arquivos obrigatórios a serem criados**

### `tailwind.config.js` (padrão do Windsurf)

Já vem configurado no projeto, só garantir que `content` cobre a pasta `src/**/*.{js,ts,jsx,tsx}`.

No tailwind.config.js, configure as cores personalizadas da identidade do CryptoChat.

No src/index.css, importe a fonte **Sequel Sans**

- A fonte Sequel Sans deve estar registrada no index.css:

css

CopiarEditar

@font-face {

font-family: 'Sequel_Sans';

src: url('/src/assets/fonts/Sequel_Sans.woff2') format('woff2');

font-weight: normal;

font-style: normal;

}

- As classes font-sequel usadas no JSX acima fazem referência a Sequel_Sans, via Tailwind (extend.theme.fontFamily no tailwind.config.js).

---

### `index.css`

Já vem pronto no Windsurf com Tailwind instalado. Se quiser personalizar:

```css
css
CopiarEditar
@tailwind base;
@tailwind components;
@tailwind utilities;

/* font-face, scrollbar, reset ou dark mode pode vir aqui */

```

---

## 🗃️ **Organização dos arquivos TSX**

Aqui está onde colocar **cada componente que criamos do Figma**:

### `/pages`

- `StartPage.tsx`
- `LoginPage.tsx`
- `SignupStepOne.tsx`
- `SignupStepTwo.tsx`
- `DashboardExpanded.tsx`
- `DashboardCollapsed.tsx`
- `ChatMessageText.tsx`
- `ChatMessageWithMedia.tsx`

---

### `/layouts`

- `SidebarExpanded.tsx`
- `SidebarCollapsed.tsx`
- `NavigationBarV1.tsx`
- `NavigationBarV2.tsx`

---

### `/components`

- `AvatarMessage.tsx`
- `PromptBarFull.tsx`
- `PromptBarSimple.tsx`
- `LoginInput.tsx`
- `PasswordInput.tsx`
- `AuthButton.tsx`
- `GoogleButton.tsx`
- `TopBarTitle.tsx`
- `UserAvatar.tsx`
- `ChatCard.tsx` ← (cada resposta com mídia)

---

### `/services`

- `api.ts` ← configuração do Axios
- `authService.ts`
- `chatService.ts`

---

### `/contexts`

- `AuthContext.tsx` ← (login, logout, usuário logado, token etc.)

---

### `/utils`

- `validateEmail.ts`
- `getUserInitials.ts`
- `formatDate.ts` (caso use no chat)

---

### `/types`

- `User.ts`
- `Message.ts`
- `Card.ts`
- `Auth.ts`

---

## 🔄 **Rotas (App.tsx)**

```tsx
tsx
CopiarEditar
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StartPage from './pages/StartPage'
import LoginPage from './pages/LoginPage'
import SignupStepOne from './pages/SignupStepOne'
import SignupStepTwo from './pages/SignupStepTwo'
import DashboardExpanded from './pages/DashboardExpanded'
import DashboardCollapsed from './pages/DashboardCollapsed'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupStepOne />} />
        <Route path="/signup-step-2" element={<SignupStepTwo />} />
        <Route path="/dashboard" element={<DashboardExpanded />} />
        <Route path="/dashboard-compact" element={<DashboardCollapsed />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

```

---

## 🧪 **Checklist de implementação inicial no Windsurf**

### Preparação do projeto

- [x]  Instalar dependências extras se for necessário (ex: `axios`, `react-router-dom`)

### Componentização e layouts

- [ ]  Garantir que `Sidebar`, `TopBar`, `PromptBar`, `AvatarMessage`, etc. estejam **em layouts ou components**
- [ ]  Reutilizar `<AuthButton />`, `<LoginInput />` e `<GoogleButton />` onde necessário
- [ ]  Separar o componente de cada **ChatCard com mídia** em `components/ChatCard.tsx`

---

## Integração (depois da UI pronta)

- [ ]  Criar `AuthContext` para login e token
- [ ]  Criar `authService.ts` com login/cadastro
- [ ]  Integrar `PromptBar` com API do chat
- [ ]  Renderizar mensagens do chat em loop com base em `Message[]`
- [ ]  Testar todos os fluxos de tela

---

Me entregue agora:

- O conteúdo pronto de `api.ts` com axios
- O esqueleto do `AuthContext`
- O primeiro serviço (`authService.ts`)
- O roteador `App.tsx`