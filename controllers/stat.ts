import { Blog, Book, Vehicle } from "../schema/schema";

// Get statistics
const getStats = async (req: any, res: any) => {
    try {
        const numberOfPendingReservation = await Book.countDocuments({
            status: "PENDING",
        });

        const numberOfCompletedReservation = await Book.countDocuments({
            status: "COMPLETED",
        });

        const numberOfReservation = await Book.countDocuments();

        const numberOfRejectedReservation = await Book.countDocuments({
            status: "REJECTED",
        });

        const numberOfBlogs = await Blog.countDocuments();

        const numberOfVehicle = await Vehicle.countDocuments();

        const numberOfNewReservation = await Vehicle.countDocuments({
            createdAt: {
                $gte: new Date(new Date().getTime() - 12 * 60 * 60 * 1000),
            },
        });

        res.send({
            numberOfPendingReservation,
            numberOfCompletedReservation,
            numberOfRejectedReservation,
            numberOfBlogs,
            numberOfReservation,
            numberOfVehicle,
            numberOfNewReservation,
        });
    } catch (error: any) {
        return res.status(500).send(error.message);
    }
};

export { getStats };
