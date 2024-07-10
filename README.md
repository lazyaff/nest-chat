# NestJS Microservices Application

## Project Description

This project is a backend application built using NestJS microservices architecture. It consists of three main services: Auth, Profile, and Chat. The Chat service also includes WebSocket functionality to handle real-time communication. Each service is designed to operate independently and communicate via a message broker.

### Features

- **Auth Service :**
  - User registration and login.
  - JWT based authentication.
  - Token validation.
- **Profile Service :**
  - User profile management.
  - Update user profile.
  - Get user profile.
- **Chat Service :**
  - Send and receive chat messages.
  - Fetch chat history.
  - WebSocket support for real-time messaging.

### Technology Stack

- **Nest.js :** A progressive Node.js framework for building efficient and scalable server-side applications.
- **MongoDB :** A NoSQL database, chosen for its flexibility and scalability in handling large volumes of data.
- **RabbitMQ :** A message broker, used to exchange messages between different microservices.
- **Socket.io :** A socket library for real-time communication.
- **Swagger UI :** A tool for generating interactive API documentation, making it easier for developers to understand and use the API.

## Instalation

To install the project, run the following command:

1. **Install the dependencies**

   ```bash
   npm install
   ```

2. **Create a env file**

   Edit the .env file on each service with the necessary credentials. eg:

   ```bash
    PORT =
    MONGO_URL =
   ```

3. **Start the server**

   ```bash
   npm run start:dev <service_name>
   ```

Or simply use docker with the following command:

```bash
docker-compose up --build -V
```

## Documentation

Access the API documentation for each service using the /docs route. For example, if the Auth service is running on port 3000, access the documentation at http://localhost:3000/docs.
