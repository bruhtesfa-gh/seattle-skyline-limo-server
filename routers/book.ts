import { Router } from "express";
import { deleteReservation, getReservation, getReservations, postReservation, updateReservation } from "../controllers/book";
import { authMiddleware } from "../middlewares/auth";
const bookRouter = Router();
bookRouter
    .route("/")
    .post(postReservation)
    .get(authMiddleware, getReservations);
bookRouter
    .route("/:id")
    .delete(authMiddleware, deleteReservation)
    .patch(authMiddleware, updateReservation)
    .get(authMiddleware, getReservation);
export default bookRouter;