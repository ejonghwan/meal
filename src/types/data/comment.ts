
export interface CommentData {
    userId: string
    title: string;
    content: string;
    rating: number;
    category: string;
    isEdit?: boolean;
    restaurantId?: string;
    token: string;
}