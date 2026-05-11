/* eslint-disable camelcase */
import Joi from 'joi';

export const postApplicationPayloadSchema = Joi.object({
  user_id: Joi.string().required(),
  job_id: Joi.string().required(),
  status: Joi.string().required().valid('pending', 'accepted', 'rejected'),
});

export const putApplicationPayloadSchema = Joi.object({
  status: Joi.string().required().valid('pending', 'accepted', 'rejected'),
});
