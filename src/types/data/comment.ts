
export interface CommentData {
    userId: string
    restaurantId?: string;
    content: string;
    rating: number;
    isEdit?: boolean;
    parentCommentId: string | null;
    // token: string;
}

export interface EditCommentData {
    userId: string;
    commentId: string;
    content: string;
    rating: number;
    isEdit?: boolean;
    token: string;
}

export interface DeleteCommentData {
    userId: string;
    commentId: string;
    token: string;
}