import mongoose from "mongoose";
// Define the User schema
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    img: { type: String, default: '' },
    email: { type: String, unique: true },
    password: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Define the Blog schema
const blogSchema = new mongoose.Schema({
    title: String,
    img: String,
    content: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Define the Vehicle schema
const vehicleSchema = new mongoose.Schema({
    name: String,
    model: String,
    img: String,
    description: String,
    speed: Number,
    automatic: { type: Number, default: 1 },
    heatedSeat: { type: Number, default: 1 },
    gpsNavigation: { type: Number, default: 1 },
    pricePerDay: Number,
    type: String, // VehicleType enum will be represented as a String
    passengerSize: Number,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Define the Book schema
const bookSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    fromAddress: String,
    toAddress: String,
    email: String,
    phoneNumber: String,
    luggageCount: Number,
    personCount: Number,
    journeyDate: Date,
    description: String,
    status: String, // ReservationStatus enum will be represented as a String
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Define the Comment schema
const commentSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    comment: String,
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Create the models
const User = mongoose.model('User', userSchema);
const Blog = mongoose.model('Blog', blogSchema);
const Vehicle = mongoose.model('Vehicle', vehicleSchema);
const Book = mongoose.model('Book', bookSchema);
const Comment = mongoose.model('Comment', commentSchema);

export { User, Blog, Vehicle, Book, Comment };