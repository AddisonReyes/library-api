import mongoose, { Schema, Document } from "mongoose";

interface ILoan extends Document {
  bookId: mongoose.Types.ObjectId;
  username: string;
  loanDate: Date;
  returnDate: Date | null;
  returned: boolean;
}

const LoanSchema: Schema = new Schema({
  bookId: { type: mongoose.Types.ObjectId, require: true },
  username: { type: String, require: true },
  loanDate: { type: Date, require: true },
  returnDate: { type: Date },
  returned: { type: Boolean },
});

const Loan = mongoose.model<ILoan>("Loan", LoanSchema);

export default Loan;
