import { Image } from './image';

export enum GroupPrivacy {
    PRIVATE = 'PRIVATE',
    INVITE = 'INVITE',
    OPEN = 'OPEN',
}

export interface GroupCategory {
    id?: number;
    categoryName: string;
    active?: boolean;
}

export interface Group {
    id: number;
    userId: number;
    groupCategory: GroupCategory;
    groupPrivacy: GroupPrivacy;
    groupName: string;
    description: string;
    profiles: any[];
    image: Image;
}
