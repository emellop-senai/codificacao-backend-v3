# Guia da Atividade — API de Frutas com Express, Validação, Tratamento Global de Erros e Persistência com JSON

A proposta da atividade é que voces montem a aplicação sozinhos, seguindo uma estrutura organizada e entendendo o papel de cada arquivo.

A atividade trabalha quatro pilares principais:

1. **Validação de dados de entrada**
2. **Tratamento de erros com middleware global**
3. **Respostas padronizadas da API**
4. **Persistência local com `fs` e arquivo `JSON`**

Esses pilares aparecem como base de uma API mais previsível, segura e fácil de manter, alinhados ao conteúdo do PDF enviado sobre APIs robustas no Express.

---

## Objetivo da atividade

Voces deverão criar uma API de frutas utilizando Express, com rotas para:

- listar todas as frutas
- buscar uma fruta por id
- criar uma fruta
- atualizar parcialmente uma fruta
- substituir completamente uma fruta
- excluir uma fruta

A diferença aqui é que a API não será feita de forma “simples demais”. Ela deverá seguir uma estrutura profissional, com separação de responsabilidades.

---

# Visão geral da estrutura do projeto

A estrutura sugerida para a atividade é esta:

```text
project/
├── package.json
├── src/
│   ├── app.js
│   ├── server.js
│   ├── data/
│   │   └── fruits.json
│   ├── routes/
│   │   └── fruitRoutes.js
│   ├── services/
│   │   └── fruit.service.js
│   ├── middlewares/
│   │   ├── errorHandler.js
│   │   ├── notFoundHandler.js
│   │   └── validateFruit.js
│   └── utils/
│       ├── appError.js
│       └── response.js
```

---

# O que cada parte do projeto faz

Antes do passo a passo, é importante entender a função de cada pasta e arquivo.

## `package.json`
Guarda as informações do projeto e as dependências instaladas.

## `src/app.js`
Configura a aplicação Express, registra middlewares, rotas e tratamento de erros.

## `src/server.js`
É o ponto que inicia o servidor.

## `src/data/fruits.json`
Funciona como uma base de dados simples local, armazenando as frutas.

## `src/routes/fruitRoutes.js`
Define os endpoints da API.

## `src/services/fruit.service.js`
Concentra a lógica de leitura, gravação e manipulação dos dados.

## `src/middlewares/validateFruit.js`
Contém os middlewares de validação de entrada.

## `src/middlewares/errorHandler.js`
Centraliza o tratamento de erros da aplicação.

## `src/middlewares/notFoundHandler.js`
Captura requisições feitas para rotas que não existem.

## `src/utils/appError.js`
Cria um tipo de erro customizado para facilitar o controle de status e mensagens.

## `src/utils/response.js`
Padroniza o formato de resposta de sucesso e erro.

---

# Passo a passo detalhado para criar o projeto

## Etapa 1 — criar a pasta do projeto

Primeiro, crie uma nova pasta para a API.  
Dentro dessa pasta será criado todo o projeto.

Depois disso, inicialize o projeto Node para gerar o arquivo `package.json`.

Em seguida, instale a dependência principal da atividade: o **Express**.

### O que deve existir ao final desta etapa
- uma pasta do projeto
- um arquivo `package.json`
- a dependência `express` instalada

---

## Etapa 2 — configurar o `package.json`

No arquivo `package.json`, voces devem ajustar algumas informações importantes:

- definir o nome do projeto
- definir a versão
- informar que o projeto usará **ES Modules**
- definir o arquivo principal
- criar scripts para execução

### O ponto mais importante
É necessário configurar:

```json
"type": "module"
```

Isso permite usar:

```js
import express from "express";
```

em vez de `require`.

Também é interessante definir scripts de execução para facilitar o desenvolvimento.

### Exemplo do que o `package.json` precisa conter
- nome do projeto
- versão
- `"type": "module"`
- script para iniciar
- script para desenvolvimento
- dependência `express`

---

## Etapa 3 — criar a estrutura de pastas

Agora voces devem criar a pasta `src` e, dentro dela, organizar as subpastas:

- `data`
- `routes`
- `services`
- `middlewares`
- `utils`

