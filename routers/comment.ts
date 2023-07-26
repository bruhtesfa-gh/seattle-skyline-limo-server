import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { deleteComment, getComment, getComments, postComment } from "../controllers/comment";

const commentRouter = Router();
commentRouter.get("/:blogId", getComments);
commentRouter.post("/", postComment);
commentRouter.route("/:id").delete(authMiddleware, deleteComment).get(getComment);
export default commentRouter;