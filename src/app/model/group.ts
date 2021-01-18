import {Image} from './image';

export interface Group {
    id: number;
    userId: number;
    groupName: string;
    description: string;
    profiles: any[];
    image: Image;
}
