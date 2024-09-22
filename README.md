# Como usar
1. Abrir o terminal na raiz do projeto.
2. Executar os dois comandos `npm run container-db:run` e `npm run container-redis:run` para iniciar os contêineres do `redis` e `mysql`
3. Executar o comando `npm run start:dev`


# Explicação

- `Classes` e `Comunications` possuem uma relação muitos-para-muitos em que um coordenador/professor pode enviar um comunicado para uma ou mais classes.

- Os comunicados são enviados pelo *endpoint* `/comunicate/send/:classIds` em que são passado ao *param* da URL os ids das classes separados por vírgula (por exemplo:'1,2,3,4,5,6,7,8,9,10').
- Dessa forma, os comunicados podem ser enviados para uma ou mais turmas.

- O `Redis` funciona como um *broker* de mensagens para transmitir as mensagens em tempo real e o mysql serve para guardar essas mensagens.
- Os alunos podem ler as mensagens pelo *endpoint* `/comunicate/read/:classId` em que é passado ao *param* da URL o id da classe, dessa forma será possível ler todas as mensagens passadas.