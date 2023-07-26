import { User } from "../schema/schema";
import { comparePasswords, hashPassword } from "../utils/auth";
import { userChangePasswordSchema, userUpdateschema } from "../validation/user";
import upload from "../utils/multer";
import { rm } from "fs/promises";
import path from "path";

const uploads = upload.single("img");
const userPropertiestWithPassword = {
    createdAt: true,
    email: true,
    firstName: true,
    id: true,
    img: true,
    lastName: true,
    updatedAt: true,
};

export const changePassword = async (req: any, res: any, next: any) => {
    try {
        const user = await User.findById(req?.user?.id);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const body = req.body;
        const value = await userChangePasswordSchema.validateAsync(body);

        if ((await comparePasswords(value.oldPassword, user.password)) === false) {
            return res.status(400).send("Old password is incorrect");
        }

        // Update the user password
        const updatedUser = await User.findByIdAndUpdate(
            req?.user?.id,
            { password: await hashPassword(value.newPassword) },
            { new: true }
        ).select(userPropertiestWithPassword);
        if (!updatedUser) return res.status(404).send("User not found");
        res.send(updatedUser);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
};

export const updateProfile = [
    uploads,
    async (req: any, res: any, next: any) => {
        try {
            const user = await User.findById(req.user?.id);
            if (!user) {
                return res.status(404).send("User not found");
            }

            const body = req.body;
            if (req.file) {
                body["img"] = req.file?.filename;
            }

            const value = await userUpdateschema.validateAsync(body);

            // Update the user profile
            const updatedUser = await User.findByIdAndUpdate(
                req.user?.id,
                value,
                { new: true }
            ).select(userPropertiestWithPassword);

            res.send(updatedUser);
        } catch (err: any) {
            if (req.file?.filename) {
                // If the validation fails, delete the uploaded file
                await rm(path.join(__dirname, "../uploads/", req.file?.filename));
            }
            res.status(500).send(err.message);
        }
    },
];
