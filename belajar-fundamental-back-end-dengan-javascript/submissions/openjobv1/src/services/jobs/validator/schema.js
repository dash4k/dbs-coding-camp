/* eslint-disable camelcase */
import Joi from 'joi';

export const postJobPayloadSchema = Joi.object({
  company_id: Joi.string().required(),
  category_id: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  job_type: Joi.string().required(),
  experience_level: Joi.string().required(),
  location_type: Joi.string().optional(),
  location_city: Joi.string().optional(),
  salary_min: Joi.number().optional(),
  salary_max: Joi.number().optional(),
  is_salary_visible: Joi.bool().optional(),
  status: Joi.string().valid('open', 'closed').required(),
});

export const putJobPayloadSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  salary_max: Joi.number().required(),
});

export const jobQuerySchema = Joi.object({
  title: Joi.string().allow('').optional(),
  'company-name': Joi.string().allow('').optional(),
});
