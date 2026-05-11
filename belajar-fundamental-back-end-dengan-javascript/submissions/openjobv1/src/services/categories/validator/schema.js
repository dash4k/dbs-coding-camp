import Joi from 'joi';

export const postCategoryPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

export const putCategoryPayloadSchema = Joi.object({
  name: Joi.string().required(),
});
