# Database Migrations

This directory contains the database migration scripts for the Dungeon Delvers
project. We use the `node-pg-migrate` package to manage and run these
migrations.

## Setup

To get started with running the migrations, ensure you have the following
prerequisites:

- Node.js installed
- PostgreSQL database setup
- `node-pg-migrate` package installed

You can install `node-pg-migrate` by running:

```sh
npm install -g node-pg-migrate
```

## Running Migrations

To run the migrations, use the following command:

```sh
npm run migrate up
```

This command will apply all pending migrations and set up the necessary database
tables and types.

## Creating a New Migration

To create a new migration, use the following command:

```sh
npm run migrate create <migration_name>
```

Replace `<migration_name>` with a descriptive name for your migration. This will
generate a new migration file in the `migrations` directory.

## Migration Files

Each migration file contains two main functions:

- `up`: Defines the changes to apply to the database (e.g., creating tables,
  adding columns).
- `down`: Defines how to revert the changes made in the `up` function.

Example migration file:

```js
exports.up = pgm => {
  pgm.createTable('example_table', {
    id: 'id',
    name: { type: 'text', notNull: true },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
  })
}

exports.down = pgm => {
  pgm.dropTable('example_table')
}
```

## Notes

- This directory is focused solely on setting up database tables and types.
- Data population is not handled by these migrations.

For more information on `node-pg-migrate`, refer to the
[official documentation](https://github.com/salsita/node-pg-migrate).
