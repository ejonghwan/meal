export const restaurantKeys = {
   all: ['restaurant'] as const,

   listAll: (categoryName) => [...restaurantKeys.all, 'listAll', categoryName] as const,
   detail: (restauranId: string) => [...restaurantKeys.all, 'detail', restauranId] as const
}