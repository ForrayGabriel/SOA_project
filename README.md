# SOA project

## Goal of the project

My goal for this project is too create a simple clicker/idle game. The player has a farm with some cows. Every few seconds, the player can milk the cows and get some milk. The player can then sell the milk for money. The player can use the money to buy more cows, which will produce more milk. The player can also buy upgrades to increase the amount of milk produced by the cows.

## Servers

The project is made of five servers. For the backend, two are data producer and manage the cows and the ressources. One is the backend consumer that manage the login and the game logic. For the frontend, one is the main one that manage the login and loads all the other component, the other one is exposing one component (the top bar) via shared context.

## How to setup and run the backend

To run the project, you need to have [Node.js](https://nodejs.org/en/) installed. In the backend_consumer, cows_manager_provider and ressource manager folder, run the following commands:

    npm install
    npm start

The backend is then running on port 3000.

## How to setup and run the frontend

In  the frontend folder, run the following commands:

    yarn
    cd shared-context
    yarn
    yarn start

The main server is on port 3001 and the shared context server is on port 3002.
