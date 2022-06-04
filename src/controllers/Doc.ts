import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Document from "../models/Document";

const createDocument = (req: Request, res: Response, next: NextFunction) => {
  const { name, title } = req.body;

  const document = new Document({
    _id: new mongoose.Types.ObjectId(),
    name,
    title,
  });
  return document
    .save()
    .then((document) => res.status(201).json({ document }))
    .catch((error) => res.status(500).json({ error }));
};

const getDocument = (req: Request, res: Response, next: NextFunction) => {
  const { documentId } = req.params;

  return Document.findById(documentId)
    .populate("name,title")
    .select("-__v")
    .then((document) =>
      document
        ? res.status(200).json({ document })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const getAllDocument = (req: Request, res: Response, next: NextFunction) => {
  return Document.find()
    .populate("name,title")
    .select("-__v")
    .then((document) => res.status(200).json({ document }))
    .catch((error) => res.status(500).json({ error }));
};

const updateDocument = (req: Request, res: Response, next: NextFunction) => {
  const { documentId } = req.params;

  return Document.findById(documentId)
    .then((document) => {
      if (document) {
        document.set(req.body);
        return document
          .save()
          .then((document) => res.status(201).json({ document }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(400).json({ message: "Not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
const deleteDocument = (req: Request, res: Response, next: NextFunction) => {
  const { documentId } = req.body;

  return Document.findByIdAndDelete(documentId)
    .then((document) =>
      document
        ? res.status(201).json({ document, message: "Deleted" })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createDocument,
  getDocument,
  getAllDocument,
  updateDocument,
  deleteDocument,
};
