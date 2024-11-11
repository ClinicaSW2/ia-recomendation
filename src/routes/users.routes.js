import { Router } from "express";
import {
  getRecomendation,
  createTreatment,
  getTreatment,
  getTreatmentByPacient
} from "../controllers/index.controller.js";

const router = Router();

router.post("/api/treatment",createTreatment);
router.get("/api/treatment/:id",getTreatment);
router.get("/api/recomendation/:id",getRecomendation);
router.get("/api/treatment/pacient/:pacient_id",getTreatmentByPacient);


export default router;
