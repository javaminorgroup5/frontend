import { RecipeImage } from './recipeImage';

export interface User {
    id?: number;
    username: string;
    password: string;
    role: string;
    profile: {
        profileName: string
    };
}
