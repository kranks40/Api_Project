import { Document } from 'mongoose';

import express from "express";
import controller from "../controllers/doc";
import { Schemas, ValidateJoi } from "../middleware/ValidateSchema";

const router = express.Router();

router.post('/create', ValidateJoi(Schemas.users.create), controller.createDocument);

router.get('/get/:userId', controller.getDocument)

router.get('/get', controller.getAllDocument)

router.patch('/update/:userId', controller.updateDocument)

router.delete('/delete/:userId', controller.deleteDocument)


export = router
