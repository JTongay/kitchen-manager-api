import { IRecipe, Recipe } from '@/models';
import 'jest';

describe('Recipe Model', () => {
  const req = {};
  const cb = jest.fn();
  it('should throw an error when ingredients, name, and instructions are not provided', done => {
    const recipe: IRecipe = new Recipe();

    recipe.validate(err => {
      expect(err.errors).toBeDefined();
      done();
    });
  });
});
