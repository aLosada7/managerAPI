# Manager API - First Version

Manager API deals with Teams and Players to create a real world back-end for a manager application.

This RESTful API was build using Express and MongoDB as no-relational Database.

It includes concepts as Mongoose, Advanced Query, Models, Middleware, Roles, JWT and Cookie Authorization, Hashing or Security.

## Before run the server
```npm install```

Also you must create a file config.env under config introducing the following configuration:
```
NODE_ENV = development
PORT=5000

MONGO_URI={YOUR_CONNECTION_URI}

FILE_UPLOAD_PATH= ./public/uploads
MAX_FILE_UPLOAD=1000000
```

## Run server in dev mode
```npm run dev```

## Postman Collection and Documentation
https://www.getpostman.com/collections/e84f50e84320951b601d

https://documenter.getpostman.com/view/3132455/Szmh1bS6?version=latest

## Seeder
There is a seeder included useful to add and remove data from the database using line commands. Use the following commands to add and remove data respectively.
```
node seeder -i
node seeder -d
``` 