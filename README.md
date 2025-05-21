# 🚆 Projeto CCR - FIAP

📌 Sobre o Projeto Este projeto foi desenvolvido como parte do curso da FIAP, com foco em criar uma solução tecnológica para a CCR. O sistema visa melhorar a experiência dos usuários do transporte público, oferecendo funcionalidades que aumentam a acessibilidade, otimizam rotas e fornecem informações em tempo real.

 ## 👨‍💻 Equipe

Pedro Henrique Da Silva - 560393
Yasmin Pereira da Silva - 560039
Lucas Borges de Souza 560027

## 🔧 Tecnologias Utilizadas

Frontend: React, Tailwind CSS
Backend: Node.js, Express
Banco de Dados: MongoDB / PostgreSQL
Inteligência Artificial: IBM Watson para chatbot
Outras Ferramentas: API de monitoramento de transporte público

## 🚀 Algumas das Funcionalidades

📍 Planejamento de Rotas: Sugestão das melhores rotas com base no tempo e acessibilidade.
🗣 Chatbot Inteligente: Assistente virtual para responder dúvidas dos usuários.
📊 Painel de Informações: Exibe status das linhas, horários e lotação estimada.
🔴 Botão de Emergência: Contato rápido com a segurança do metrô/trem.
📜 Licença Este projeto é open-source e foi desenvolvido exclusivamente para fins acadêmicos na FIAP.

## Como rodar o projeto

### Frontend
- Link do Git: https://github.com/Lucas-Borges27/challenge-ccr.git

1. Abra o diretório do frontend:
   ```bash
   challenge-ccr
   ```
2. Instale as dependências:
    ```bash
    npm install
    ```
3. Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
4. Acesse o frontend no navegador em:
    ```bash
    http://localhost:3000
    ```

### Backend
- Link do Git: https://github.com/Lucas-Borges27/Challenge-JAVA.git

1. Abra o diretório do BackEnd:
   ```bash
   Challenge-JAVA
   ```
2. Inicie o modo de desenvolvimento do Quarkus:
    ```bash
    ./mvnw quarkus:dev
    ```
3. Inicie o modo de desenvolvimento do Quarkus:
    ```bash
    http://localhost:8080
    ```

### Vercel e Render
1. Acesse o link Render abaixo para ativar o servidor da API: 
https://challenge-java-fgyb.onrender.com

2. Siga o caminho dos Endpoints para acessar as informações da API.

3. Acesse o link Vercel abaixo para acessar o Frontend:
https://challenge-ccr-phi.vercel.app/

## Documentação dos Endpoints da API

### Usuários (/api/usuarios)

- **GET /api/usuarios**  
  Lista todos os usuários.  
  Resposta: 200 OK

- **GET /api/usuarios/{id}**  
  Busca um usuário pelo ID.  
  Resposta: 200 OK

- **POST /api/usuarios/cadastrar**  
  Cria um novo usuário.  
  Resposta: 201 Created (sucesso), 400 Bad Request (erro)

- **PUT /api/usuarios/{id}**  
  Atualiza um usuário existente.  
  Resposta: 200 OK (sucesso), 400 Bad Request (erro)

- **DELETE /api/usuarios/{id}**  
  Remove um usuário pelo ID.  
  Resposta: 204 No Content (sucesso), 404 Not Found (não encontrado)

- **POST /api/usuarios/login**  
  Realiza o login do usuário.  
  Resposta: 200 OK (sucesso), 400 Bad Request, 401 Unauthorized, 500 Internal Server Error

### Estações (/api/estacoes)

- **GET /api/estacoes**  
  Lista todas as estações.  
  Resposta: 200 OK

- **GET /api/estacoes/{id}**  
  Busca uma estação pelo ID.  
  Resposta: 200 OK

- **POST /api/estacoes**  
  Cria uma nova estação.  
  Resposta: 201 Created (sucesso), 400 Bad Request (erro)

- **PUT /api/estacoes/{id}**  
  Atualiza uma estação existente.  
  Resposta: 200 OK (sucesso), 400 Bad Request (erro)

- **DELETE /api/estacoes/{id}**  
  Remove uma estação pelo ID.  
  Resposta: 204 No Content (sucesso), 404 Not Found (não encontrada)

## # Linhas (/api/linhas)

- **GET /api/linhas**  
  Lista todas as linhas.  
  Resposta: 200 OK

- **GET /api/linhas/{id}**  
  Busca uma linha pelo ID.  
  Resposta: 200 OK

- **POST /api/linhas**  
  Cria uma nova linha.  
  Resposta: 201 Created (sucesso), 400 Bad Request (erro)

- **PUT /api/linhas/{id}**  
  Atualiza uma linha existente.  
  Resposta: 200 OK (sucesso), 400 Bad Request (erro)

- **DELETE /api/linhas/{id}**  
  Remove uma linha pelo ID.  
  Resposta: 204 No Content (sucesso), 404 Not Found (não encontrada)

---

✉ Para mais informações, entre em contato com a equipe!