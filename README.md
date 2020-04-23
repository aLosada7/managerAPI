## Manager API - First Version

Manager API deals with Teams and Players to create a real world back-end for a manager application.

This API was build using Express and MongoDB as no-relational Database.
# Before run the server
```npm start````

Also you must create a file config.env under config introducing the following configuration:
```
NODE_ENV = development
PORT=5000

MONGO_URI={YOUR_CONNECTION_URI}

FILE_UPLOAD_PATH= ./public/uploads
MAX_FILE_UPLOAD=1000000
```

# Run server in dev mode
```npm run dev```

# Postman Collection
https://www.getpostman.com/collections/e84f50e84320951b601d