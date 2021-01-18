import { Image } from './image';

export interface Recipe {
    id?: number;
    title: string;
    recipe: string;
    description: string;
    image?: Image;
    userId?: string;
    groupId?: string;
}
