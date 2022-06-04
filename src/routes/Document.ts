import { Document } from 'mongoose';
import express from "express";
import controller from "../controllers/doc";
import { Schemas, ValidateJoi } from "../middleware/ValidateSchema";

const router = express.Router();

router.post('/create', ValidateJoi(Schemas.document.create), controller.createDocument);

router.get('/get/:documentId', controller.getDocument)

router.get('/get', controller.getAllDocument)

router.patch('/update/:documentId', controller.updateDocument)

router.delete('/delete/:documentId', controller.deleteDocument)


export = router