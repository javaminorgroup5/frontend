import { RecipeImage } from './recipeImage';

export interface Recipe {
    id?: number;
    title: string;
    recipe: string;
    description: string;
    recipeImage?: RecipeImage;
}
