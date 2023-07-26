
import upload from "../utils/multer";
import { rm } from "fs/promises";
import path from "path";
import { Vehicle } from "../schema/schema";
import { VehiclePostschema, VehicleUpdateschema } from "../validation/vehicle";
const uploads = upload.single("img");

// Create a new vehicle
export const postVehicle = [
    uploads,
    async (req: any, res: any, next: any) => {
        try {
            const value = await VehiclePostschema.validateAsync({
                ...req.body,
                userId: req.user?.id,
                img: req.file?.filename,
            });

            const car = await Vehicle.create({
                ...value,
                img: req.file?.filename,
            });
            if (!car) return res.status(404).send('could not create vehicle');
            res.send(car);
        } catch (err: any) {
            if (req.file?.filename) {
                // If the validation fails, delete the uploaded file
                await rm(path.join(__dirname, "../uploads/", req.file?.filename));
            }
            res.status(500).send(err.message);
        }
    },
];

// Get all vehicles
export const getVehicles = async (req: any, res: any, next: any) => {
    try {
        const page = Number(req.query?.page) || 1;
        const PAGE_SIZE = 6;
        const limit = Number(req.query?.limit) || PAGE_SIZE;

        const results = await Vehicle.find()
            .sort({ createdAt: "desc" })
            .populate("user"); // Populate the user reference
        if (!results) return res.status(404).send('could not find vehicles')
        res.send(results);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

// Get a specific vehicle by ID
export const getVehicle = async (req: any, res: any, next: any) => {
    try {
        const carId = Number(req.params.id);

        const car = await Vehicle.findById(carId);

        if (!car) {
            return res.status(404).send('Vehicle not found');
        }

        res.send(car);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

// Delete a vehicle by ID
export const deleteVehicle = async (req: any, res: any, next: any) => {
    try {
        const carId = Number(req.params.id);

        const car = await Vehicle.findById(carId);
        if (!car) {
            return res.status(404).send('Vehicle not found');
        }

        // TODO: Delete the associated image file if needed

        const deleted = await Vehicle.findByIdAndDelete(carId);
        if (!deleted) return res.status(404).send('could not delete vehicle');
        res.send("Car deleted");
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

// Update a vehicle by ID
export const updateVehicle = [
    uploads,
    async (req: any, res: any, next: any) => {
        try {
            const carId = Number(req.params.id);

            const car = await Vehicle.findById(carId);
            if (!car) {
                return res.status(404).send('Vehicle not found');
            }

            const body = req.body;
            if (req.file) {
                body["img"] = req.file?.filename;
            }

            const value = await VehicleUpdateschema.validateAsync(body);

            // TODO: Delete the previous associated image file if needed

            // Update the vehicle
            const updatedCar = await Vehicle.findByIdAndUpdate(carId, value, {
                new: true,
            });
            if (!updatedCar) return res.status(404).send('could not update vehicle');
            res.send(updatedCar);
        } catch (err) {
            if (req.file?.filename) {
                // If the validation fails, delete the uploaded file
                await rm(path.join(__dirname, "../uploads/", req.file?.filename));
            }
            res.status(500).send(err.message);
        }
    },
];
