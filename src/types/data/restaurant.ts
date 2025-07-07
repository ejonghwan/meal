

export interface MapInfo {
    name: string;
    adress: string;
    category: string;
    categoryName: string;
    url: string;
    phone: string;
    y: string;
    x: string;
}

export interface RestaurantLikeData {
    userId: string;
    restaurantId: string;
}

export interface RestaurantData {
    userId: string
    title: string;
    content: string;
    rating: number;
    category: string;
    isEdit?: boolean;
    restaurantId?: string;
    token: string;
    mapInfo: MapInfo;
}