# Brainly

A web application for managing and sharing content.

## Features

- User authentication (signup and signin)
- Create, read, delete content
- Share content with a unique link

## Tech Stack

- **Frontend:** React, Vite, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, Mongoose, TypeScript
- **Database:** MongoDB

## Getting Started

### Prerequisites

- Node.js
- Docker

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```

2. **Backend Setup:**
   ```bash
   cd Backend
   npm install
   ```

3. **Frontend Setup:**
   ```bash
   cd Frontend
   npm install
   ```

### Running the Application

1. **Start the MongoDB container:**
   ```bash
   docker run -d --name brainly-mongo -p 27017:27017 -v brainly-db:/data/db -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=adminpassword mongo
   ```

2. **Start the backend server:**
   ```bash
   cd Backend
   npm run dev
   ```

3. **Start the frontend server:**
   ```bash
   cd Frontend
   npm run dev
   ```

## Project Structure

```
.brainly/
├── Backend/
│   ├── src/
│   └── ...
└── Frontend/
    ├── src/
    └── ...
```
