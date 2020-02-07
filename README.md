# Leeds Digital Festival App


## Overview

Plan to create a website, iOS and Android app for Leeds Digital Festival.
I'll be doing a talk about it's creation at the festival, the key points I would like to talk about are:
 - Building on Azure serverless
 - Pricing benefits of serverless
 - One code base for 2 apps and one website
 - Performance

We'll be loading the talks from the Wordpress database that backs the Leeds Digital Festival website.
It'll be built on Azure, using Blob Storage and Azure Functions.
Looking at either Azure App Center or Github actions for the build process, potentially manual releases depending on time constrains.


We want to keep the app really simple, no frills around the edges.

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
