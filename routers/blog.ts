import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { deleteBlog, getBlog, getBlogs, postBlog, updateBlog } from "../controllers/blog";
const blogRouter = Router();
blogRouter.route("/").post(authMiddleware, postBlog).get(getBlogs);
blogRouter.route("/:id")
    .delete(authMiddleware, deleteBlog)
    .patch(authMiddleware, updateBlog)
    .get(getBlog);

export default blogRouter;