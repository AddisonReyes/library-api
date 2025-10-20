import mongoose, { Schema, Document } from "mongoose";

interface IAuthor extends Document {
  name: string;
  lastName: string;
  nationality: string;
  birthdate: Date;
}

const AuthorSchema: Schema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String },
  nationality: { type: String },
  birthdate: { type: Date },
});

const Author = mongoose.model<IAuthor>("Author", AuthorSchema);

export default Author;
