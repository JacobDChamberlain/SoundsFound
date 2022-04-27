# [soundsfound]
A place to find sounds.

Song Library app 

Check it out [live](http://soundsfound.herokuapp.com/)!


## Index

| [Feature List](https://github.com/JacobDChamberlain/SoundsFound/wiki/Feature-List) | [Database Schema](https://github.com/JacobDChamberlain/SoundsFound/wiki/DB-Schema) |

## Technologies Used:
React, Redux, Express, Sequelize, NodeJs, PostgreSQL

## Getting Started

1. Clone this repo.
    * `git clone https://github.com/JacobDChamberlain/SoundsFound.git`
2. Install dependencies from the root directory.
    * `npm install`
3. Create a POSTGRESQL user with CREATEDB and PASSWORD in PSQL.
    * `CREATE USER < name > WITH CREATEDB PASSWORD < 'password' >`
4. Create a .env file in the backend directory based on the .env.example file.
5. Enter your the username and password you just used to create the psql user into the .env file, as well as a name for your database, a secret for JWT_SECRET, and a port. (port # will be used in a proxy on the frontend; if you don't know which to use, stick with 5000).
6. Add the following proxy to your package.json file within your frontend directory, replacing the 5000 with whichever port you chose (or keeping the 5000 if you chose 5000 for your port in step 5).
    * `"proxy": "http://localhost:5000"`
7. Create Database, Migrate, and Seed models.
    * `npx dotenv sequelize db:create`
    * `npx dotenv sequelize db:migrate`
    * `npx dotenv sequelize db:seed:all`
8. Start the server from the backend directory.
    * `npm start`
9. Start the server from the frontend directory. This should automatically open the app in your browser, but if it doesn't, open a browser and navigate to http://localhost:3000.
    * `npm start`
10. You can use the Demo button to explore the site, or sign up for an account and begin finding, sharing, and commenting on cool sounds!  

## Features

Logged in users can perform the following actions.

- Upload/Listen/Edit/Delete Songs
- Upload/Read/Delete Comments
