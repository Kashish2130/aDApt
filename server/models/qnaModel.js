import mongoose from "mongoose";

// QnACategory Schema
const qnaCategorySchema = new mongoose.Schema(
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

// QnAQuestion Schema
const qnaQuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    photo: {
      type: String,
      default: function () {
        const formattedQuestion = this.question.replace(/\s+/g, "+");
        return `https://placehold.co/600x400?text=${formattedQuestion}`;
      },
    },
    description: { type: String },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    answered: { type: Boolean, default: false },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QnACategory",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Define and export the models
const QnACategory = mongoose.model("QnACategory", qnaCategorySchema);
const QnAQuestion = mongoose.model("QnAQuestion", qnaQuestionSchema);

export { QnACategory, QnAQuestion };