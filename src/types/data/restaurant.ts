

export interface RestaurantData {
    userId: string
    title: string;
    content: string;
    rating: number;
    address: string;
    category: string;
    isEdit?: boolean;
    restaurantId?: string;
    token: string;
}