## Sistema Escolar 🎓
Este é um Sistema Escolar desenvolvido em JavaScript (TypeScript), destinado à gestão acadêmica de turmas, disciplinas, alunos, professores e coordenadores. O sistema oferece um painel administrativo completo para facilitar a gestão educacional.

- Features
    - Autenticação (por `JWT Token`) e autorização (por `roles`)
        - São três tipos de `roles`: estudantes (`STUDENT`), professores (`TEACHER`) e coordenadores (`COORDINATOR`)
    - Adicionar/editar/deletar usuários
        - Somente usuários do tipo coordenadores poderão adicionar/editar e deletar usuários.
    - Adicionar/editar/deletar disciplinas
        - Somente usuários do tipo coordenadores poderão adicionar/editar/deletar disciplinas.
    - Adicionar/editar/deletar turmas
        - Somente usuários do tipo coordenadores poderão adicionar/edita/deletar turmas.
    - Adicionar/remover aluno a uma turma
        - Somente usuários do tipo coordenadores poderão adicionar/remover alunos de uma turma.
    - Associar/desassociar professores à disciplinas e turmas
        - Somente usuários do tipo coordenadores poderão associar/desassociar professores à disciplina e turma
        - Uma turma só pode ter um professor atrelado a uma mesma disciplina.
    - Atribuir/remover/editar conceito(nota) a aluno
        - Somente usuários do tipo professores (associados aquela disciplina e turma) poderão atribuir/remover/editar conceito à alunos (pertencente a turma)
    - Criar comunicados destinados a turma ou turmas
        - Somente usuários do tipo professor e coordenador poderão criar comunicado
    - Listar dados de turmas, comunicados, usuários e disciplinas.
        - Filtragem de dados integrada (ao frontend e backend) apenas para usuários:
            - é possível filtrar por tipo de usuário, nome da turma, nome do usuário e nome da disciplina.
                - É necessário especificar o tipo do usuário para o caso de pesquisa de turma e disciplina, pois, a filtragem é feita com base no tipo de usuário.
        - Paginação implementada para a listagem dos dados

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido inteiramente com JavaScript (TypeScript) e usando as seguintes bibliotecas e frameworks:

- Backend:
    - ![NestJs](https://img.shields.io/badge/-NestJs-000?&logo=NestJs): framework utilizado para estruturar a aplicação express do backend e padronizá-la em camadas (DTO, Controllers, Services)
    - ![Prisma](https://img.shields.io/badge/-Prisma-000?&logo=Prisma): ORM utilizado para facilitar a integração entre o backend e o banco de dados. 
    - ![SQL](https://img.shields.io/badge/-SQL-000?&logo=MySQL): Banco de dados utilizado para persistir os dados relacionais
    - ![Redis](https://img.shields.io/badge/-Redis-000?&logo=Redis): Banco de dados de chave-valor utilizado para persistir em memória dados como tokens invalidados (pelo logout do usuário, adoção da estratégia blacklist para o logout) e disparo de comunicações em tempo real através da arquitetura pub/sub.

- Frontend
Next.js  

React  

JavaScript  

TypeScript  

Docker  

## ⚙️ Funcionalidades  

Gerenciamento de Usuários: Registro, atualização e exclusão de alunos, professores e coordenadores.  

Controle de Turmas e Disciplinas: Criação e gerenciamento de turmas e disciplinas, vinculando alunos e professores.  

Gestão de Conceitos: Professores podem registrar e atualizar notas e conceitos dos alunos.  

Comunicação: Central de comunicados e notificações para alunos e professores.  

Painel Financeiro: Controle de pagamentos e situação financeira dos alunos.  

Controle de Permissões: Diferentes níveis de acesso para coordenadores, professores e alunos.  

## 🛠️ Requisitos  

Node.js (v14+)  

MySQL  

Docker  

## 📦 Instalação  

git clone https://github.com/emvalencaf/backend-medio-tech-senac/  

cd backend-medio-tech-senac  

Instale as dependências:  

npm install  

Gere o cliente Prisma:  

npx prisma generate  

Inicie o ambiente de desenvolvimento:

npm run start:dev  

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

## Integrantes: 

@emvalencaf  

@romullo99  

@pxxx010  

@iagovieir  

@36priscilapsilva  

@jwavrik  

