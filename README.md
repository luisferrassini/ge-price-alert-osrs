# GE Price Alert OSRS

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
- na pasta do projeto executar ```npm install``` e node ```./index.js```
