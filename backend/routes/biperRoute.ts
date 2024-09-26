import  express, { Router }  from "express";
import { createBeeper} from "../controllers/beeperController.js";
import { getAllBeepersController } from "../controllers/beeperController.js";
import { getBeeperById } from "../service/bepperService.js";


const router: Router = express.Router();

router.route('/').post(createBeeper);
router.route('/').get(getAllBeepersController);
router.route('/:id').get(getBeeperById as any);
router.route('/:id/status').put();
router.route('/:id').delete();
router.route('/status/:status').delete();

export default router;