# Dashboard com CRUD de Usuários - Next.js

Este é um projeto de Dashboard com um CRUD para gerenciamento de usuários, desenvolvido como parte de um desafio técnico. 

## Tecnologias Utilizadas

- **Next.js 15**
- **Tailwind CSS**
- **MongoDB**
- **ShadcnUI**

## Funcionalidades

- Cadastro de usuário
- Listagem de usuários
- Edição de usuários
- Exclusão de usuários
- Permissões diferentes para usuários
- Login de usuário utilizando JWT
- Resgate de informações do usuário no acesso

## Rotas Backend

| Método | Rota                             | Descrição                        | Parâmetros                                                                                                                                         |
|--------|----------------------------------|----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| POST   | `/api`                           | Criar usuário                   | ```json<br>{<br>  "name": "teste",<br>  "email": "teste@teste.com",<br>  "password": "teste"<br>}<br>```                                   |
| GET    | `/api`                           | Exibir todos os usuários        | -                                                                                                                                                   |
| PUT    | `/api/[id]`                     | Editar usuário                  | ```json<br>{<br>  "name": "teste",<br>  "email": "teste@teste.com",<br>  "password": "teste"<br>}<br>```                                   |
| DELETE | `/api/[id]`                     | Deletar usuário                 | -                                                                                                                                                   |
| POST   | `/api/login`                    | Login de usuário                | ```json<br>{<br>  "email": "teste@teste.com",<br>  "password": "teste"<br>}<br>```                                                           |
| PUT    | `/api/[id]/role`                | Alterar permissão do usuário    | ```json<br>{<br>  "_id": "67273cadb21a8690214da0be",<br>  "role": "Admin"<br>}<br>```                                                     |

## Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/nathanmota-dev/dashboard-next-crud
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd dashboard-next-crud
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Acesse a aplicação em `http://localhost:3000`.

6. Para Testar a API, acesse `http://localhost:3000/api`.

## Contribuições

Sinta-se à vontade para contribuir com melhorias ou correções!