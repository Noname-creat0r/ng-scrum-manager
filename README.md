# ScrumManager

Created with NvChad and godlike tmux (mostly)... [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

## Startup

1) Run `npm start` in `/scrum-manager-server` project folder for node server initialization.
2) Run `ng serve` for a dev server in the root of the project folder.
3) Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Tasks 

- User authentication (Signin/Signup)
- C/D projects
- C/D project iterations
- Display scrum-board with tasks for choosen iteration, tasks may have 3 statuses (TODO/DOING/DONE)
- Implement project backlog
- C/U/D tasks in backlog or iteration containers (change status, set story points, title, description)
- Move around tasks from backlog to iteration and backwise.

`*CRUD - Create Read Update Delete`

## Libs
- Front: Angular core (standalone components only), NgRx, RxJs, ng-bootstrap, ngx/env-builder
- Server: Node, Express, Sequelize, jwt, bcryptjs, body-parser, dotenv
- DB: sqlite3, Sequelize-cli

## DB 

- There are migrations, seeds and models for each logic entity of the project.
- Some seeds are randomly generated!
- All seeded user's passwords are initialy hashed and salted. Default value for each user password = `123456789`

[Schema](https://github.com/Noname-creat0r/ng-scrum-manager/assets/72403887/0e8522b5-fc30-490a-a577-00e8134a001d)
