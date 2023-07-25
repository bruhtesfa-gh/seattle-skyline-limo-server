import mongoose from "mongoose";
// User schema
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }],
    vehicles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle'
    }]
}, {
    timestamps: true
});

// Blog schema
const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

// Vehicle schema 
const vehicleSchema = new mongoose.Schema({
    name: String,
    model: String,
    type: {
        type: String,
        enum: ['SUV', 'BUS', 'VAN', 'SEDAN']
    },
    pricePerDay: Number,
    passengerSize: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

// Reservation (Book) schema
const bookSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle'
    },
    status: {
        type: String,
        enum: ['PENDING', 'COMPLETED', 'REJECTED'],
        default: 'PENDING'
    }
}, {
    timestamps: true
});

// Comment schema
const commentSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    comment: String,
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }
}, {
    timestamps: true
});


// User model
const User = mongoose.model('User', userSchema);
export { User }

// Blog model 
const Blog = mongoose.model('Blog', blogSchema);
export { Blog }

// Vehicle model
const Vehicle = mongoose.model('Vehicle', vehicleSchema);
export { Vehicle }

// Book model
const Book = mongoose.model('Book', bookSchema);
export { Book }

// Comment model
const Comment = mongoose.model('Comment', commentSchema);
export { Comment }