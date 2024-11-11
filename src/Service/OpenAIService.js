import OpenAI from "openai";
import { OPENAI_KEY } from "../config.js";

const openai = new OpenAI({
  apiKey: OPENAI_KEY,
});

async function recomendacion(text) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Eres un asistente útil diseñado para responder en Español y actuar como un doctor oftalmólogo dando recomendaciones sobre el cuidados y prevenciones basados en una receta médica o tratamiento medico. Las recomendaciones respondeme solo en 2 puntos y cada punto puede tener como minimo 30 y maximo a 50 palabras",
      },
      { role: "user", content: "Detalle receta : " + text },
    ],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
}

// generar tratamiento
async function tratamiento(tituloDetalleHistoriaClinica, notas) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Eres un asistente médico que actúa como un doctor oftalmólogo especializado en tratamientos y cuidados oculares. Responde en tres secciones: Título del tratamiento, Detalle del tratamiento y Receta recomendada, cada una con información breve y precisa.",
      },
      {
        role: "user",
        content: `Título del detalle de historia clínica: ${tituloDetalleHistoriaClinica}\nNotas: ${notas}`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const response = completion.choices[0].message.content;

  // Extraer cada sección usando expresiones regulares para mayor precisión
  const tituloMatch = response.match(/Título del tratamiento:\s*([^\n]+)/);
  const detalleMatch = response.match(/Detalle del tratamiento:\s*([\s\S]*?)(?=Receta recomendada:|$)/);
  const recetaMatch = response.match(/Receta recomendada:\s*([\s\S]*)/);

  const titulo = tituloMatch ? tituloMatch[1].trim() : null;
  const detalle = detalleMatch ? detalleMatch[1].trim() : null;
  const receta = recetaMatch ? recetaMatch[1].trim() : null;

  return { titulo, detalle, receta };
}

export { recomendacion, tratamiento };
