#!/bin/sh

# Check if the initialization has already been done and that we enabled automatic migration
if [ "${ENABLE_DB_MIGRATIONS}" = "true" ] && [ ! -f /app/docker-data/db_status ]; then
    echo "Running database setup and migrations..."

    # Run setup and migration scripts
    npx ts-node ./scripts/setup-db.ts
    yarn database:migrate:prod

    # Mark initialization as done
    echo "Successfuly migrated DB!"
    touch /app/docker-data/db_status
fi

# Continue with the original Docker command
exec "$@"
