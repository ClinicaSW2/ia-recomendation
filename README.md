# Nodejs PostgreSQL REST API

A REST API using Node.js and PostgreSQL with pg library and using Express.js for routing.

## Requirements

- Node.js

- PostgreSQL

## Installation

1. Clone the repository: `git clone https://github.com/ClinicaOftalmologica/IA2-Recomendation.git`

2. Install the dependencies: `npm install`

3. Create a database in PostgreSQL

4. Create a .env file in the root directory and add the following:

```
DB_USER=postgres
DB_PASSWORD=12345678
DB_HOST=localhost
DB_DATABASE=db_recomendation
DB_PORT=5432
PORT=3000
OPENAI_KEY=
```

or just copy the .env.template file and fill it with your data.

5. Run the server: `npm run dev`

## Endpoints
- GET /api/recomendation/:id
- POST /api/storeTreatment


## License

This project is open-sourced software licensed under the MIT License.# ia-recomendation
