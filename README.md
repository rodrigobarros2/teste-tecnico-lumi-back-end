Apresentação do projeto em vídeo https://www.youtube.com/watch?v=ExOMJE2Dxzc&ab_channel=RodrigoBarros


## Foi realizado o deploy da aplicação


https://lumini-teste-tecnico-front.vercel.app


Caso queiram rodar localmente, basta seguir os seguintes passos

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/rodrigobarros2/lumini-teste-tecnico.git
```

Entre no diretório do projeto

```bash
  cd lumini-teste-tecnico
```

Instale as dependências

```bash
  npm install
```

```bash
  docker-compose up -d (Precisa ter o docker instalado)
```

```bash
  npx prisma migrate dev
```

```bash
  npx prisma generate
```



Inicie o servidor

```bash
  npm run start
```


## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  npm run test
```


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

Database Local 

`DATABASE_URL="postgresql://pguser:pgpassword@localhost:5432/mydb?schema=public"`

OU

Database Remoto

`DATABASE_URL="postgres://lumini_teste_tecnico_user:8YCIAy64fHaAPJIs6IJgnDDgCDkFgSo3@dpg-cp937a7109ks73a3c9lg-a.ohio-postgres.render.com/lumini_teste_tecnico"`
