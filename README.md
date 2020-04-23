# Leeds Digital Festival App


## Overview

We wanted to create a website, iOS and Android app for Leeds Digital Festival.
This was to support a talk (by https://github.com/jordanfinners) about how it was created and technologies behind its creation at the festival.
The key points for the talk were about:
 - Building on Azure serverless
 - Pricing benefits of serverless technologies
 - A single code base for two apps and a website and the benefits they bring
 - Performance

We'll be loading the talks from the Leeds Digital Festival website.
It'll be built on Azure, using Blob Storage and Azure Functions.
Github Actions for the build process, with manual releases due to time constrains (Ideally we would automate this in future).

## UI

### Tools

We'll be using [LitElement](https://lit-element.polymer-project.org/) for the UI alongside existing [Material components](https://github.com/material-components/material-components-web-components).

[Rollup](https://rollupjs.org/guide/en/) is the build tool.
[Karma](http://karma-runner.github.io/4.0/index.html), [Mocha](https://mochajs.org/), [Sinon](https://sinonjs.org/) and [Chai (using Expect)](https://www.chaijs.com/guide/styles/#expect) are testing tools.

### Commands

Useful commands to know:

* Serve up the web app with hot reload `npm run serve`
* Run the tests `npm run test`
* Run linting `npm run lint`
* Run linting with autofix on `npm run lint:fix`
* Run the build `npm run build`

## Apps

### Android

Android is a [Trusted Web Activity](https://developers.google.com/web/android/trusted-web-activity), which acts as a wrapper this is based off https://github.com/GoogleChromeLabs/svgomg-twa/
This will wrap the website into an application which can be downloaded off Google Play Store.
As it just loads the website it does not need to be updated when the website is updated.

### iOS

iOS is a [Capacitor Wrapper](https://capacitor.ionicframework.com/docs/getting-started/) of the website. This displays the website in a WKWebView but with access to native API's.
When you change the UI and want to update the iOS app you'll need to do the following:
```bash
npm run build
npx cap sync ios
```
This will build the updated UI and sync these files to the iOS project. You will then need to open xCode and update the version and release a new version of the app.

## Project Board

Is available [here](https://github.com/TheDataShed/leeds-digital-festival-app/projects/1)

## Commits

We'll be using gitmoji because I'm a millennial - https://gitmoji.carloscuesta.me/

Squash down your commits to one when Pull Requesting.
Commit format:
```
This is a title

* Bullet point descriptions

TheDataShed/leeds-digital-festival-app#ticketnumber
```

If it closes the ticket stick `Closes` at the start of the ticket reference.