Essa separação é importante porque a aplicação ficará mais legível e cada arquivo terá uma responsabilidade específica.

---

## Etapa 4 — criar o arquivo `fruits.json`

Dentro da pasta `src/data`, crie o arquivo `fruits.json`.

Esse arquivo será o banco de dados local da atividade.

voces podem começar com um array contendo alguns itens iniciais, por exemplo duas frutas com `id` e `nome`.

### Estrutura esperada do conteúdo
Um array de objetos, por exemplo:

- objeto com `id`
- objeto com `nome`

O importante é que o JSON esteja válido, com colchetes, chaves, vírgulas corretas e aspas duplas.

### Aprendizado dessa etapa
Entendam que:

- `JSON` é apenas um formato de dados
- o arquivo será lido pelo Node
- a API vai alterar esse arquivo quando criar, editar ou remover frutas

---

## Etapa 5 — criar o utilitário de erro customizado

Dentro de `src/utils`, crie o arquivo `appError.js`.

A ideia aqui é criar uma classe chamada `AppError` que estenda `Error`.

### O que essa classe deve guardar
- a mensagem do erro
- o código HTTP
- detalhes extras, se necessário
- uma marcação indicando que o erro é operacional

### Por que isso é importante
Sem essa classe, o código ficaria lançando erros genéricos e o middleware global teria dificuldade para saber qual status retornar.

Com `AppError`, a aplicação consegue diferenciar um erro esperado, como:

- fruta não encontrada
- campo obrigatório ausente
- id inválido

de um erro interno inesperado.

### O que voces devem escrever nesse arquivo
- exportar uma classe
- o construtor deve receber `message`, `statusCode` e opcionalmente `details`
- a classe deve herdar de `Error`

---

## Etapa 6 — criar o utilitário de respostas padronizadas

Dentro de `src/utils`, crie o arquivo `response.js`.

Nesse arquivo, voces deverão criar duas funções:

- uma para resposta de sucesso
- uma para resposta de erro

### Ideia da resposta padronizada
Toda resposta da API deve seguir sempre a mesma estrutura.

#### Sucesso
- `success: true`
- `message`
- `data`

#### Erro
- `success: false`
- `message`
- `details`

### Por que isso é importante
Isso evita o caos no retorno.  
Quando uma API retorna ora string, ora array, ora objeto diferente, o frontend precisa criar várias regras para interpretar o resultado.

Com padronização, o consumidor da API já sabe exatamente o formato da resposta.

### O que voces devem implementar
Uma função de sucesso que:
- receba `res`
- aceite `statusCode`, `message` e `data`
- devolva `res.status(...).json(...)`

Uma função de erro que:
- receba `res`
- aceite `statusCode`, `message` e `details`
- devolva `res.status(...).json(...)`

---

## Etapa 7 — criar os middlewares de validação

Dentro de `src/middlewares`, crie o arquivo `validateFruit.js`.

Aqui voces vão criar middlewares responsáveis por validar dados antes que a rota continue.

### Middlewares sugeridos
1. validação do `id`
2. validação para `POST`
3. validação para `PUT`
4. validação para `PATCH`

---

## Etapa 7.1 — validar o `id`

A API usa `/:id` em algumas rotas.  
Esse valor precisa ser um número inteiro válido.

### O que validar
- se o parâmetro existe
- se contém apenas números

### O que fazer se for inválido
Chamar `next` com um `AppError` usando status `400`.

### Aprendizado dessa etapa
O `id` da URL chega como texto.  
Mesmo sendo número no conceito da regra de negócio, ele entra como string no Express.

---

## Etapa 7.2 — validar o `POST`

No cadastro de uma fruta, o campo `nome` é obrigatório.

### O que validar
- se `nome` existe
- se `nome` é uma string
- se `nome` não está vazio
- se `nome` não contém apenas espaços

### O que fazer se estiver tudo certo
Pode já limpar espaços com `trim()` antes de seguir para a rota.

### O que fazer se falhar
Encaminhar erro com `AppError` e status `400`.

---

## Etapa 7.3 — validar o `PUT`

No `PUT`, a substituição deve exigir o objeto completo necessário.

Como a fruta tem apenas o campo `nome` além do `id`, o `nome` continua sendo obrigatório.

