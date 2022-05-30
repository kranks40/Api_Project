import express from "express";
import controller from "../controllers/User";
import { Schema, ValidateJoi } from "../middleware/Joi";

const router = express.Router();

router.post("/create", ValidateJoi(Schema.user.create), controller.createUser);

router.get('/get/:userId', controller.getUser)

router.get('/get', controller.getAllUser)

router.patch('/update/:userId', ValidateJoi(Schema.user.update), controller.updateUser)

router.delete('/delete/:userId', controller.deleteUser)


export = router
