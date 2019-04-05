import { UsersRoutes } from '@/routes/Users.routes';
import { logger } from '@/services';
import { NextFunction, Request, Response } from 'express';
import { PingRoute } from './ping';
import { BaseRoute } from './route';
import { AuthRoutes } from './Auth.routes';
import { RecipesRoutes } from './Recipes.routes';
import { RecipesController } from '@/controllers';
import { container } from '@/inversify.config';
import { TYPES } from '@/inversify.types';
import { RecipeRequestBuilder, RecipeRequest } from '@/builders/request/Recipe.request';
import { Ingredient, Equipment, IRecipe } from '@/models';
import { InventoryRoutes } from './Inventory.routes';

/**
 * / route
 *
 * @class User
 */
export class ApiRoutes extends BaseRoute {
  public static path = '/api';
  private static instance: ApiRoutes;
  private _recipesController: RecipesController;

  /**
   * @class ApiRoutes
   * @constructor
   */
  constructor (
    private recipesController: RecipesController
  ) {
    super();
    this._recipesController = recipesController;
    this.get = this.get.bind(this);
    this.init();
  }

  /**
   * @class ApiRoute
   * @method getRouter
   * @returns {Router}
   */
  static get router () {
    if (!ApiRoutes.instance) {
      ApiRoutes.instance = new ApiRoutes(
        container.get<RecipesController>(TYPES.IRecipesController)
      );
    }
    return ApiRoutes.instance.router;
  }

  /**
   * @class ApiRoute
   * @method init
   */
  private init () {
    // log
    logger.info('[ApiRoute] Creating api routes.');

    // add router classes' routers here
    this.router.get('/', this.get);
    this.router.use(PingRoute.path, PingRoute.router);
    this.router.use('/user', UsersRoutes.router);
    this.router.use('/user/:user_id/recipe', RecipesRoutes.router);
    this.router.use('/user/:user_id/inventory', InventoryRoutes.router);
    this.router.use('/auth', AuthRoutes.router);
  }

  /**
   * @class ApiRoute
   * @method index
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @param next {NextFunction} Execute the next method.
   */
  private async get (req: Request, res: Response, next: NextFunction) {
    res.status(200).json({ online: true });
  }

  private async getRecipes(req: Request, res: Response, next: NextFunction): Promise<void> {
    let recipes: any;
    try {
      recipes = await this._recipesController.getRecipes();
      res.status(200).json(recipes);
    } catch (e) {
      logger.error(e);
      next();
    }
  }

  private async postRecipe(req: Request, res: Response, next: NextFunction): Promise<void> {
    // 5c8d54c917cf9221cf709c5b
    const recipeRequest = new RecipeRequestBuilder();
    const mockIngredients: Ingredient[] = [
      {
        unit: 'cup',
        amount: '.5',
        ingredient: 'milk'
      },
      {
        unit: 'tsp',
        amount: '1',
        ingredient: 'salt'
      }
    ];
    const mockEquipment: Equipment = {
      equipment: ['Instant Pot', 'Sauce Pan']
    };
    const testRequest = {
      ingredients: mockIngredients,
      equipment: mockEquipment,
      name: 'Milky Salt',
      created_by: '5c8d54c917cf9221cf709c5b',
      instructions: 'Boil the damn milk and throw some salt in it',
      tags: ['gross']
    };
    // recipeRequest.setCreatedBy()
    let testRecipe;
    try {
      testRecipe = await this._recipesController.createRecipe(testRequest);
      res.status(200).json(testRecipe);
    } catch (e) {
      logger.error(e);
      next();
    }
  }

  private async deleteRecipe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this._recipesController.deleteRecipe('Milky Salt');
      res.status(200).json({ status: 'success' });
    } catch (e) {
      logger.error(e);
      next();
    }
  }
}
