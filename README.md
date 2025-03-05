This project is the implementation of the vehicle fleet parking management with an hexagonal architecture.

# 1 - Dependencies

The installation of dependencies is done through the following command :

```
pnpm install
```

# 2 - Environment variables

To adapt the application and end-to-end tests to a SQLite database, it is essential to create a .env environment file at the root of the project with these two variables:

```
DATABASE_ADAPTER=SQLITE
DATABASE_PATH=<path to your database>
```

# 3 - Command Line Interface

The program can be run with the next command :

```
pnpm run fleet create <fleetId>
pnpm run fleet register-vehicle <fleetId> <vehiclePlateNumber>
pnpm run fleet localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]
```

or can be transpiled and run with the ensuing command :

```
pnpm build && node ./dist/src/fleet.js <'create' | 'register-vehicle' | 'localize-vehicle'> <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]
```

# 4 - Unit testing

The unit tests are available with the subsequent command :

```
pnpm test
```

# 5 - End to end testing

The end-to-end tests are accessible with the upcoming command :

```
pnpm e2e
```

# 6 - Step 3

## For code quality, you can use some tools : which one and why (in a few words) ?

To ensure high code quality, I generally use several programming tools, including:

- Formatter: Prettier, which helps standardize the styling of the code.
- Pre-commit hook: Husky, which allows running any sequence of instructions.
- Task runner: Lint-staged, which allows executing any task. It is paired with Husky and Prettier.
- Linter: ESLint, which helps standardize how JavaScript and TypeScript rules are applied.

Additionally, a good mastery of the IDE is essential. VSCode has many extensions that enable fast and stylistic code writing and assess the complexity of a function, such as CodeMetrics.
About the continuous integration, it is also possible to add additional configurations for test coverage with Jest or code analysis tools like Sonar.

## you can consider to setup a ci/cd process : describe the necessary actions in a few words

A continuous integration pipeline should have at least these three steps:

- Lint: Ensures that JavaScript and TypeScript rules are followed.
- Build: Ensures that the application compiles correctly for the production environment.
- Test: Ensures that there are no regressions within the application and that everything is functional.

Additionally, a deployment step is typically added (possibly with a release step beforehand).
