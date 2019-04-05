import { ValidationChain, check } from 'express-validator/check';

export function ValidateRequiredUser(req, res, next): ValidationChain[] {
  console.log(req);
  return [
    check('username').exists().isLength({ min: 3 })
  ];
}
