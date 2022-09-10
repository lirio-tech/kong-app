# Kongapp

### Production

[![Netlify Status](https://api.netlify.com/api/v1/badges/438a86e0-77af-47ff-b1de-25e5913ddaaa/deploy-status)](https://app.netlify.com/sites/kongbarber/deploys)

### Development

[![Netlify Status](https://api.netlify.com/api/v1/badges/1605dbef-ebf4-4e5e-9403-a67965d72785/deploy-status)](https://app.netlify.com/sites/kong-app-develop/deploys)

## Project setup
```sh
npm install
```

### Compiles and hot-reloads for development
```sh
# Getting the .env
npm run serve

# OR to get .env.dev
npm run dev

# OR to get .env.prod
npm run prod
```

Create the `.env.dev` file and `Add` the `Enviroment Variables` bellow:

```props
VUE_APP_HOST_API=https://mystifying-wescoff-a506c7.netlify.app
VUE_APP_GOOGLE_MAPS_KEY=
#VUE_APP_THEME=LIGHT
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Change Version
```
npm version patch
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
