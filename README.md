# DasLab backend test

Here is a simple backend test to be part of the DasLab backend/API team.
You do not need to finish the assigment, take about 1h if you don't get to the end dont worry, just skip to task 3 and give your opinion and we can discuss where you got and blockers during the interview.

## Test paramters

-   Fork then install the project localy (npm i)
-   Make your fork private then share it with @etiennea
-   Have a look around the /api-docs
-   Check src/routes.ts
-   Check the corresponding controllers in src/controllers
-   Task1: Add a new model with create, update, delete routes for 'testing locations', you must be logged in as a user and they must belong to a user. Testing locations could have properties like longitude, latiture and some fields like contact addess.
-   Task2: Make e2e tests and unit tests
-   Task3: Write a few sentences on what you would do different or better if you had more time and give your thoughts on the tech stack and file structure. Feedback on the test is also useful.

## What we will look at

-   File structure, code organisation
-   Commits, fequency & commit names

## Documentation & Resources

-   Typescript
-   [Express](https://expressjs.com/)
-   [Jest](https://jestjs.io/docs/en/api)
-   [TypeOrm](https://typeorm.io/#/)
-   [typeorm-encrypted](https://github.com/generalpiston/typeorm-encrypted) for data at rest
-   [Swagger js-doc](https://github.com/Surnet/swagger-jsdoc/blob/HEAD/docs/GETTING-STARTED.md)
-   Mostly AWS services
-   Auth via Firebase Auth

## How it works

All files are in src, first the app loads bootstrap, where it loads and express app, with logger, middleware and router.
Router is a custom router I developed for SpottyEgg Ltd. All the routes are in routes.ts and explanations are there on how to use this.

## Conventions

All routes call a controller, every controller should have a test. Models are in the entities folder. Controllers should call services that have the business logic and call the ORM and the models. No logic should be in the controllers.

### Commits

We start commit names with, feat-12: infra-12: bug-12: then a short description (when there is no number, there is no number, number comes from taskboard card). In the future it will be feat-123: that will link to the correct story.

### Test coverage

We try keep it above 90%!

### NPM Scripts

-   🔥 `start` - run product server (build)
-   🔧 `build` - build typescript files for above
-   🔧 `dev` - run development server via bastion host
-   🔥 `ts-start` - run as typescript
-   📱 `test:unit` - run all unit tests
-   📱 `test:coverage` - run all unit tests + test coverage report
-   🔧 `db:migration` - shortcut create a migration file
-   🔧 `db:entity` - shortcut create an entity file
