export const restaurantKeys = {
   all: ['restaurant'] as const,

   listAll: (page) => [...restaurantKeys.all, 'listAll', page] as const,
   detail: (restauranId: string) => [...restaurantKeys.all, 'detail', restauranId] as const
}