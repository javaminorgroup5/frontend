import { RecipeImage } from './recipeImage';

export interface Recipe {
    recipe: string;
    description: string;
    recipeImage?: RecipeImage;
}
