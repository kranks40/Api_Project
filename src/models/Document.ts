import mongoose, { Document, Schema } from "mongoose";

export interface IDoc {
  title: string;
  author: string;
}

export interface IDocModel extends IDoc, Document {}

const DocSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, required: true, ref: "Author" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IDocModel>("Doc", DocSchema);
