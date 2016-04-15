# What is it

JavaScript single page application boilerplate I use in personal projects. Intended to have a page with a basic Bootstrap layout and routing, with tests and linting all set up. This branch includes React (with Hot Reloading enabled), react-router, and react-bootstrap. With this project you will have a basic Bootstrap page with a navigation bar, ready to develop your single page application.

# Features

1. [Babel](https://github.com/babel/babel) with [stage-2](https://github.com/babel/babel/tree/master/packages/babel-preset-stage-2), [es2015](https://github.com/babel/babel/tree/master/packages/babel-preset-es2015), and [react](https://github.com/babel/babel/tree/master/packages/babel-preset-react) for modern JavaScript features and JSX.
2. ESLint [Semistandard](https://github.com/Flet/eslint-config-semistandard) configuration.
3. [Mocha](https://github.com/mochajs/mocha) for unit testing.
4. [webpack-dev-server](https://github.com/webpack/webpack-dev-server) with [hot module replacement](https://github.com/gaearon/react-transform-hmr) for development server.
5. [webpack](https://github.com/webpack/webpack) with basic production build setup.
6. [React](https://github.com/facebook/react) for the View of your application. Basic components and containers directory structure setup.
7. [react-bootstrap](https://github.com/react-bootstrap/react-bootstrap/) for layout using the wildly popular [Bootstrap](http://getbootstrap.com/) Framework.
8. Dynamic Bootstrap theme selection using [Bootswatch](https://bootswatch.com) API.
9. [react-router](https://github.com/reactjs/react-router/) for routing a single page application.
10. [react-router-bootstrap](https://github.com/react-bootstrap/react-router-bootstrap) to integrate react-router with react-bootstrap.
11. [fetch](https://github.com/github/fetch) and [Promise](https://github.com/stefanpenner/es6-promise) polyfilled for backwards compatability.

# Install

Clone the boilerplate:

    git clone http://github.com/pl12133/babel-plate.git
    cd babel-plate

Switch to `react-bootstrap-router` branch:

    git checkout react-bootstrap-router

Install:

    npm install

# Setup 

1. Remove the `.git` folder from the project directory.
2. Edit `package.json` and fill it with the details of your package. Make sure to change the `title`, `description`, and `repository` entries.
3. Your entry point is `src/index.js`, you have a few components set up in `containers` and `components`.
4. Your routes are in the `routes` folder. Add a new route by creating a new container in the `containers` folder and adding a route to `routes/index.js`. You will probably also want to add a new button to the Navigation Bar in `components/NavigationHeader/` too.

# Usage

To begin development, define the environment variables HOST and PORT. Execute `npm start` to start up the development server. All changes made in the `src` folder will automatically be built by webpack-dev-server.

To build for production, use `npm run build:prod` and the output will build in the `lib` folder. There is a basic express server for production to serve up a single page app, start it with `npm run start:prod`.

*Make sure your `index.html` file includes `dist/bundle.js` for development, and `lib/bundle.js` for production.*
