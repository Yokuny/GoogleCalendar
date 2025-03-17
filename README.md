# Google Calendar Integration Frontend

Uma aplicação web para integração entre um sistema de agendamento e o Google Calendar, permitindo a visualização e gerenciamento de eventos em diferentes formatos (mensal, semanal e diário).

## Funcionalidades

- Visualização de calendário em formatos mensal, semanal e diário
- Cadastro e gerenciamento de eventos
- Sincronização bidirecional com Google Calendar
- Autenticação de usuários (cadastro, login e perfil)
- Interface responsiva e intuitiva
- Paginação de eventos
- Integração com backend para persistência de dados

## Tecnologias

### Frontend

- Next.js 15+
- React 19
- Tailwind CSS v4
- Radix UI para componentes acessíveis
- React Hook Form para formulários
- Google Calendar API (via backend)

### Backend

- Node.js
- Express
- MongoDB
- Google Calendar API
- JWT para autenticação

## Instalação

### Frontend

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/google-calendar-frontend.git

# Entre no diretório do projeto
cd google-calendar-frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Backend

```bash
# Clone o repositório do backend
git clone https://github.com/seu-usuario/google-calendar-backend.git

# Entre no diretório do projeto
cd google-calendar-backend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## Variáveis de Ambiente

### Frontend

Crie um arquivo `.env.local` na raiz do projeto frontend com as seguintes variáveis:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=seu_client_id
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
```

### Backend

Crie um arquivo `.env` na raiz do projeto backend com as seguintes variáveis:

```
PORT=3000
MONGODB_URI=sua_string_de_conexao_mongodb
GOOGLE_CLIENT_ID=seu_client_id
GOOGLE_CLIENT_SECRET=seu_client_secret
GOOGLE_REDIRECT_URI_LOCAL=http://localhost:3000/auth/google/callback
JWT_SECRET=sua_chave_secreta
```

## Rotas da Aplicação

### Frontend

#### Home e Calendário

- `/` - Página inicial
- `/app/schedule` - Calendário principal (autenticação requerida)
- `/app/schedule?interface=month` - Visualização mensal (padrão)
- `/app/schedule?interface=week` - Visualização semanal
- `/app/schedule?interface=day` - Visualização diária

#### Autenticação

- `/auth/signin` - Login de usuário
- `/auth/signup` - Cadastro de usuário
- `/auth/profile` - Perfil do usuário (autenticação requerida)

#### Google Calendar

- `/app/settings` - Configurações da conta e conexão com Google Calendar

### Backend (API)

#### Usuários

- `POST /user/signup` - Cadastro de usuário
- `POST /user/signin` - Login de usuário
- `PUT /user/update` - Atualização de dados do usuário (requer autenticação)
- `POST /user/google/token` - Configurar token de acesso do Google (requer autenticação)
- `GET /user/google/access_token` - Obter token de acesso do Google (requer autenticação)

#### Agendamentos

- `GET /schedule` - Listar todos os agendamentos do usuário (requer autenticação)
- `GET /schedule/:id` - Obter agendamento específico (requer autenticação)
- `POST /schedule` - Criar um novo agendamento (requer autenticação)
- `PUT /schedule/:id` - Atualizar um agendamento (requer autenticação)
- `DELETE /schedule/:id` - Excluir um agendamento (requer autenticação)

## Fluxo de Integração com Google Calendar

1. O usuário se autentica na aplicação
2. Na página de configurações, o usuário conecta sua conta Google via OAuth 2.0
3. O sistema armazena tokens de acesso e atualização
4. Ao criar um evento na aplicação, o usuário pode optar por sincronizá-lo com o Google Calendar
5. Os eventos do Google Calendar do usuário são importados para a aplicação
6. Qualquer modificação em eventos é sincronizada entre ambas as plataformas
7. O sistema atualiza automaticamente tokens expirados usando o refresh token
8. O ID do evento no Google Calendar é armazenado junto ao agendamento local

## Visualizações do Calendário

### Visualização Mensal

- Exibe todos os dias do mês com indicadores de eventos
- Navegação fácil entre meses

### Visualização Semanal

- Mostra os eventos da semana com detalhes de horários
- Visualização mais detalhada dos compromissos

### Visualização Diária

- Apresenta todos os eventos de um dia específico
- Detalhes completos de cada evento

## Desenvolvimento

### Frontend

```bash
# Modo desenvolvimento
npm run dev

# Construir versão de produção
npm run build

# Executar versão de produção
npm start

# Executar linter
npm run lint
```

### Backend

```bash
# Modo desenvolvimento
npm run dev

# Construir versão de produção
npm run build

# Executar versão de produção
npm start
```

## Integração com Backend

A aplicação frontend se comunica com o backend através de API RESTful. O backend oferece:

- Autenticação de usuários via JWT
- Gerenciamento completo de agendamentos (CRUD)
- Integração bidirecional com Google Calendar
- Armazenamento de dados em MongoDB
- Atualização automática de tokens expirados

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request
