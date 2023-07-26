import { Comment } from "../schema/schema";
import { CommentPostschema } from "../validation/comment";

// Create a new comment
export const postComment = async (req: any, res: any, next: any) => {
    try {
        const value = await CommentPostschema.validateAsync(req.body);

        const comment = await Comment.create(value);

        return res.status(201).send(comment);
    } catch (error: any) {
        return res.status(500).send(error.message);
    }
};

// Get all comments for a specific blog post
export const getComments = async (req: any, res: any, next: any) => {
    try {
        const page = Number(req.query?.page) || 1;
        const PAGE_SIZE = 10;
        const limit = Number(req.query?.limit) || PAGE_SIZE;

        const results = await Comment.find({ blogId: Number(req?.params?.blogId) })
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: "desc" });

        res.send(results);
    } catch (error: any) {
        return res.status(500).send(error.message);
    }
};

// Get a specific comment by ID
export const getComment = async (req: any, res: any, next: any) => {
    try {
        const commentId = Number(req.params.id);

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).send("Comment not found");
        }

        res.send(comment);
    } catch (error: any) {
        return res.status(500).send(error.message);
    }

};

// Delete a comment by ID
export const deleteComment = async (req: any, res: any, next: any) => {
    try {
        const commentID = Number(req.params.id);

        const comment = await Comment.findById(commentID);
        if (!comment) {
            return res.status(404).send("Comment not found");
        }

        const deleted = await Comment.findByIdAndDelete(commentID);
        if (!deleted) {
            return res.status(500).send("Comment could not be deleted");
        }
        res.send("Comment deleted");
    } catch (error: any) {
        return res.status(500).send(error.message);
    }
};
