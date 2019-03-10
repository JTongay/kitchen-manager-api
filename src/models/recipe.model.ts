import * as mongoose from 'mongoose';
import { IUser } from './User.model';


// https://rapidapi.com/spoonacular/api/recipe-food-nutrition?endpoint=57d3f037e4b0bf08d74df7f5
export interface Ingredient {
  unit: string;
  amount: string;
  ingredient: string;
}

export interface Equipment {
  equipment: string[];
}

export interface IRecipe extends mongoose.Document {
  created_by: any;
  created_at: Date;
  updated_at: Date;
  equipment: Equipment;
  ingredients: Ingredient[];
  instructions: string;
  name: string;
  time: string;
  tags: string[];
}

export const RecipeSchema: mongoose.Schema = new mongoose.Schema({
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  created_at: { type: Date, default: new Date() },
  updated_at: { type: Date, default: new Date() },
  equipment: { type: Array, default: [''] },
  ingredients: { type: Array, required: true },
  instructions: { type: String, required: true },
  name: { type: String, required: true },
  time: { type: String, default: 'N/A' },
  tags: { type: Array, default: [''] }

});

export const Recipe: mongoose.Model<IRecipe> = mongoose.model('Recipe', RecipeSchema);
