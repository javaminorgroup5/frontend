import { Image } from './image';

export enum GroupPrivacy {
    PRIVATE = 'PRIVATE',
    INVITE = 'INVITE',
    OPEN = 'OPEN',
}

export interface Group {
    id: number;
    userId: number;
    groupPrivacy: GroupPrivacy;
    groupName: string;
    description: string;
    profiles: any[];
    image: Image;
}
