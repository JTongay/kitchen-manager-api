import { BaseRoute } from '@/routes/route';
import { logger } from '@/services';
import { NextFunction, Request, Response, Router } from 'express';
import { IRecipe } from '@/models';
import { IRecipesController } from '@/controllers/types';
import { container } from '@/inversify.config';
import { TYPES } from '@/inversify.types';
import { checkUser } from '@/middleware/checkUser';
import { ValidatedDataRequest } from '@/types';
import { SuccessResponseBuilder, SuccessResponse } from '@/builders/response';


export class RecipesRoutes extends BaseRoute {
  private static instance: RecipesRoutes;
  private _recipesController: IRecipesController;

  constructor(
    private recipesController: IRecipesController
  ) {
    super();
    this._recipesController = recipesController;
    // Initialize the routes
    this.init();
  }

  public static get router(): Router {
    if (!RecipesRoutes.instance) {
      RecipesRoutes.instance = new RecipesRoutes(
        container.get<IRecipesController>(TYPES.IRecipesController)
      );
    }
    return RecipesRoutes.instance.router;
  }

  private init(): void {
    logger.info('Creating RecipesRoutes');

    this.router.get('/', this.getRecipes);
    this.router.get('/:recipe_id', this.getRecipeById);
    this.router.post('/', this.createRecipe);
    this.router.put('/:recipe_id', this.updateRecipe);
    this.router.delete('/:recipe_id', this.deleteRecipe);
    // Insert Route methods here
  }

  private async getRecipes(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { user } = req.params;
    let recipes: IRecipe[];
    try {
      recipes = await this._recipesController.getRecipes(user);
      const successResponse: SuccessResponse = new SuccessResponseBuilder(200).setData(recipes).build();
      res.status(200).json(successResponse);
    } catch (e) {
      logger.error(`Error GET /recipes with ${e}`);
      next(e);
    }
  }

  private async getRecipeById(req: ValidatedDataRequest, res: Response, next: NextFunction): Promise<void> {
    const { user_id, recipe_id } = req.params;
    let recipe: IRecipe;
    try {
      recipe = await this._recipesController.getRecipeById(recipe_id);
      const successResponse: SuccessResponse = new SuccessResponseBuilder(200).setData(recipe).build();
      res.status(200).json(successResponse);
    } catch (e) {
      logger.info(`Error GET /recipe/:id with ${e}`);
      next(e);
    }
  }

  private async createRecipe(req: ValidatedDataRequest, res: Response, next: NextFunction): Promise<void> {
    // const { }
    let createdRecipe: IRecipe;
    try {
      createdRecipe = await this._recipesController.createRecipe(req.body);
    } catch (e) {
      logger.error(`Error creating recipe ${e}`);
      next(e);
    }
  }

  private async updateRecipe(req: ValidatedDataRequest, res: Response, next: NextFunction): Promise<void> {

  }

  private async deleteRecipe(req: ValidatedDataRequest, res: Response, next: NextFunction): Promise<void> {

  }
}
