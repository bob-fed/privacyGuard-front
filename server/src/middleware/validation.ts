import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.details.map(detail => detail.message)
      });
    }
    next();
  };
};

export const schemas = {
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    company_name: Joi.string().required()
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  dataRequest: Joi.object({
    requester_name: Joi.string().required(),
    requester_email: Joi.string().email().required(),
    request_type: Joi.string().valid('access', 'deletion', 'correction', 'portability').required(),
    priority: Joi.string().valid('low', 'medium', 'high').default('medium'),
    description: Joi.string().optional()
  }),

  updateDataRequest: Joi.object({
    status: Joi.string().valid('pending', 'in-progress', 'completed', 'rejected').optional(),
    priority: Joi.string().valid('low', 'medium', 'high').optional(),
    description: Joi.string().optional()
  }),

  privacyAudit: Joi.object({
    audit_data: Joi.object().required(),
    status: Joi.string().valid('draft', 'completed').default('draft')
  }),

  generatePolicy: Joi.object({
    policy_type: Joi.string().valid('privacy', 'cookie', 'terms').required(),
    config: Joi.object().required()
  }),

  userSettings: Joi.object({
    notifications_enabled: Joi.boolean().optional(),
    email_alerts: Joi.boolean().optional(),
    jurisdictions: Joi.array().items(Joi.string()).optional(),
    business_type: Joi.string().optional(),
    website_url: Joi.string().uri().optional(),
    contact_email: Joi.string().email().optional()
  })
};