# GE Price Alert OSRS

A discord bot made with Node.js

Reqs:
- nodejs
- npm
- mysql database

Steps:
- create a config.json file using the config.json.example.json example file;
- follow step 1 of https://www.digitalocean.com/community/tutorials/how-to-build-a-discord-bot-with-node-js-pt and put BOT_TOKEN in config.json;
- create configdb.json file using the configdb.json.example.json example file;
- put your mysql database credentials in configdb.json;
- run table.sql on your database;
- run ```npm install``` and ```node ./index.js``` in the project folder.

Ideas:
- get a nice regex for parsing the args of the message;
- create an option to respond the person in dm;
- create an option to configure how many time do you want to be alerted and which frequency;
- create an option to use date directly from GE official website or OSBuddy GE data or both;

PT/BR

Um bot de discord feito em nodeJS

Requerimentos:
- node
- npm
- um bd mysql

Passos para criar:
- criar o config.json seguindo o exemplo de config.json.example.json
- seguir o Passo 1 do tutorial https://www.digitalocean.com/community/tutorials/how-to-build-a-discord-bot-with-node-js-pt e colocar o BOT_TOKEN no config.json
- criar o configdb.json seguindo o exemplo de configdb.json.example.json
- colocar os acessos à um bd mySQL no configdb.json
- executar table.sql no bd
- na pasta do projeto executar ```npm install``` e ```node ./index.js```

Ideias para melhorar:
- colocar um regex daora pra pegar os argumentos da mensagem
- ter uma opção para responder a pessoa diretamente (dm)
- ter uma opção para configurar quantas vezes quer ser avisado e qual a frequência
- ter uma opção para pegar os dados ou do GE diretamente ou do OSbuddy ou dos dois
