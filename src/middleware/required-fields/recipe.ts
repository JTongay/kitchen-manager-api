import { Request, Response, NextFunction } from 'express';
import { check, ValidationChain } from 'express-validator/check';

export function ValidateRequiredRecipe(req: Request, res: Response, next: NextFunction): ValidationChain[] {
  // check for required properties is req.body and throw error with field values if any are missing
  // https://express-validator.github.io/docs/index.html
  return [
    check('ingredients').exists(),
  ];
}
