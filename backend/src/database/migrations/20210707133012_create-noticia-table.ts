import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('noticias', table=>{
        table.increments('id').primary().unique();
        table.string('url_imagem').notNullable();
        table.string('titulo').notNullable();
        table.string('descricao').notNullable();
        table.string('tema').notNullable();
        table.string('url_noticia').notNullable();
        
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('noticias');
}

