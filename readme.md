### Seja Bem-Vindo ao Sistema Estoque Esperto!

O escopo desse sistema é o de um CRUD básico de produtos. Apesar de o domínio ser simples, eu quis explorar e experimentar um pouco com:

 - exceções personalizadas no backend;
 - alertas personalizados no front com Sweet Alert;
 - validações com angular forms module;

## Como executar

Primeiro, para subir o banco, você deve executar o comando ```docker compose up -d``` na raiz do projeto e, quando o container for subido, executar ```docker exec -it testetraineeeverymind-postgres-1 psql -U postgres``` e em seguida, ```CREATE DATABASE nunes_sports;``` para criar o banco de dados dentro do Postgres.
Posteriormente, você deve realizar um setup básico do front e do back, não necessariamente nessa ordem. No front: você deve executar ```npm install``` e logo depois, ```npx ng s```. Já no backend, você deve executar ```mvn package``` ou ```mvn install``` para construir o projeto, e, para executar, use o comando ```mvn spring-boot:run```. Espero que goste ;)

## Rotas

O projeto Estoque Esperto conta com as seguintes rotas:

 - POST: /products -> cria o produto e caso ocorra tudo bem retorna status 201 CREATED;
 - PATCH: /products/{uuid} -> retorna status 201 CREATED caso o produto seja atualizado com sucesso;
 - GET: /products/{uuid} -> retorna status 200 OK caso o produto seja encontrado com sucesso;
 - GET: /products -> retorna status 200 OK se for possível listar os produtos;
 - DELETE: /products/{uuid} -> retorna status 204 NO CONTENT se a exclusão do produto ocorrer com êxito.

Obrigado por ler até aqui e espero sinceramente que tenha uma boa experiência com o Sistema Estoque Esperto ;)

💗
