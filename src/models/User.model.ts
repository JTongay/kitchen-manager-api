import * as mongoose from 'mongoose';
import { IRecipe } from './recipe.model';

export interface IUser extends mongoose.Document {
  username: string;
  role: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  recipes: IRecipe[];
}

export const UserSchema: mongoose.Schema = new mongoose.Schema({
  role: { type: String, default: 'user' },
  recipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  }],
  password: { type: String, required: true },
  username: { type: String, required: true },
  created_at: { type: Date, default: new Date() },
  updated_at: { type: Date, default: new Date() }
});

export const User: mongoose.Model<IUser> = mongoose.model('User', UserSchema);
