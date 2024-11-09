//Model

import { pool } from "../db.js";

export const store = async (Tratamiento) => {
  const { history_id, detail, title, recipe } = Tratamiento;
  try {
    const { rows } = await pool.query(
      "INSERT INTO treatment (history_id, detail, title, recipe) VALUES ($1, $2,$3,$4) RETURNING *",
      [history_id, detail, title, recipe]
    );

    return rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const storeStoryDetail = async (historyDetail) => {
  const { id, title, notes } = historyDetail;
  try {
    const { rows } = await pool.query(
      "INSERT INTO history_detail (history_id, title, notes) VALUES ($1, $2, $3) RETURNING *;",
      [id, title, notes]
    );
    return rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

// Función para encontrar un tratamiento por su ID
export const find = async (id) => {
  try {
    const treatmentResponse = await pool.query(
      "SELECT * FROM treatment WHERE history_id = $1;",
      [id]
    );
    return treatmentResponse.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

// Función para obtener las recomendaciones de un tratamiento por su ID
export const getRecomendationsByTreatmentId = async (id) => {
  try {
    const recomendationResponse = await pool.query(
      `SELECT recomendation.* 
             FROM treatment 
             JOIN recomendation ON treatment.id = recomendation.treatment_id 
             WHERE treatment.history_id = $1;`,
      [id]
    );
    return recomendationResponse.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

// Función para crear una nueva recomendación para un tratamiento
export const createRecomendation = async (tratamientoId, description) => {
  try {
    const response = await pool.query(
      `INSERT INTO recomendation (treatment_id, description) 
             VALUES ($1, $2) 
             RETURNING *;`,
      [tratamientoId, description]
    );
    return response.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  store,
  storeStoryDetail,
  createRecomendation,
  find,
  getRecomendationsByTreatmentId
};
