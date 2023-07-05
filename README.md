# React TS Boilerplate

## Installation

1. Downloand zip:

   `git@github.com:katepysova/React_TS_Boilerplate.git`

2. Change your current directory to this project directory.

3. `npm install`

4. `git init`

5. `npm run prepare` - to install git pre-commit hook (does not work not in a git repository).

6. `git add .husky/pre-commit` - to add git pre-commit hook.

7. `touch .env` - to create `.env` file, if needed.

## How to run

- `npm run dev` - to start the app on the localhost. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

- `npm run predeploy` - to build the app for production to the `dist` folder.
  Your app is ready to be deployed!

- `npm run deploy` - to deploy the app on the [GitHub Pages](https://create-react-app.dev/docs/deployment/#github-pages).
  See [Notes on client-side routing](https://create-react-app.dev/docs/deployment/#notes-on-client-side-routing).

## Additional

`npm run format` - to format and lint the code.
