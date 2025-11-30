# GitLab Viewer - OAuth2 Authentication & Integration

Este documento detalha a implementação da autenticação e a integração com a API do GitLab nesta aplicação.

## 🔐 Autenticação (OAuth 2.0)

A aplicação utiliza o protocolo **OAuth 2.0** com o fluxo **Authorization Code com PKCE** (Proof Key for Code Exchange), que é o padrão recomendado para Single Page Applications (SPAs) por oferecer maior segurança, eliminando a necessidade de armazenar o `client_secret` no front-end.

### Biblioteca Utilizada

Utilizamos a biblioteca `react-oauth2-code-pkce` para gerenciar todo o ciclo de vida da autenticação. Ela abstrai a complexidade de:

- Gerar o `code_verifier` e `code_challenge`.
- Redirecionar para o GitLab.
- Trocar o código de autorização pelo token de acesso.
- Gerenciar a sessão do usuário (armazenada em `sessionStorage`).

### Configuração e Escopos

A configuração da autenticação está centralizada no arquivo `src/main.tsx`.

**Escopos Solicitados:**

- `read_user`: Permite acesso de leitura aos dados do perfil do usuário autenticado (nome, avatar, username).
- `read_api`: Concede acesso de leitura à API do GitLab, permitindo listar projetos e repositórios aos quais o usuário tem acesso.
*Nota: Embora o nome seja `read_api`, o token também é usado para criar projetos, dependendo das permissões do usuário no GitLab.*

### Fluxo de Autenticação

1. **Início**: O usuário clica em "Login".
2. **Redirecionamento**: A aplicação redireciona para o GitLab (`VITE_GITLAB_AUTH_URL`) com o `client_id`, `redirect_uri`, `scope` e o `code_challenge`.
3. **Consentimento**: O usuário faz login no GitLab e autoriza a aplicação.
4. **Callback**: O GitLab redireciona de volta para a aplicação (`VITE_GITLAB_REDIRECT_URI`) com um `code`.
5. **Troca de Token**: A aplicação envia o `code` e o `code_verifier` original para o endpoint de token (`VITE_GITLAB_TOKEN_URL`).
6. **Acesso**: O GitLab retorna o `access_token`, que é armazenado e usado nas requisições subsequentes.

---

## 🚀 Integração com GitLab API

Todas as chamadas à API são centralizadas no `GitLabService` (`src/services/GitLabService.ts`), que injeta automaticamente o token Bearer nos headers.

### Variáveis de Ambiente Necessárias

Para rodar a aplicação, crie um arquivo `.env` na raiz do projeto `w01-oauth2/app` com as seguintes variáveis:

```env
VITE_GITLAB_CLIENT_ID=seu_application_id_do_gitlab
VITE_GITLAB_AUTH_URL=https://gitlab.com/oauth/authorize
VITE_GITLAB_TOKEN_URL=https://gitlab.com/oauth/token
VITE_GITLAB_REDIRECT_URI=http://localhost:5173/ # Ou a URL de produção
VITE_GITLAB_API_URL=https://gitlab.com/api/v4
```

### Endpoints Consumidos

A aplicação consome os seguintes endpoints da API v4 do GitLab:

#### 1. Obter Usuário Atual

- **Endpoint**: `GET /user`
- **Uso**: Recuperar informações do perfil do usuário logado (nome, avatar, ID) para exibição na interface.

#### 2. Listar Projetos (Repositórios)

- **Endpoint**: `GET /projects`
- **Parâmetros**:
  - `membership=true`: Retorna apenas projetos que o usuário é membro.
  - `simple=true`: Retorna uma versão simplificada do objeto do projeto (melhora performance).
  - `page` & `per_page`: Para paginação dos resultados.
- **Uso**: Exibir a lista de repositórios na dashboard.

#### 3. Criar Novo Projeto

- **Endpoint**: `POST /projects`
- **Body**:
  - `name`: Nome do projeto.
  - `path`: Caminho da URL (gerado a partir do nome).
  - `description`: Descrição do projeto.
  - `visibility`: Definido como `private` por padrão para segurança.
  - `initialize_with_readme`: `true/false`.
- **Uso**: Permitir que o usuário crie novos repositórios privados diretamente pela interface.

---

## 🛠️ Tecnologias Envolvidas

- **React**: Framework de UI.
- **Axios**: Cliente HTTP para realizar as requisições à API.
- **Ant Design & Shadcn UI**: Bibliotecas de componentes visuais.
- **Vite**: Build tool e servidor de desenvolvimento.
