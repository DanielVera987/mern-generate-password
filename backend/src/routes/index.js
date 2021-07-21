import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate';
import generate from '../components/generate';

const router = Router();

router.post('', celebrate({
  [Segments.BODY]: Joi.object().keys({
    character: Joi.number()
      .integer()
      .min(5)
      .required(),
    simbols: Joi.boolean().required(),
    numbers: Joi.boolean().required(),
    uppercase: Joi.boolean().required()
  })
}), generate);

export default router;