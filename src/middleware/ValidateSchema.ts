import { IDoc } from '../models/Document';
import { IUser } from '../models/Users';
import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
// import { IBook } from '../models/Book';
import Logging from '../library/Logging';

export const ValidateJoi = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logging.error(error);

            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    users: {
        create: Joi.object<IUser>({
            name: Joi.string().required()
        }),
        update: Joi.object<IUser>({
            name: Joi.string().required()
        })
    },
    document: {
        create: Joi.object<IDoc>({
            author: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            title: Joi.string().required()
        }),
        update: Joi.object<IDoc>({
            author: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            title: Joi.string().required()
        })
    }
};