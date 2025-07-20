
export interface RecommentData {
    userId: string
    restaurantId: string;
    parentCommentId: string;
    content: string;
    parentReommentId?: string;
    targetDisplayName?: string;
}

export interface EditRecommentData {
    userId: string
    restaurantId: string;
    parentCommentId: string;
    recommentId: string;
    content: string;
}

export interface DeleteRecommentData {
    userId: string;
    restaurantId: string;
    parentCommentId: string;
    recommentId: string
}

export interface LikeRecommentData {
    userId: string;
    restaurantId: string;
    parentCommentId: string;
    recommentId: string;
}

export interface LoadRecommentData {
    parentCommentId: string;
    limet: number;
    userId: string;
}
