import { pool } from "../db.js";
import { recomendacion, tratamiento } from "../Service/OpenAIService.js";
import tratamientoModel from "../model/Tratamiento.js";

//Crear Recomendacion
export const getRecomendation = async (req, res) => {
  const id = req.params.id;
  try {
    const treatment = await tratamientoModel.find(id);
    if (!treatment) {
      return res.json("El tratamiento no existe.");
    }

    const recomendation = await tratamientoModel.getRecomendationsByTreatmentId(
      id
    );

    if (recomendation) {
      return res.json(recomendation);
    } else {
      const respuesta = await recomendacion(treatment.detail);
      const newRecomendation = await tratamientoModel.createRecomendation(
        treatment.id,
        respuesta
      );
      return res.json(newRecomendation);
    }
  } catch (error) {
    console.error("Error obteniendo la recomendación:", error);
    return res.status(500).json("Error del servidor");
  }
};

export const getTreatment = async (req, res) => {
  const id = req.params.id;
  try {
    const treatment = await tratamientoModel.find(id);
    if (!treatment) {
      return res.json("El tratamiento no existe.");
    }
    return res.json(treatment);
  } catch (error) {
    console.error("Error obteniendo el tratamiento:", error);
    return res.status(500).json("Error del servidor");
  }
};

export const getTreatmentByPacient = async (req, res) => {
  const pacient_id = req.params.pacient_id;
  try {
    const treatment = await tratamientoModel.findTreatmentPacient(pacient_id);
    if (!treatment) {
      return res.json("El tratamiento no existe.");
    }
    return res.json(treatment);
  } catch (error) {
    console.error("Error obteniendo el tratamiento:", error);
    return res.status(500).json("Error del servidor");
  }
}

//Crear Tratamiento
/* export const createTreatment = async (req,res) => {
    try {
        const treatmentData = req.body;
        const newTreatment = await tratamientoModel.store(treatmentData);
        res.status(201).json(newTreatment);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
} */

export const createTreatment = async (req, res) => {
  try {
    const { id, pacient_id , title, notes } = req.body;
    const newTreatment = await tratamiento(title, notes);
    const storeStoryDetail = await tratamientoModel.storeStoryDetail({
      id,
      pacient_id,
      title,
      notes,
    });
    console.log("🚀 ~ createTreatment ~ storeStoryDetail:", storeStoryDetail)
    const storeTreatment = await tratamientoModel.store({
      history_id: storeStoryDetail.history_id,
      detail: newTreatment.detalle,
      title: newTreatment.titulo,
      recipe: newTreatment.receta,
    });
    res.status(201).json(storeTreatment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
