import { IRecipesController } from '@/controllers/types';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { IRecipe, Recipe } from '@/models';
import { logger } from '@/services';

@injectable()
export class RecipesController implements IRecipesController {
  public async getRecipes(): Promise<IRecipe[]> {
    try {
      return await Recipe.find();
    } catch (e) {
      logger.error(`Error retrieving recipes in RecipesController with ${e}`);
      throw new Error(e);
    }
  }

  public async getRecipeById(id: string): Promise<IRecipe> {
    try {
      return await Recipe.findById(id);
    } catch (e) {
      logger.error(
        `Error retrieving recipe in RecipesController with ${e}`
      );
      throw new Error(e);
    }
  }

  // public async createRecipe(userId)
}
