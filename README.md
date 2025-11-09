# Todo List Exercise

This is a small gradle based multi-project to test your familiarity with Angular frontend in general and Spring boot backend.
The project consists of 2 modules `todo-list-frontend` and `todo-list-backend`.

## todo-list-frontend

This module was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files
and all `/api` request will be automatically redirected on the backend server with the help of `proxy.config.json`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## todo-list-backend

This module was generated with [Spring boot](https://spring.io/projects/spring-boot) version 2.3.0.RELEASE.

## Development server

Run `TodoApplication.java` for the backend server. All endpoints will be served under `http://localhost:8099/api`

**Please note that until you reach last part of the exercise and implement the backend you will be receiving an exception like:**

`org.hibernate.tool.schema.spi.CommandAcceptanceException: Error executing DDL "INSERT INTO todo (id, task, priority) VALUES (1, 'Implement loading - frontend only', 1)" via JDBC Statement`

# Exercise
Please implement the following as separate commits:

### Show the loading bar only while data as loading
Currently, TODOs are fetched through a mock service (todo.service.ts) with an artificial delay of 2s.
Hide the loading bar when data has finished loading.

### Implement search
Wire up the existing search field, so the TODO list is filtered when the input changes.

### Implement delete on click
Using the existing method `remove` on todo.service.ts, remove a TODO when it's clicked.
Note that the `remove` method is intentionally made, so it randomly sometimes fails. This error should be handled as you see fit.

### Replace the mock service by backend API calls

#### todo-list-backend
Provide the API call endpoints with the help of Spring (entity, repository, controller etc.) that will be used in from the front-end.

#### todo-list-frontend
Using the backend API, replace the method definitions at todo.service.ts with actual API calls
