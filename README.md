# Swarga

> Free photos for everyone

This is a web application dedicated to sharing stock photography and images.

![preview](https://user-images.githubusercontent.com/74450685/108373544-4ea5fe80-7200-11eb-8eee-2a03decd8a32.jpg)

# Quick Start 🚀

### Create .env file in the root directory and fill it with your own data:

```
NODE_ENV = development
PORT = 5000
MONGO_URI =

JWT_SECRET = you get to choose
JWT_EXPIRE = 30d
JWT_COOKIE_EXPIRE = 30

GOOGLE_CLIENT_ID =
GOOGLE_CLIENT_SECRET =

AWS_ACCESS_ID =
AWS_SECRET_KEY=
S3_BUCKET_NAME =
AWS_REGION =

```

### Install dependencies

```bash
yarn add or npm install
```

## Run in development

```
yarn dev
```

## Run in production mode

change NODE_ENV in your .env file to production and run:

```bash
# Create frontend production build
cd frontend
npm start or yarn start
```

After your running this command you can see the app running on http://localhost:5000

## Live application

The application is live at [swarga](https://swargaapp.herokuapp.com/)

## App Info

### Author

Mehdi Ait Ouchrif

### Version

1.0.0

### Licence

This project is licenced under the MIT License
