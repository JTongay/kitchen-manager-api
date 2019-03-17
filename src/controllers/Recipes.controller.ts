import { IRecipesController } from '@/controllers/types';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { IRecipe, Recipe, User } from '@/models';
import { logger } from '@/services';

@injectable()
export class RecipesController implements IRecipesController {
  public async getRecipes(user?: boolean): Promise<IRecipe[]> {
    try {
      if (user) {
        return await Recipe.find().populate('created_by');
      }
      return await Recipe.find();
    } catch (e) {
      logger.error(`Error retrieving recipes in RecipesController with ${e}`);
      throw new Error(e);
    }
  }

  public async getRecipeById(id: string, user?: boolean): Promise<IRecipe> {
    try {
      if (user) {
        return await Recipe.findById({ _id: id }).populate('created_by');
      }
      return await Recipe.findById({ _id: id});
    } catch (e) {
      logger.error(
        `Error retrieving recipe in RecipesController with ${e}`
      );
      throw new Error(e);
    }
  }

  public async createRecipe(recipe: any): Promise<any> {
    const { created_by, equipment, instructions, ingredients, name }: IRecipe = recipe;
    let newRecipe: any;
    let userRecipe: any;
    try {
      newRecipe = await Recipe.create(
        { created_by, equipment, instructions, ingredients, name }
      );
      userRecipe = await User.findByIdAndUpdate(created_by, {$push: { recipes: newRecipe._id }});
      await newRecipe.save();
      // await userRecipe.save();
      return newRecipe;
    } catch (e) {
      logger.error(`Error creating recipe in RecipesController with ${e}`);
      throw new Error(e);
    }
  }

  public async deleteRecipe(name: string): Promise<any> {
    try {
      await Recipe.deleteOne({ name });
    } catch (e) {
      logger.error(
        `Error deleting recipe in RecipesController with ${e}`
      );
      throw new Error(e);
    }
  }
}
