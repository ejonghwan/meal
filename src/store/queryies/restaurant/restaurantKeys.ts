export const restaurantKeys = {
   all: ['restaurant'] as const,

   list: () => [...restaurantKeys.all, 'list'] as const,
   listAll: () => [...restaurantKeys.all, 'listAll'] as const,
   detail: (id: string) => [...restaurantKeys.all, 'detail', id] as const
}