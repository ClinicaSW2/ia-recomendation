import OpenAI from "openai";
import {OPENAI_KEY} from "../config.js";

const openai = new OpenAI({
    apiKey: OPENAI_KEY,
});

async function  recomendacion(text){
    const completion = await openai.chat.completions.create({
        messages: [{"role": "system", "content": "Eres un asistente útil diseñado para responder en Español y actuar como un doctor oftalmólogo dando recomendaciones sobre el cuidados y prevenciones basados en una receta médica o tratamiento medico. Las recomendaciones respondeme solo en 2 puntos y cada punto puede tener como minimo 30 y maximo a 50 palabras"},
            {"role": "user", "content": "Detalle receta : "+text}],
        model: "gpt-3.5-turbo",
      });

      return completion.choices[0].message.content;
}

export default recomendacion;





