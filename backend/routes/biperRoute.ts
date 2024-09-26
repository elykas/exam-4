import  express, { Router }  from "express";
import { createBeeper, deleteBeeperController,getById, getByStatus,editByIdController} from "../controllers/beeperController.js";
import { getAllBeepersController } from "../controllers/beeperController.js";



const router: Router = express.Router();

router.route('/').post(createBeeper);
router.route('/').get(getAllBeepersController);
router.route('/:id').get(getById);
router.route('/:id/status').put(editByIdController);
router.route('/:id').delete(deleteBeeperController);
router.route('/status/:status').get(getByStatus);

export default router;