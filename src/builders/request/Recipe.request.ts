import { GenericBuilder } from '@/builders';
import { Ingredient } from '@/models';

/**
 * RecipeRequestBuilder
 * Takes in an object of form values and builds an object properly formatted for the DB
 */
export class RecipeRequestBuilder extends GenericBuilder {
  private _name: string;
  private _time: string;
  private _created_by: any;
  private _tags: string[];
  private _equipment: string[];
  private _instructions: string;
  private _ingredients: Ingredient[];

  constructor() {
    super();
  }

  public get tags(): string[] {
    return this._tags;
  }
  public setTags(value: string[]): RecipeRequestBuilder {
    this._tags = value;
    return this;
  }

  public get equipment(): string[] {
    return this._equipment;
  }
  public setEquipment(value: string[]): RecipeRequestBuilder {
    this._equipment = value;
    return this;
  }

  public get instructions(): string {
    return this._instructions;
  }
  public setInstructions(value: string): RecipeRequestBuilder {
    this._instructions = value;
    return this;
  }

  public get ingredients(): Ingredient[] {
    return this._ingredients;
  }
  public setIngredients(value: Ingredient[]): RecipeRequestBuilder {
    this._ingredients = value;
    return this;
  }

  public get created_by(): any {
    return this._created_by;
  }
  public setCreatedBy(value: any): RecipeRequestBuilder {
    this._created_by = value;
    return this;
  }

  public get name(): string {
    return this._name;
  }
  public setName(value: string) {
    this._name = value;
  }

  public get time(): string {
    return this._time;
  }
  public setTime(value: string): RecipeRequestBuilder {
    this._time = value;
    return this;
  }

  public build(): RecipeRequest {
    return new RecipeRequest(this);
  }
}

export class RecipeRequest {
  private _name: string;
  private _time: string;
  private _created_by: any;
  private _tags: string[];
  private _equipment: string[];
  private _instructions: string;
  private _ingredients: Ingredient[];
  constructor(builder: RecipeRequestBuilder) {

  }
}
