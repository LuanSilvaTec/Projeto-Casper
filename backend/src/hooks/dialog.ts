import { Request, Response } from 'express';
import knex from '../database/connection'
export default class DialogHook {

  async dialog(request: Request, response: Response) {
    let intent

    var intentName = request.body.queryResult.intent.displayName;
    if (intentName == "noticias.famosos") {
      intent = 'Famosos'
    }
    else if (intentName == "noticias.esportes") {
      intent = 'Esportes'
    }
    else if (intentName == "noticias.entretenimento") {
      intent = 'Entretenimento'
    }
    else if (intentName == "noticias.politica") {
      intent = 'Política'
    }

    console.log("Teste de integração para busca de noticias sobre " + intent);
    const noticias = await knex('noticias').select('*').where('tema', intent).limit(10);
    //console.log(noticias);
    const statusRetorno = noticias.length

    if (statusRetorno != 0) {
      const serializedNoticias = noticias.map(noticia => {
        return {
          image_url: noticia.url_imagem,
          title: noticia.titulo,
          subtitle: noticia.descricao,
          url_noticia: noticia.url_noticia
        }
      })
      //console.log(serializedNoticias)
      /*Sem parâmetro de payload */
      //console.log(request.body.queryResult.fulfillmentMessages.push(responseJson))
      //console.log(request.body.queryResult.fulfillmentMessages)
      //console.log(request.body)
      //console.log(request.body.queryResult)
      let responseJson = {
        "fulfillmentMessages": [
          {
            "payload": {
              "facebook": {
                "attachment": {
                  "type": "template",
                  "payload": {
                    "template_type": "generic",
                    "elements": [

                    ]
                  }
                }
              }
            },
            "platform": "FACEBOOK"
          }
        ]
      }

      const elements = []
      for (var i = 0; i < serializedNoticias.length; i++) {
        let obj = {
          "title": serializedNoticias[i].title,
          "subtitle": serializedNoticias[i].subtitle,
          "image_url": serializedNoticias[i].image_url,
          "buttons": [
            {
              "title": "View",
              "type": "web_url",
              "url": serializedNoticias[i].url_noticia
            },
          ]
        }
        console.log(obj)
        responseJson.fulfillmentMessages[0].payload.facebook.attachment.payload.elements.push(obj)
      }

      console.log(responseJson.fulfillmentMessages[0].payload.facebook.attachment)
      response.json(responseJson)

    }
    else {
      response.json({
        "fulfillmentMessages": [
          {
            "text": {
              "text": [
                "Desculpe, não há notícias cadastradas sobre " + intent + '. Digite "ok" para visualizar o menu novamente.'
              ]
            }
          }
        ]
      })
    }
  }
}