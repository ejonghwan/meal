export const restaurantKeys = {
   all: ['users'] as const,
   load: () => [...restaurantKeys.all, 'load'] as const,

   // test
   list: () => [...restaurantKeys.all, 'list'] as const,
   detail: (id: string) => [...restaurantKeys.all, 'detail', id] as const
}