import { Router } from "express";
import { test } from "../controllers/test.controller";

const router = Router();

router.get("/", test);

export default router;