### O que validar
- se `nome` foi informado
- se é string
- se não está vazio

### Diferença conceitual
Entendam que:
- `PUT` substitui a representação inteira do recurso
- `PATCH` altera só parte dele

---

## Etapa 7.4 — validar o `PATCH`

No `PATCH`, a intenção é atualização parcial.  
Mesmo assim, se o aluno for permitir alteração apenas de `nome`, então precisa garantir que:

- `nome` foi enviado
- `nome` é string
- `nome` não está vazio

---

## Etapa 8 — criar o middleware de rota não encontrada

Dentro de `src/middlewares`, crie `notFoundHandler.js`.

Esse middleware será executado depois das rotas.

### Função dele
Se nenhuma rota anterior responder, significa que a URL acessada não existe.

### O que ele deve retornar
- status `404`
- mensagem informando que a rota não foi encontrada

### Aprendizado dessa etapa
Esse middleware fica **depois** das rotas, porque ele só deve agir se nenhuma delas tiver tratado a requisição.

---

## Etapa 9 — criar o middleware global de erros

Dentro de `src/middlewares`, crie `errorHandler.js`.

Esse é um dos pontos mais importantes da atividade.

### O que ele deve fazer
Receber quatro parâmetros:
- `err`
- `req`
- `res`
- `next`

Se o erro for um `AppError`, ele retorna:
- status vindo do erro
- mensagem do erro
- detalhes do erro, se houver

Se for um erro inesperado, ele retorna:
- status `500`
- mensagem de erro interno

### Aprendizado dessa etapa
Entendam que o Express olha para um middleware como tratador global de erros quando ele recebe quatro parâmetros.

Ele deve ser registrado por último no `app.js`. (assim como deu erro nas vezes anteriores que eu comentei ou nao coloquei)

---

## Etapa 10 — criar o service das frutas

Dentro de `src/services`, crie `fruit.service.js`.

Esse arquivo será responsável por toda a lógica de acesso ao arquivo JSON.

Aqui é onde entra o módulo `fs`.

---

## Etapa 10.1 — importar o módulo `fs`

voces devem usar a versão de promessas do módulo:

- importar `fs/promises`

Também será necessário trabalhar com caminhos de arquivos.

Como está usando ES Modules, para descobrir o caminho atual, será necessário usar:
- `path`
- `url`
- `fileURLToPath`

### O que explicar
No CommonJS usaríamos `__dirname`, mas em ES Modules isso precisa ser montado manualmente.

---

## Etapa 10.2 — criar o caminho do arquivo JSON

Dentro do service, voces precisam montar o caminho completo para `src/data/fruits.json`.

Isso é importante para que a leitura e escrita funcionem corretamente independentemente de onde o processo for iniciado.

---

## Etapa 10.3 — criar o método de leitura

O service deve ter um método para ler o arquivo JSON.

### O que esse método precisa fazer
1. ler o conteúdo do arquivo
2. verificar se está vazio
3. transformar o conteúdo em objeto JavaScript com `JSON.parse`
4. devolver o array de frutas

### Tratamento de erro necessário
Se o arquivo não existir:
- criar o arquivo com array vazio
- retornar array vazio

Se o JSON estiver inválido:
- lançar erro apropriado

Se houver falha de leitura:
- lançar erro interno controlado com `AppError`

### Aprendizado dessa etapa
Entendam que ler o arquivo e usar `JSON.parse` é o que transforma o JSON em algo manipulável no JavaScript.

---

## Etapa 10.4 — criar o método de escrita

Agora voces devem criar um método para salvar dados no arquivo.

### O que esse método deve fazer
1. receber os dados
2. converter para JSON com `JSON.stringify`
3. gravar no arquivo com identação para ficar legível

### Ponto importante
Usar `null, 2` no `JSON.stringify` ajuda a deixar o arquivo bonito e fácil de ler.

---

## Etapa 10.5 — criar os métodos principais do service

No mesmo arquivo, voces devem implementar:

- `getAll`
- `getById`
- `create`
- `updatePatch`
- `updatePut`
- `delete`

---

### `getAll`
Lê os dados e devolve todas as frutas.

### `getById`
Lê os dados e procura uma fruta pelo `id`.

