import mongoose, { Schema, Document, ObjectId } from "mongoose";

interface IBook extends Document {
  title: string;
  isbn: string;
  authorId: ObjectId;
  year: number;
  genre: string;
  quantity: number;
  borrowed: boolean;
}

const BookSchema: Schema = new Schema({
  title: { type: String },
  isbn: { type: String },
  authorId: { type: Schema.Types.ObjectId },
  year: { type: Number },
  genre: { type: String },
  quantity: { type: Number },
  borrowed: { type: Boolean },
});

const Book = mongoose.model<IBook>("Book", BookSchema);

export default Book;
