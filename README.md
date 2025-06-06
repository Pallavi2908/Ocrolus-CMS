# Content Management System (CMS) Backend

This is a RESTful backend service to manage articles — create, view, update, delete, and list them. It also tracks each user’s recently viewed articles.
Tech stack used : Node.js, Express, Mongoose, MongoDB.

## Features

- User authentication via simple token-based system (no third party library has been used)
- CRUD operations on articles
- Pagination support for listing articles
- Recently viewed articles per user tracked in database
- Dockerized setup with separate DB container

## Requirements

- Node.js 18+ (preferably v22.12.0)
- MongoDB (via Docker or download from official website)
- Docker desktop (for containerized deployment)

## Getting Started

### Local Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/Pallavi2908/Ocrolus-CMS.git
   cd Ocrolus-CMS
   ```

2. Create a `.env` file with your MongoDB credentials:

   ```
   db_user=your_mongo_username
   db_pass=your_mongo_password
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the server:

   ```bash
   npm start
   ```

5. The server will run at `http://localhost:3000`

---

### Using Docker

1. Build and run the stack using Docker Compose:

   ```bash
   docker-compose up --build
   ```

2. This will start both the Node.js backend and MongoDB containers.

3. Access the API at `http://localhost:3000`

---

## API Endpoints

## All endpoints return the content JSON. Use the `Authorization` header with a valid user token for protected routes.

(Optional) Run script in`src/seedings` once, or you may change it to your convenience.

| Method | Endpoint                  | Description                        | Auth Required |
| ------ | ------------------------- | ---------------------------------- | ------------- |
| POST   | `/articles/`              | Create a new article               | Yes           |
| GET    | `/articles/`              | List all articles (paginated)      | No            |
| GET    | `/articles/:id`           | Get an article by ID               | Yes           |
| PUT    | `/articles/:id`           | Update an article by ID            | Yes           |
| DELETE | `/articles/:id`           | Delete an article by ID            | Yes           |
| GET    | `/articles/recent/viewed` | Get recently viewed articles       | Yes           |
| GET    | `/articles/test`          | Test route (to check if API works) | No            |

### Pagination

List articles supports pagination via query params:

- `page` — page number (default 1)
- `limit` — number of articles per page (default 10)

Example:

```bash
curl "http://localhost:3000/articles?page=2&limit=5"
```

---

## Authentication

Use the `Authorization` header with the user’s token from the database.

Example header:

```
Authorization: 12hjksdh98342ndkjc
```

---

## Database

MongoDB is used for data persistence. The schemas include:

- User: stores username, token, recently viewed articles.
- Article: stores author, title, text, views.
  Schema for each can be found in `src/models`

---

## Development

- The project uses ES modules
- Controller functions are in `/controllers/controllers.js`
- Routes are in `/routes/articleRoutes.js`
- Authentication middleware in `/middleware/authWare.js`

---

## Other Features

- Simple token-based authentication.
- Pagination implemented for article listing
- Recently viewed articles stored as an array of ObjectIds in the user document
- Necessary Dockerfile and docker-compose.yml provided.