### `create`
- lê as frutas
- gera um novo `id`
- cria o objeto
- adiciona ao array
- grava o array atualizado
- devolve a fruta criada

### `updatePatch`
- lê as frutas
- localiza pelo `id`
- altera apenas o campo necessário
- salva
- devolve o item atualizado
- se não encontrar, devolve `null`

### `updatePut`
- lê as frutas
- localiza pelo `id`
- substitui o recurso por completo
- salva
- devolve o item atualizado
- se não encontrar, devolve `null`

### `delete`
- lê as frutas
- localiza o índice
- remove do array
- salva
- devolve `true` ou `false`

---

## Etapa 11 — criar as rotas

Dentro de `src/routes`, crie o arquivo `fruitRoutes.js`.

Nesse arquivo, voces definirão as rotas da API.

Será necessário:
- criar um `Router`
- importar o service
- importar os middlewares de validação
- importar o `AppError`
- importar a função de resposta padronizada

---

## Etapa 11.1 — rota para listar frutas

### Objetivo
Responder com todas as frutas salvas.

### O que a rota deve fazer
- chamar `fruitService.getAll()`
- retornar sucesso com status `200`

### Aprendizado dessa etapa
Mesmo sendo uma rota simples, ela também deve usar `try/catch`.

---

## Etapa 11.2 — rota para buscar por id

### Objetivo
Retornar apenas uma fruta específica.

### O que a rota deve fazer
- validar o `id`
- buscar no service
- se não encontrar, lançar `AppError` com `404`
- se encontrar, responder com status `200`

---

## Etapa 11.3 — rota para criar

### Objetivo
Cadastrar uma nova fruta.

### O que a rota deve fazer
- validar o body
- chamar o método de criação
- responder com status `201`

### Aprendizado dessa etapa
O status correto para criação é `201 Created`.

---

## Etapa 11.4 — rota para atualização parcial

### Objetivo
Alterar parte de um recurso.

### O que a rota deve fazer
- validar `id`
- validar body
- chamar `updatePatch`
- se não encontrar, retornar `404`
- se encontrar, responder com `200`

---

## Etapa 11.5 — rota para substituição completa

### Objetivo
Substituir o recurso inteiro.

### O que a rota deve fazer
- validar `id`
- validar body
- chamar `updatePut`
- se não encontrar, retornar `404`
- responder com `200`

---

## Etapa 11.6 — rota para exclusão

### Objetivo
Remover uma fruta.

### O que a rota deve fazer
- validar `id`
- chamar `delete`
- se não existir, retornar `404`
- se existir, retornar sucesso

### Observação didática
voces podem usar:
- `200` com mensagem de sucesso
ou
- `204` sem conteúdo

Para esta atividade, usar `200` com resposta padronizada ajuda mais na consistência.

---

## Etapa 12 — criar o arquivo `app.js`

Agora voces vão montar a aplicação Express.

No `src/app.js`, será necessário:

1. importar o Express
2. criar a aplicação
3. habilitar `express.json()`
4. criar uma rota inicial `/`
5. registrar as rotas de frutas
6. registrar o middleware de rota não encontrada
7. registrar o middleware global de erros
8. exportar a aplicação

---

## Ordem correta dos registros

A ordem é muito importante:

1. `express.json()`
2. rota inicial
3. rotas `/fruits`
4. middleware de rota não encontrada
5. middleware global de erro

### Aprendizado dessa etapa
Se o middleware de erro for colocado antes das rotas, a estrutura fica errada.  
Se o `notFoundHandler` for colocado antes das rotas, ele vai capturar tudo indevidamente.

---

## Etapa 13 — criar o arquivo `server.js`

No `src/server.js`, voces devem apenas:

- importar o `app`
- definir a porta
- iniciar o servidor

Esse arquivo deve ser simples.  
A ideia é separar a configuração da aplicação da inicialização do servidor.

---

# Como funciona o fluxo completo da requisição

Quando a requisição chega, o caminho é este:

## Exemplo: `POST /fruits`

