import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IBook extends Document {
  title: string;
  isbn: string;
  authorId: ObjectId;
  year: number;
  genre: string;
  quantity: number;
}

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  isbn: { type: String, unique: true },
  authorId: { type: Schema.Types.ObjectId },
  year: { type: Number },
  genre: { type: String },
  quantity: { type: Number, default: 0 },
});

const Book = mongoose.model<IBook>("Book", BookSchema);

export default Book;
