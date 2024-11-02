import { pool } from "../db.js";
import  recomendacion from "../Service/OpenAIService.js";
import tratamientoModel from '../model/Tratamiento.js';



//Crear Recomendacion
export const getRecomendation = async (req, res) => {
  const id = req.params.id;
  try {
    const treatment = await tratamientoModel.find(id);
    if (!treatment) {
      return res.json("El tratamiento no existe.");
    }

    const recomendation = await tratamientoModel.getRecomendationsByTreatmentId(id);

    if (recomendation) {
      return res.json(recomendation);
    } else {  
      const respuesta = await recomendacion(treatment.detail);
      const newRecomendation = await tratamientoModel.createRecomendation(treatment.id, respuesta);
      return res.json(newRecomendation);
    }
  } catch (error) {
    console.error('Error obteniendo la recomendación:', error);
    return res.status(500).json('Error del servidor');
  }
};

//Crear Tratamiento
export const createTreatment = async (req,res) => {
    try {
        const treatmentData = req.body;
        const newTreatment = await tratamientoModel.store(treatmentData);
        res.status(201).json(newTreatment);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}