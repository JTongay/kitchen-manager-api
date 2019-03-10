import { IRecipe } from '@/models';

export interface IRecipesController {
  getRecipes(): Promise<IRecipe[]>;
  getRecipeById(id: string): Promise<IRecipe>;
}
