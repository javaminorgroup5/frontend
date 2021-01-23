import {Profile} from './profile';

export interface User {
    id?: number;
    email: string;
    password: string;
    role: string;
    profile: Profile;
}
