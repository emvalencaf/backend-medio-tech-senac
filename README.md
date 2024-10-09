Sistema Escolar 🎓
Este é um Sistema Escolar desenvolvido com Next.js, React, JavaScript e TypeScript, destinado à gestão acadêmica de turmas, disciplinas, alunos, professores e coordenadores. O sistema oferece um painel administrativo completo para facilitar a gestão educacional.

🚀 Tecnologias Utilizadas
Next.js
React
JavaScript
TypeScript
Tailwind CSS
Docker
⚙️ Funcionalidades
Gerenciamento de Usuários: Registro, atualização e exclusão de alunos, professores e coordenadores.
Controle de Turmas e Disciplinas: Criação e gerenciamento de turmas e disciplinas, vinculando alunos e professores.
Gestão de Conceitos: Professores podem registrar e atualizar notas e conceitos dos alunos.
Comunicação: Central de comunicados e notificações para alunos e professores.
Painel Financeiro: Controle de pagamentos e situação financeira dos alunos.
Controle de Permissões: Diferentes níveis de acesso para coordenadores, professores e alunos.
🛠️ Requisitos
Node.js (v14+)
npm ou yarn
MySQL
Docker
📦 Instalação
Clone o repositório:

bash
Copiar código
git clone https://github.com/emvalencaf/frontend-medio-tech-senac/
Entre no diretório do projeto:

bash
Copiar código
cd frontend-medio-tech-senac
Instale as dependências:

bash
Copiar código
npm install
Gere o cliente Prisma:

bash
Copiar código
npx prisma generate
Inicie o ambiente de desenvolvimento:

bash
Copiar código
npm run dev
🌐 Deploy
A maneira mais fácil de fazer o deploy de sua aplicação Next.js é utilizando a Plataforma Vercel. Para mais detalhes, consulte a documentação de deployment do Next.js.

🤝 Contribuindo
Faça um fork do projeto.
Crie uma nova branch: git checkout -b feature/nova-feature.
Faça suas alterações e commit: git commit -m 'Adiciona nova feature'.
Envie para o repositório: git push origin feature/nova-feature.
Crie um Pull Request.
📄 Licença
Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.

📝 Como Usar
Abra o terminal na raiz do projeto.

Execute os comandos para iniciar os contêineres Docker:

bash
Copiar código
npm run container-db:run
npm run container-redis:run
Inicie o servidor em ambiente de desenvolvimento:

bash
Copiar código
npm run start:dev
🔍 Explicação
As entidades Classes e Communications possuem uma relação muitos-para-muitos, onde um coordenador ou professor pode enviar comunicados para uma ou mais turmas.

Comunicados são enviados via endpoint:

plaintext
Copiar código
/comunicate/send/:classIds
Os IDs das turmas devem ser passados na URL, separados por vírgula (ex.: 1,2,3,4,5).

O Redis funciona como um broker para transmissão em tempo real, enquanto o MySQL armazena as mensagens.

Alunos podem acessar os comunicados através do endpoint:

plaintext
Copiar código
/comunicate/read/:classId
Onde o ID da turma é passado na URL para retornar as mensagens daquela turma.
