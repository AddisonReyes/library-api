import mongoose, { Schema, Document } from "mongoose";

interface IAuthor extends Document {
  id: number;
  nombre: string;
  apellido: string;
  nacionalidad: string;
  fechaNacimiento: Date;
}

const AuthorSchema: Schema = new Schema({
  id: { type: Number, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String },
  nacionalidad: { type: String },
  fechaNacimiento: { type: Date },
});

const Author = mongoose.model<IAuthor>("Author", AuthorSchema);

export default Author;
