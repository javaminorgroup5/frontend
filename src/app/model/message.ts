import {Image} from './image';

export interface Message {
    id: number;
    message: string;
    userId: number;
    groupId: number;
    createdAt: string;
    profileName: string;
    image: Image;
    profileImage: Image;
}
