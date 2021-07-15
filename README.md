# Projeto-Casper Lu
Mini Projeto

- Este projeto foi desenvolvido para atender aos requisitos para um ChatBot de notícias. A Stack escolhida para o desenvolvimento do projeto foi NODE.js, React com TypeScript com integração ao DialogFlow e Facebook Messenger.
## Tecnologias utilizadas
1. React com TypeScript
2. Node.JS
3. DialogFlow
4. Express
## Bibliotecas utilizadas
1. Material UI
2. Knex
3. Cors
4. React Router Dom
5. JWT
## Padrão de Projeto
1. Padrão MVC

## Descrição do projeto

- Para acessar o repositório isolado do backend, [clique aqui](https://github.com/LuanSilvaTec/projeto-casper-backend)
- Para acessar o repositório isolado do frontend, [clique aqui](https://github.com/LuanSilvaTec/projeto-casper-frontend)
- Para acessar o painel adminstrativo do Casper Lu, [clique aqui](https://chatbot-test-luan-frontend.herokuapp.com/)
- Para acessar endpoint do Casper Lu, [clique aqui](https://chatbot-test-luan.herokuapp.com/)
- Para acessar a página do Facebook do Casper Lu, [clique aqui](https://www.facebook.com/Casper-Lu-101492835553099)


Neste repositório possui a versão final de cada projeto (frontend,backend e chatbot desenvolvido no âmbito do DialogFlow). Os repositórios acima são utilizados para deploy no Heroku.

## Resumo do projeto
### Requisitos
- [x]	Criação da página do Facebook do Casper.
- [x]	Bot para Dialogo via mensagem privada.
- [x]	Menu de notícias com Quick Replies.
- [x]	Envio de até 10 notícias, de acordo com o tema escolhido pelo usuário.
- [x]	Saudação de desculpas caso não haja nenhuma notícia disponível.
- [x]	Cada notícia deve ser mostrada como um Modelo genérico do Facebook Messenger.
- [x]	Painel de administração para cadastro das notícias.
- [x]	Autenticação do administrador do painel.
- [x]	CRUD das informações.

### Descrição
- A partir do painel adminstrativo, o usuário consegue cadastrar, deletar e editar notícias que serão mostradas pelo BOT Casper Lu. Apenas usuários autenticados conseguem acessar o painel ou consumirem a API (exceto para cadastro de novos usuários). Autenticação JWT implementada tanto no backend quanto no frontend. 
- Para que o BOT Casper Lu possa ser testado, é necessário solicitar ao developer que adicione uma conta do Facebook para testes, através do Facebook Developers.
