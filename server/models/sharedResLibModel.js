import mongoose from "mongoose";

// SharedCategory Schema
const sharedLibraryCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true},
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

// SharedItem Schema
const sharedLibraryItemSchema = new mongoose.Schema(
  {
    item: { type: String, required: true },
    description: { type: String },
    resourceURL: { type: String, required: true }, //fileupload
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SharedCategory",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Define and export the models
const SharedCategory = mongoose.model(
  "SharedCategory",
  sharedLibraryCategorySchema
);
const SharedItem = mongoose.model("SharedItem", sharedLibraryItemSchema);

export { SharedCategory, SharedItem };