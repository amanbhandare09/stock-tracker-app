<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## First, to run the development server: cd into the backend directory

```bash
cd backend
```
## Installation
 - Install pnpm Globally
 ```bash
  npm install -g pnpm
  ```
 - Install NestJS CLI Globally
  ```bash
  pnpm add -g @nestjs/cli
  ```
 - Install Project Dependencies
  ```bash
  pnpm install
  ```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## setup .env file
 - Create the .env File:
    - Create a new file named .env in the backend folder.
 - Fill in the Details
    - Open the .env file and add the following lines, replacing placeholders with your actual database details:
    <br></br>
    ```bash
      DATABASE_HOST= localhost
      DATABASE_PORT= 5432
      DATABASE_USERNAME= <username>
      DATABASE_PASSWORD= <password>
      DATABASE_NAME= <database name>
      SECRET_KEY = <Random String in quotes>
    ```

## Setup Database
 - Download and Install PostgreSQL
    - Visit the PostgreSQL official website to download the installer for your operating system.
    - Follow the installation instructions provided for your OS.
    - During installation, make sure to set up a superuser account (default is usually postgres) and remember the password you create.

 - Create a Database    
    - Open the PostgreSQL shell or use a GUI tool like pgAdmin.
    - Connect to your PostgreSQL server using the superuser account.
      ```bash
      psql -U postgres
      ```
    - Create a new database with the name specified in the .env file. Replace YOUR_DATABASE_NAME with the actual name from your .env file:
      ```bash
      CREATE DATABASE YOUR_DATABASE_NAME;
      ```
    - Then, run the backend. The database tables will be created automatically. 
  
## Login as Admin
 - Run the Backend
   - Start the backend server by running the appropriate command in your project directory.
 - Create Admin Account
   - Open Postman and send a POST request to the following route:
    ```bash
    http://localhost:8000/auth/signup
    ```
   - Set the request body to JSON format and use the following structure to create an admin account:
    ```bash
    {
      "email": "admin@gmail.com",
      "password": "admin",
      "role": "admin"
    }
    ```
   - This will create an admin account with the provided credentials.
 - Login as Admin
   - Open the website and log in using the newly created admin credentials (admin@gmail.com and admin as the password).
 
## Add Data to the Database
 - Prepare CSV Files
   - Place all the CSV files in the allfiles folder. Ensure that the files are structured according to the shared drive.
 - Login as Admin
   - Ensure that you are logged into the application with an admin account. This is necessary to run the database bot and add data.
 - Run the Database Bot
   - After logging in, follow these steps to add data to the database in the correct order:
     - Run AMC Bot: This step will add the AMC (Asset Management Company) data to the database.
     - Run Stock Bot: This will add the stock data to the database.
     - Run MutualFund Bot: This step will add the mutual fund data to the database.
     - Run FundStock Bot: Finally, run the FundStock bot to add the necessary relationships between funds and stocks.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
