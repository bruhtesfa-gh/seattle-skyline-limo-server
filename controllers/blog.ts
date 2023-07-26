// Import the Mongoose models and other required modules
import { Blog } from "../schema/schema"; // Assuming you have defined the Mongoose model for Blog

import { BlogPostschema, BlogUpdateschema } from "../validation/blog";
import upload from "../utils/multer";
import { rm } from "fs/promises";
import path from "path";
// The rest of the imports and setup remains the same

// Middleware for uploading a single image
const uploads = upload.single("img");

// Create a new blog post
export const postBlog = [
    uploads,
    async (req: any, res: any, next: any) => {
        try {
            const value = await BlogPostschema.validateAsync({
                ...req.body,
                img: req.file?.filename,
            });

            const blog = await Blog.create({
                userId: req.user?.id,
                ...value,
                img: req.file?.filename,
            });

            return res.send(blog);
        } catch (err) {
            if (req.file?.filename) {
                // If the validation fails, delete the uploaded file
                await rm(path.join(__dirname, "../uploads/", req.file?.filename));
            }
            next(err);
        }
    },
];

// Get all blogs
export const getBlogs = async (req: any, res: any, next: any) => {
    const page = Number(req.query?.page) || 1;
    const PAGE_SIZE = 6;
    const limit = Number(req.query?.limit) || PAGE_SIZE;
    try {
        const blogs = await Blog.find()
            .sort({ createdAt: "desc" })
            .populate("user"); // Populate the user reference
        res.send(blogs);
    } catch (error: any) {
        return res.status(404).send('Blogs not found');
    }
};

// Get a specific blog by ID
export const getBlog = async (req: any, res: any, next: any) => {
    try {
        const blogId = Number(req.params.id);

        const blog = await Blog.findById(blogId).populate("user"); // Populate the user reference

        if (!blog) {
            return res.status(404).send('Blog not found');
        }

        res.send(blog);
    } catch (error: any) {
        return res.status(404).send('Blog not found');
    }
};

// Delete a blog by ID
export const deleteBlog = async (req: any, res: any, next: any) => {
    const blogId = Number(req.params.id);

    const blog = await Blog.findById(blogId);
    if (!blog) {
        return res.status(404).send('Blog not found');
    }

    //TODO: delete the associated image file if needed

    const deleted = await Blog.findByIdAndDelete(blogId);
    if (!deleted) {
        return res.status(404).send('Blog not found');
    }
    res.send("Blog deleted");
};

// Update a blog by ID
export const updateBlog = [
    uploads,
    async (req: any, res: any, next: any) => {
        try {
            const blogId = Number(req.params.id);

            const blog = await Blog.findById(blogId);
            if (!blog) {
                return res.status(404).send('Blog not found');
            }

            const body = req.body;
            if (req.file) {
                body["img"] = req.file?.filename;
            }

            const value = await BlogUpdateschema.validateAsync(body);

            //TODO: Delete the previous associated image file if needed

            // Update the blog
            const updatedBlog = await Blog.findByIdAndUpdate(blogId, value, {
                new: true,
            }).populate("user"); // Populate the user reference

            res.send(updatedBlog);
        } catch (err) {
            if (req.file?.filename) {
                // If the validation fails, delete the uploaded file
                await rm(path.join(__dirname, "../uploads/", req.file?.filename));
            }
            next(err);
        }
    },
];
