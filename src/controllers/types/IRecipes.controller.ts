import { IRecipe } from '@/models';

export interface IRecipesController {
  getRecipes(user?: boolean): Promise<IRecipe[]>;
  getRecipeById(id: string, user?: boolean): Promise<IRecipe>;
  createRecipe(recipe: any): Promise<any>;
}
