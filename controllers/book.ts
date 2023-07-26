import { Book } from "../schema/schema";
import { BookPostschema, BookUpdateschema } from "../validation/book";

// Create a new reservation (book)
export const postReservation = async (req: any, res: any, next: any) => {
    try {
        const value = await BookPostschema.validateAsync(req.body);

        const book = await Book.create(value);

        return res.status(201).send(book);
    } catch (error: any) {
        return res.status(500).send(error.message);
    }
};

// Get all reservations (books)
export const getReservations = async (req: any, res: any, next: any) => {
    const page = Number(req.query?.page) || 1;
    const PAGE_SIZE = 10;
    const limit = Number(req.query?.limit) || PAGE_SIZE;
    try {
        const results = await Book.find()
            .sort({ createdAt: "desc" });

        res.send(results);

    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

// Get a specific reservation (book) by ID
export const getReservation = async (req: any, res: any, next: any) => {
    try {
        const bookId = Number(req.params.id);

        const book = await Book.findById(bookId).populate("vehicle"); // Populate the vehicle reference

        if (!book) {
            return res.status(404).send("Reservation not found");
        }

        res.send(book);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

// Delete a reservation (book) by ID
export const deleteReservation = async (req: any, res: any, next: any) => {
    try {
        const bookId = Number(req.params.id);

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).send("Reservation not found");
        }

        const deleted = await Book.findByIdAndDelete(bookId);
        if (!deleted) {
            return res.status(500).send("Something went wrong");
        }
        res.send("Reservation deleted");
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}

// Update a reservation (book) by ID
export const updateReservation = async (req: any, res: any, next: any) => {
    try {
        const bookId = Number(req.params.id);

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).send("Reservation not found");
        }

        const value = await BookUpdateschema.validateAsync(req.body);

        // Update the reservation (book)
        const updatedBook = await Book.findByIdAndUpdate(bookId, value, {
            new: true,
        });

        res.send(updatedBook);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}
