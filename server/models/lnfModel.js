import mongoose from "mongoose";

// LostAndFoundCategory Schema
const lostAndFoundCategorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// LostAndFoundItem Schema
const lostAndFoundItemSchema = new mongoose.Schema(
    {
        item: { type: String, required: true },
        contact: { type: String, required: true },
        description: { type: String },
        photo: {
            type: String,
            default: function () {
                const formattedItem = (this.item || "Item").replace(/\s+/g, "+");
                return `https://placehold.co/600x400?text=${formattedItem}`;
            },
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "LostAndFoundCategory",
            required: true,
        },
        isFound: { type: Boolean, default: false },
        foundAt: { type: Date, default: null },
    },
    {
        timestamps: true,
    }
);

// Middleware to delete items older than 7 days before any query
lostAndFoundItemSchema.pre("find", async function () {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    await mongoose.model("LostAndFoundItem").deleteMany({
        foundAt: { $lt: sevenDaysAgo },
    });
});

//! just to test:
// lostAndFoundItemSchema.pre("find", async function () {
//   const oneMinuteAgo = new Date();
//   oneMinuteAgo.setMinutes(oneMinuteAgo.getMinutes() - 1); // Change to 1 minute for testing

//   await mongoose.model("LostAndFoundItem").deleteMany({
//     foundAt: { $lt: oneMinuteAgo },
//   });
// });

// Define and export the models
const LostAndFoundCategory = mongoose.model(
    "LostAndFoundCategory",
    lostAndFoundCategorySchema
);
const LostAndFoundItem = mongoose.model(
    "LostAndFoundItem",
    lostAndFoundItemSchema
);

export { LostAndFoundCategory, LostAndFoundItem };