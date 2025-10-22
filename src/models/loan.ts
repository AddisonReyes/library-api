import mongoose, { Schema, Document } from "mongoose";

export interface ILoan extends Document {
  bookId: mongoose.Types.ObjectId;
  username: string;
  loanDate: Date;
  returnDate: Date | null;
  returned: boolean;
}

const LoanSchema: Schema = new Schema({
  bookId: { type: mongoose.Types.ObjectId, required: true },
  username: { type: String, required: true },
  loanDate: { type: Date, required: true },
  returnDate: { type: Date },
  returned: { type: Boolean },
});

const Loan = mongoose.model<ILoan>("Loan", LoanSchema);

export default Loan;
