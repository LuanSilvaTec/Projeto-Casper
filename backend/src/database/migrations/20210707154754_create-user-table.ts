import  Knex  from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', table=>{
        table.increments('id').primary().unique();
        table.string('login').notNullable();
        table.string('password').notNullable();
        
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}

