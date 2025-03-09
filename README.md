# Google Calendar Integration Frontend

Uma aplicação web para integração entre um sistema de agendamento local e o Google Calendar, permitindo a visualização e gerenciamento de eventos em diferentes formatos (mensal, semanal e diário).

## Funcionalidades

- Visualização de calendário em formatos mensal, semanal e diário
- Cadastro e gerenciamento de eventos
- Sincronização bidirecional com Google Calendar
- Autenticação de usuários (cadastro, login e perfil)
- Interface responsiva e intuitiva
- Paginação de eventos
- Integração com backend para persistência de dados

## Tecnologias

- Next.js 15+
- React 19
- Tailwind CSS v4
- Radix UI para componentes acessíveis
- React Hook Form para formulários
- Google Calendar API (via backend)

## Instalação

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

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=seu_client_id
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
```

## Rotas da Aplicação

### Home e Calendário
- `/` - Página inicial
- `/app/schedule` - Calendário principal (autenticação requerida)
- `/app/schedule?interface=month` - Visualização mensal (padrão)
- `/app/schedule?interface=week` - Visualização semanal
- `/app/schedule?interface=day` - Visualização diária

### Autenticação
- `/auth/signin` - Login de usuário
- `/auth/signup` - Cadastro de usuário
- `/auth/profile` - Perfil do usuário (autenticação requerida)

### Google Calendar
- `/app/settings` - Configurações da conta e conexão com Google Calendar

## Fluxo de Integração com Google Calendar

1. O usuário se autentica na aplicação
2. Na página de configurações, o usuário conecta sua conta Google
3. Ao criar um evento na aplicação, o usuário pode optar por sincronizá-lo com o Google Calendar
4. Os eventos do Google Calendar do usuário são importados para a aplicação
5. Qualquer modificação em eventos pode ser sincronizada entre ambas as plataformas

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

## Integração com Backend

A aplicação frontend se comunica com o backend através de API RESTful. Consulte a documentação do backend para mais detalhes sobre os endpoints disponíveis.

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request