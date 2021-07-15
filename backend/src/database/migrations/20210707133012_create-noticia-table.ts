import  Knex  from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('noticias', table=>{
        table.increments('id').primary().unique();
        table.string('url_imagem',1000).notNullable();
        table.string('titulo').notNullable();
        table.string('descricao',1000).notNullable();
        table.string('tema').notNullable();
        table.string('url_noticia',500).notNullable();
        
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('noticias');
}

