import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Users from "../models/Users";

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {name} = req.body;

  const user = new Users({
    _id: new mongoose.Types.ObjectId(),
    name,
  });
  return user
    .save()
    .then((user) => res.status(201).json({ user }))
    .catch((error) => res.status(500).json({ error }));
};

const getUser = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  return Users.findById(userId)
    .then((user) =>
      user
        ? res.status(200).json({ user })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const getAllUser = (req: Request, res: Response, next: NextFunction) => {
  return Users.find()
    .then((users) => res.status(200).json({ users }))
    .catch((error) => res.status(500).json({ error }));
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  return Users.findById(userId)
    .then((user) => {
      if (user) {
        user.set(req.body);
        return user
          .save()
          .then((user) => res.status(201).json({ user }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(400).json({ message: "Not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body;

  return Users.findByIdAndDelete(userId)
    .then((user) =>
      user
        ? res.status(201).json({ user, message: "Deleted" })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createUser,
  getUser,
  getAllUser,
  updateUser,
  deleteUser,
};
