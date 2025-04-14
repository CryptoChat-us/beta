
# 📘 Documentação Técnica – Fluxos Principais do Aplicativo CryptoChat

## 🔐 Fluxo de Autenticação

O processo de autenticação é dividido em **três etapas principais**: acesso inicial, login e cadastro.

- **StartPage (`/`)**: Tela de entrada com destaque da marca e dois botões principais: “Entrar” e “Cadastrar”.
- **LoginPage (`/login`)**: Tela de login com campos para e-mail e senha. Também há a opção “Continuar com Google”. Caso o usuário não tenha conta, pode acessar o link para criar uma.
- **SignupStepOne (`/signup`)**: O usuário insere apenas seu e-mail. Ao prosseguir, é direcionado à próxima etapa.
- **SignupStepTwo (`/signup-step-2`)**: O usuário define sua senha. Após isso, finaliza o cadastro.

> Todas as telas estão estilizadas com Tailwind CSS e usam componentes reutilizáveis como `AuthButton`, `LoginInput`, `GoogleButton`.

---

## 🧠 Fluxo de Uso do Chat

Após o login, o usuário acessa o **Dashboard**, com a IA pronta para responder perguntas.

- **DashboardExpanded (`/dashboard`)**: Interface principal com a **barra lateral visível**. Inclui:
  - Menu com ícones para: Comece Aqui, Histórico, Carteira, Alertas, Jornadas e Upgrade.
  - Topbar com logo e avatar do usuário.
  - Área central com saudação da IA (com avatar) e `PromptBar`.

- **DashboardCollapsed (`/dashboard-compact`)**: Versão com sidebar recolhida, ideal para telas menores.

> Ambos os dashboards possuem a `PromptBarSimple` ou `PromptBarFull` para entrada de mensagens.

### Interações:
- O usuário envia uma pergunta → aparece um bubble com sua mensagem.
- A IA responde com:
  - Texto simples → exibido no componente `ChatMessageText`.
  - Mensagem com cards (ex: relatórios de ativos) → renderizado no `ChatMessageWithMedia`, com múltiplos `ChatCard` reutilizáveis.

---

## 🧩 Estrutura de Componentes

Todos os elementos da interface são modulares. Exemplos:
- `SidebarExpanded`, `SidebarCollapsed`, `NavigationBarV1`, `NavigationBarV2`
- `PromptBarSimple`, `PromptBarFull`
- `LoginInput`, `PasswordInput`, `AuthButton`, `ChatCard`, `UserAvatar`

---

## 🔄 Integração com API

- Todas as requisições são feitas com `axios` a partir da pasta `/services`.
- O contexto de autenticação é gerenciado via `AuthContext` (com token JWT).
- O histórico de mensagens poderá futuramente ser salvo em `ChatContext`.

> O roteamento é feito via React Router, com base no arquivo `App.tsx`.

---

## 🛠️ Considerações Técnicas

- O front-end usa React + Tailwind com tipagem em TypeScript.
- Toda a estrutura foi otimizada para funcionar no Windsurf, com deploy futuro na Vercel.
- O layout é responsivo e adaptado para telas grandes, com foco em performance e legibilidade.

---

**Este documento serve como base para onboarding de novos devs e para referência geral do time de produto.** 🔥
