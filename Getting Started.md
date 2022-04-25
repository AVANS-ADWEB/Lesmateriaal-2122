# Getting Started

1. Download latest version of Node (minimum 12.20) https://nodejs.org/en/

2. Install Angular CLI (NG) global 

        npm install -g @angular/cli

3. Ga naar folder ACtiviteitenPlanner 

4. Installeer dependencies

        npm install

5. Start project

        ng serve  //of
        npm start 
        

## Optioneel - Verbind met Firebase

Comming soon

## Handige tips

Errors met initialisatie van properties:

tsconfig.json

{
  "compilerOptions": {
+   "strictPropertyInitialization": false,
-   "strictPropertyInitialization": true,
  }
}