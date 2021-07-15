import knex from 'knex';
const config =require('../knexfile.js')

const env = process.env.DB_ENV ||'development'
/*
const connection = knex({
    client:'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      },
    useNullAsDefault:true,

})*/
const db= knex(config[env])
export default db;
//export default connection;

