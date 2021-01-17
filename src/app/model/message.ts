import {Image} from './image';
import {Like} from './Like';

export interface Message {
    id: number;
    message: string;
    userId: number;
    groupId: number;
    createdAt: string;
    profileName: string;
    image: Image;
    profileImage: Image;
    recipeId: number;
    likes?: Like[];
}
