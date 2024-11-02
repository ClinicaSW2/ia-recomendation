import { Router } from "express";
import {
  getRecomendation,
  createTreatment,
} from "../controllers/index.controller.js";

const router = Router();

router.post("/api/storeTreatment",createTreatment);
router.get("/api/recomendation/:id",getRecomendation);


export default router;
