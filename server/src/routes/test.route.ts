import { Router } from "express";
import { test } from "../controllers/test.controller";
import { authentication, asyncHandler} from "../middlewares/checkAuth";
const router = Router();

router.get("/", test);
router.get("/test", authentication, asyncHandler(test));

export default router;
