/* global db:readable, printjson */

/**
 * Initiate MongoDB with default data.
 *
 * @see https://docs.mongodb.com/manual/reference/method/js-database/
 */

db.stats()
db.version()

const response = [db.createCollection('user')]

printjson(response)
