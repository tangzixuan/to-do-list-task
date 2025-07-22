import { User } from './user.entity';
export declare class Notification {
    id: string;
    userId: string;
    type: string;
    title: string;
    message: string;
    data?: any;
    isRead: boolean;
    createdAt: Date;
    user: User;
}
