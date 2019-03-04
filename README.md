# timeKeeping
keep track of your time
This project was bootstrapped with [Express application generator](https://expressjs.com/en/starter/generator.html).<br>
And uses a [PostgreSQL](https://www.postgresql.org/) db with [Sequelize](http://docs.sequelizejs.com/) a promise-based ORM for Node.js.

## Table of Contents
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npx sequelize db:migrate](#npx-sequelize-dbmigrate)
  - [npx sequelize db:migrate:undo:all](#npx-sequelize-dbmigrateundoall)
  - [npx sequelize db:seed:all](#npx-sequelize-dbseedall)
  - [npx sequelize db:seed:undo:all](#npx-sequelize-dbseedundoall)
  
## Folder Structure

After creation, your project should look like this:

```
timeKeeping/
  README.md
  node_modules/
  config/
    database.js
  controllers/
    index.js
    AuthController.js
    TasksController.js
    UsersController.js
  db/
    migrations/
      20190225101927-create-user.js
      20190225114722-create-todo.js
    models/
      index.js
      Tasks.js
      Users.js
    seeders/
      xxxxxxxxxxxxxx-demo-user.js
      xxxxxxxxxxxxxx-demo-todo.js
  middleware/
    verifyToken.js
  routes/
    index.js
    authRoute.js
    tasksRoute.js
    usersRoute.js
  package.json
  package-lock.json
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

### `npx sequelize db:migrate`

Executes the files in the migrations folder and creates the tables of the defined models.

### `npx sequelize db:migrate:undo:all`

Rollsback the execution of the files in the migrations folder.

### `npx sequelize db:seed:all`

Executes the files in the seeders folder and fills the tables of the defined models with mock data.<br>
For the mock data is provided by [Faker](https://github.com/marak/Faker.js/).

### `npx sequelize db:seed:undo:all`

Rollsback the execution of the files in the seeders folder.
