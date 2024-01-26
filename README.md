# userlist-app

This web app shows some test user info from a server. You may also store your own users' info in localstorage

## Using application

To start application you need to perform several steps:

### Development

1. Install dependencies running ```npm i``` command
2. Start development server running  ```npm run dev``` command. 

Alternatively you may start development server via docker using ```npm run docker:dev``` command

### Production

1. Install dependencies running ```npm i``` command
2. Generate production build running ```npm run build``` command
2. Start production server running  ```npm run preview``` command. 

Alternatively you may start production server via docker using ```npm run docker:start``` command

### Additional commands
- create git hooks ```npm run prepare```
- run eslint ```npm run lint```
- run prettier ```npm run format```
- run stylelint ```npm run stylelint```
- run bundle analyzer ```npm run analyze```
- run project files analyzer ```npm run knip```

## Used technologies overview

### Stack

- Typescript
- React
- Redux

### Build tools

- Vite

### Styling

- SCSS modules

### Code quality

- Eslint
- Prettier
- Stylelint
- Husky
- Lint-staged