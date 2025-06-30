export const commentKeys = {
   all: ['comment'] as const,

   listAll: (page) => [...commentKeys.all, 'listAll', page] as const,
   detail: (restauranId: string) => [...commentKeys.all, 'detail', restauranId] as const
}