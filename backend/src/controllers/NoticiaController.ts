import { Request, Response } from 'express';
import knex from '../database/connection'



class NoticiaController {
   async update(request: Request, response: Response) {
        const { url_imagem,
            titulo,
            descricao,
            tema,
            url_noticia } = request.body
        const { id } = request.params
        await knex('noticias')
            .update({ url_imagem,
                titulo,
                descricao,
                tema,
                url_noticia })
            .where({ id })

            return response.send();
    }
    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const noticia = await knex('noticias').where('id', id).select('*').first()

        if (noticia.id != id) {
            return response.status(401).json({ error: "Operation not permitted." })

        }
        await knex('noticias').where('id', id).delete();
        return response.status(204).send();
    }
    async index(request: Request, response: Response) {
        const noticias = await knex('noticias').select('*');
        const serializedNoticias = noticias.map(noticia => {
            return {
                id: noticia.id,
                url_imagem: noticia.url_imagem,
                titulo: noticia.titulo,
                descricao: noticia.descricao,
                tema: noticia.tema,
                url_noticia: noticia.url_noticia
            }
        })
        return response.json(serializedNoticias)
    }
    async create(request: Request, response: Response) {
        const {
            url_imagem,
            titulo,
            descricao,
            tema,
            url_noticia
        } = request.body;
        const trx = await knex.transaction();
        const noticia = {
            url_imagem,
            titulo,
            descricao,
            tema,
            url_noticia
        }
        const insertedIds = await trx('noticias').insert(noticia)
        const noticia_id = insertedIds[0];


        await trx.commit();
        return response.json({
            id: noticia_id,
            ...noticia,
        })
    }

}


export default NoticiaController;