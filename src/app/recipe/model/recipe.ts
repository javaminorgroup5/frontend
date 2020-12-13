import { RecipeImage } from './recipeImage';

export interface Recipe {
    id?: number;
    recipe: string;
    description: string;
    recipeImage?: RecipeImage;
}
