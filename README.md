# Crud Adonis

CRUD simples feito com Adonis JS

### Instalação

A aplicação utiliza por padrão o banco de dados postgresql. Caso não o tenha instalado, utilize os comandos abaixo para instalar, e configurar uma senha para o usuário padrão.

```sh
$ sudo apt install postgresql postgresql-contrib
$ sudo -u postgres psql
$ ALTER USER postgres PASSWORD 'SUA_SENHA';
```

Para rodar o projeto é necessário o nodejs instalado, caso não o tenha, use os comandos abaixo para instalar

```sh
$ cd ~
$ curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
$ sudo bash nodesource_setup.sh
$ sudo apt install nodejs
```

Clone o repositório, entre na pasta, e baixe as dependências com o npm.

```sh
$ cd crud-adonis
$ npm install
```
ou com yarn se preferir.
```sh
$ yarn
```

Caso não tenha o Adonis globalmente instalado, use o comando abaixo para instalá-lo:
```sh
$ npm i -g @adonisjs/cli
```

Crie um arquivo .env no diretório root da aplicação. 
Há um arquivo .env.example lá com os dados necessários. Basta copiar o mesmo, renomear para .env, e ajustar a url externa, e as credenciais do banco de dados:

A Url externa é o endereço raiz da aplicação após ser hospedada. Caso rode local, deixe 127.0.0.1

```sh
EXTERNAL_HOST=127.0.0.1
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=1234
DB_DATABASE=postgres
```


Uma vez o adonis nstalado globalmente, rode as migrations no diretório root do projeto:
```sh
$ adonis migration:run
```
Caso ocorra algum erro, certifique-se de ter criado o banco de dados configurado no .env

Agora é só rodar o projeto:
```sh
$ npm start
```
