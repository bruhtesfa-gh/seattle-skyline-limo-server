import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { deleteVehicle, getVehicle, getVehicles, postVehicle, updateVehicle } from "../controllers/vehicle";

const vehicleRouter = Router();

vehicleRouter.route("/").post(authMiddleware, postVehicle).get(getVehicles);
vehicleRouter
    .route("/:id")
    .delete(authMiddleware, deleteVehicle)
    .patch(authMiddleware, authMiddleware, updateVehicle)
    .get(getVehicle);

export default vehicleRouter;