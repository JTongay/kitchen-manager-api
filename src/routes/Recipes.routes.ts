import { BaseRoute } from '@/routes/route';
import { logger } from '@/services';
import { NextFunction, Request, Response, Router } from 'express';
import { IRecipe } from '@/models';
import { IRecipesController } from '@/controllers/types';
import { container } from '@/inversify.config';
import { TYPES } from '@/inversify.types';


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
    // Insert Route methods here
  }

  private async getRecipes(req: Request, res: Response, next: NextFunction): Promise<void> {
    const recipes: IRecipe[] = await this._recipesController.getRecipes();
    res.status(200).json(recipes);
  }

  private async getRecipeById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { user_id, recipe_id } = req.params;
    const recipe: IRecipe = await this._recipesController.getRecipeById(recipe_id);
    res.status(200).json(recipe);
  }
}
