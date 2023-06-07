![red-green-light](https://github.com/ijipe/red-green-light/assets/116267461/e2c71a65-6fda-4278-a0a7-c9c168abb20a)

## 🚦 Red-Green-Light 🚦 - BBVA

This project is a challenge for BBVA. The objective of this challenge is to create a progressive web mobile app based on the game Red Light, Green Light. 

[Acces the project repository through this link.](https://github.com/ijipe/red-green-light)

## Demo 💿
[Access the game through this link.](https://red-green-light.netlify.app)

## Description of the game 🎮

The player will enter his name on the main screen (home view) to access the game.
On the next screen (game view), the player must simulate walking by pressing the left-right buttons alternately to add one point each time. If the player presses the same button consecutively, one point will be deducted. The player will only be able to walk while the traffic light is green, if the traffic light changes to red and he presses any button, he will automatically lose all points.
The objective of the game is to get the maximum number of points possible.

[Reference link with the general statement of the challenge.](https://bbvaengineering.github.io/challenges/statues/)

## Technology used 💻

The library used for its creation is [Lit](https://lit.dev/) together with [Open Web Components](https://open-wc.org/) using JavaScript.

## Open-wc Starter App ✔

[![Built with open-wc recommendations](https://img.shields.io/badge/built%20with-open--wc-blue.svg)](https://github.com/open-wc)

## Creation 🛠

Project generated with:

```bash
npm init @open-wc
# requires node 10 & npm 6 or higher
```
## Installation 🚀
Use the package manager [npm](https://docs.npmjs.com/getting-started) to install the app.
```bash
npm install
```

## Starting the aplication 🚩

Use the `npm start` or `npm run start` command to start the application.
The application exposes a web service on port 8000.

## Testing 📋

Run `npm test` or `npm run test` to execute the unit tests via open-wc/testing.

## Scripts ⚙

- `start` runs your app for development, reloading on file changes
- `start:build` runs your app after it has been built using the build command
- `build` builds your app and outputs it in your `dist` directory
- `test` runs your test suite with Web Test Runner
- `lint` runs the linter for your project
- `format` fixes linting and formatting errors

## Compatibility 🤝
The app is compatible with most modern desktop and mobile web browsers like Chrome, Firefox, Edge and Safari.

The app uses the vibration feature for certain interactions.
Note: Vibrate is not currently supported in Apple's Safari browser on desktop nor Safari on iOS.

## Authors 👥

Created by Irene Jiménez Pérez.

## Tooling configs ✏

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.