1. O Express recebe a requisição
2. O body já foi convertido para JSON pelo `express.json()`
3. A rota chama o middleware de validação do body
4. Se houver erro, o middleware manda para o tratador global
5. Se estiver válido, a rota entra no `try`
6. O service lê o arquivo `fruits.json`
7. O service converte o JSON para array
8. O service adiciona a nova fruta
9. O service grava novamente o arquivo
10. A rota responde com JSON padronizado e status `201`

---

# Como trabalhar o `try/catch` nesta atividade

Voces devem usar `try/catch` nas rotas assíncronas.

### Regra didática
Tudo que faz operação assíncrona importante deve estar protegido.

No caso da atividade:
- leitura de arquivo
- escrita de arquivo
- chamadas ao service dentro das rotas

### O que fazer dentro do `catch`
Encaminhar o erro com `next(error)` para o middleware global.

### O que isso evita
Evita deixar cada rota montando o erro manualmente.
A lógica de erro fica centralizada.

---

# Status HTTP que voces devem usar

## `200 OK`
Para:
- listagem
- busca por id
- atualização
- exclusão com mensagem

## `201 Created`
Para:
- criação de um novo recurso

## `400 Bad Request`
Para:
- `id` inválido
- body inválido
- campo obrigatório ausente
- tipo incorreto

## `404 Not Found`
Para:
- fruta não encontrada
- rota inexistente

## `500 Internal Server Error`
Para:
- falha inesperada no servidor
- erro de leitura ou escrita não tratado como caso operacional simples

---

# O que voces precisam entender sobre `fs` e JSON

## Leitura
O Node lê o arquivo como texto.

## Conversão
Esse texto precisa ser convertido para objeto/array com `JSON.parse`.

## Manipulação
Depois disso, os dados podem ser manipulados como qualquer array JavaScript.

## Gravação
Ao final, é necessário converter novamente para string com `JSON.stringify` antes de salvar.

---

# Erros comuns que voces podem cometer

## 1. Esquecer `"type": "module"`
Sem isso, os imports com `import ... from ...` falham.

## 2. Esquecer a extensão `.js` nos imports
Com ES Modules, os imports locais precisam da extensão.

## 3. Colocar middleware de erro na ordem errada
O middleware global deve ficar por último.

## 4. Não usar `next(error)`
Se o aluno apenas fizer `console.log(error)` no `catch`, o middleware global não será acionado corretamente.

## 5. Escrever JSON inválido
Uma vírgula errada ou aspas incorretas no `fruits.json` quebra o `JSON.parse`.

## 6. Misturar regra de negócio com rota
A rota deve ser enxuta.  
A lógica de manipulação de dados deve ficar no service.

## 7. Não validar o body
Se não validar, dados inválidos vão parar no arquivo JSON.

---

# Roteiro para voces construírem sozinhos

## Parte 1
Criar o projeto e instalar a dependência do Express.

## Parte 2
Organizar a estrutura de pastas.

## Parte 3
Criar o arquivo JSON inicial com os dados.

## Parte 4
Criar os utilitários:
- `AppError`
- respostas padronizadas

## Parte 5
Criar os middlewares:
- validação
- rota não encontrada
- erro global

## Parte 6
Criar o service com leitura e escrita em arquivo.

## Parte 7
Criar as rotas com `try/catch`.

## Parte 8
Montar `app.js`.

## Parte 9
Montar `server.js`.

## Parte 10
Testar todas as rotas.

---

# Checklist final da atividade

Ao terminar, a API deve atender a todos os pontos abaixo:

- [ ] projeto configurado com Express
- [ ] uso de ES Modules
- [ ] estrutura organizada em pastas
- [ ] leitura de dados via `fs`
- [ ] gravação de dados em `fruits.json`
- [ ] rotas de CRUD completas
- [ ] validação de `id`
- [ ] validação de body
- [ ] uso de `try/catch`
- [ ] tratamento global de erros
- [ ] respostas padronizadas
- [ ] status HTTP corretos
- [ ] rota para recurso inexistente
- [ ] rota para URL inexistente

---

# Proposta de desafio extra

Depois que voces concluírem a atividade, voces podem melhorar ela:

- impedir nomes de frutas duplicados
- adicionar campo `cor`
- adicionar campo `preco`
- criar validação para múltiplos campos
- criar paginação na listagem
- ordenar frutas por nome
- criar logs de operação

---
