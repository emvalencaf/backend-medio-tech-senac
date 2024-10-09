## Sistema Escolar 🎓
Este é um Sistema Escolar desenvolvido em JavaScript (TypeScript), destinado à gestão acadêmica de turmas, disciplinas, alunos, professores e coordenadores. O sistema oferece um painel administrativo completo para facilitar a gestão educacional.


## 🚀 Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando **JavaScript** (TypeScript) e as seguintes tecnologias para fornecer uma aplicação robusta e escalável:

### 🔙 Backend
- ![NestJs](https://img.shields.io/badge/-NestJs-E0234E?&logo=NestJs): Framework utilizado para estruturar a aplicação backend com camadas bem definidas (DTOs, Controllers, Services), garantindo organização e escalabilidade.
- ![Prisma](https://img.shields.io/badge/-Prisma-2D3748?&logo=Prisma): ORM que facilita a comunicação entre o backend e o banco de dados, permitindo a modelagem de dados de forma eficiente e segura.
- ![SQL](https://img.shields.io/badge/-SQL-4479A1?&logo=MySQL): Banco de dados relacional utilizado para a persistência de dados estruturados.
- ![Redis](https://img.shields.io/badge/-Redis-DC382D?&logo=Redis): Banco de dados em memória de chave-valor, utilizado para gerenciar tokens invalidados (estratégia de blacklist no logout) e para comunicação em tempo real usando a arquitetura pub/sub.

### 🖥️ Frontend
- ![NextJS](https://img.shields.io/badge/-NextJs-000?&logo=Next.js): Framework React utilizado para construir o frontend, fornecendo suporte a renderização híbrida (SSR e SSG) e uma ótima performance.
- ![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-06B6D4?&logo=tailwindcss): Biblioteca de utilitários CSS, permitindo estilização rápida e responsiva através de classes.

### 🛠️ Ferramentas de Desenvolvimento
- ![Docker](https://img.shields.io/badge/-Docker-2496ED?&logo=docker): Ferramenta de contêinerização utilizada para criar ambientes isolados para os serviços do projeto, como bancos de dados (Redis e MySQL), garantindo facilidade de deploy e consistência entre ambientes de desenvolvimento e produção.

## ⚙️ Funcionalidades (Features)

### 🔐 Autenticação e Autorização
- **Autenticação via `JWT Token`** e **autorização baseada em `roles`**:
    - Três tipos de usuários: 
        - 👨‍🎓 Estudantes (`STUDENT`)
        - 👨‍🏫 Professores (`TEACHER`)
        - 👩‍💼 Coordenadores (`COORDINATOR`)

### 👥 Gerenciamento de Usuários
- **Adicionar/editar/deletar usuários**:
    - Apenas usuários com o papel de coordenador (`COORDINATOR`) podem gerenciar usuários.

### 📚 Gerenciamento de Disciplinas
- **Adicionar/editar/deletar disciplinas**:
    - Somente coordenadores podem gerenciar disciplinas.

### 🏫 Gerenciamento de Turmas
- **Adicionar/editar/deletar turmas**:
    - Coordenadores têm permissão exclusiva para gerenciar turmas.

### 🎓 Gestão de Alunos nas Turmas
- **Adicionar/remover aluno a uma turma**:
    - Coordenadores podem gerenciar a inclusão e exclusão de alunos nas turmas.

### 👩‍🏫 Associação de Professores a Disciplinas e Turmas
- **Associar/desassociar professores a disciplinas e turmas**:
    - Apenas coordenadores podem realizar a associação de professores.
    - ⚠️ Cada turma pode ter apenas um professor por disciplina.

### 📝 Gestão de Notas
- **Atribuir/remover/editar conceito (nota) a aluno**:
    - Professores, vinculados à disciplina e turma correspondente, têm a permissão de gerenciar as notas dos alunos.

### 📢 Comunicados
- **Criar comunicados destinados a uma ou mais turmas**:
    - Professores e coordenadores podem criar comunicados para as turmas.

### 📊 Listagem e Filtragem de Dados
- **Listagem de turmas, comunicados, usuários e disciplinas**:
    - Filtragem integrada entre o frontend e backend:
        - É possível filtrar por tipo de usuário, nome da turma, nome do usuário e nome da disciplina.
        - Para filtrar por turma ou disciplina, é necessário especificar o tipo de usuário.
    - **Paginação** implementada para todas as listagens.


## 🛠️ Requisitos  

Node.js (v14+)  

MySQL  

Docker  

## 📦 Instalação  

### Para rodar o projeto localmente

1. O primeiro passo é clonar o repositório `backend` e o `frontend`:
    - backend: `git clone https://github.com/emvalencaf/backend-medio-tech-senac/ backend`
    - frontend:`git clone https://github.com/emvalencaf/frontend-medio-tech-senac/ frontend`
#### Configurando o backend
1. Instale os pacotes de dependência no ambiente do projeto do backend (`cd backend`) com o comando: `npm install`. 
2. Crie o arquivo `.env` espelhado no arquivo `/backend/.example.env`:
```
DATABASE_URL="mysql://{preencha com usuário do seu banco de dados}:{preencha com a senha do seu banco de dados}@localhost:3306/{nome do banco de dados que você quer da}"
REDIS_PORT=6379
REDIS_HOST=localhost

JWT_SECRET=
JWT_EXPIRES_IN=

BACKEND_PORT=5000

ENVIRONMENT=DEVELOPMENT

REDIS_HOST=localhost
REDIS_PORT=6379

FRONTEND_URL=http://localhost:3000
```

**Observação**: Caso não tenha os bancos de dados MySQL ou Redis na sua máquina, mas, tenha o Docker você pode optar por subir containers usando os comandos já definidos no package.json, para isso siga os passos:
- Crie um arquivo `/backend/.env.docker-db` e `.env.docker-redis`:
```
/backend/.env.docker-db
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=medio_tec
MYSQL_USER=my_user
MYSQL_PASSWORD=my_pass
MYSQL_PORT=3306
```
```
/backend/.env.docker-redis
REDIS_PORT=6379
REDIS_HOST=localhost
```
- Execute os comandos `npm run container-db:run` e `npm run container-redis:run` para iniciar os containers pela primeira vez ou `npm run container-db:start` e `npm run container-redis:start` caso já tenha os container. Para encerrar basta executar os comandos `npm run container-db:stop` e `npm run container-db:stop`.
            
3. Com o ambiente de projeto pronto gere o cliente prisma com o comando `npx prisma generate`
4. Agora você pode subir o servidor em ambiente de desenvolvimento(`npm run start:dev`) ou de produção (`npm run start:prod`)

#### Configurando o frontend

1. Instale os pacotes de dependência no ambiente do projeto do backend (`cd frontend`) com o comando: `npm install`. 
2. Crie o arquivo `.env` espelhado no arquivo `/frontend/.example.env`:
```
BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
AUTH_SECRET="wp2H/ITwyJpgrkhWj2mYUjKrWgYlsiDGb1mc+9y7gks=" # Added by `npx auth`. Read more: https://cli.authjs.dev
NEXT_PUBLIC_ENV="DEVELOPMENT"

NEXT_PUBLIC_DEMO_AUTH_TEACHER_EMAIL=
NEXT_PUBLIC_DEMO_AUTH_TEACHER_PASSWORD=
NEXT_PUBLIC_DEMO_AUTH_STUDENT_EMAIL=
NEXT_PUBLIC_DEMO_AUTH_STUDENT_PASSWORD=
NEXT_PUBLIC_DEMO_AUTH_COORDINATOR_EMAIL=
NEXT_PUBLIC_DEMO_AUTH_COORDINATOR_PASSWORD=
```         
4. Agora você pode subir o servidor em ambiente de desenvolvimento(`npm run dev`) ou de produção (`npm run prod`)


## 🌐 Deploy  

A maneira mais fácil de fazer o deploy de sua aplicação Next.js é utilizando a Plataforma Vercel. Para mais detalhes, consulte a documentação de deployment do Next.js.

🤝 Contribuindo  

Faça um fork do projeto.  

Crie uma nova branch: git checkout -b feature/nova-feature.  

Faça suas alterações e commit: git commit -m 'Adiciona nova feature'.  

Envie para o repositório: git push origin feature/nova-feature.  

Crie um Pull Request.  

## 📄 Licença  

Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.

## 🔍 Explicação  

As entidades Classes e Communications possuem uma relação muitos-para-muitos, onde um coordenador ou professor pode enviar comunicados para uma ou mais turmas.  

Comunicados são enviados via endpoint:  

/comunicate/send/:classIds  

Os IDs das turmas devem ser passados na URL, separados por vírgula (ex.: 1,2,3,4,5).  

O Redis funciona como um broker para transmissão em tempo real, enquanto o MySQL armazena as mensagens.  

Alunos podem acessar os comunicados através do endpoint:  

/comunicate/read/:classId  

Onde o ID da turma é passado na URL para retornar as mensagens daquela turma.
