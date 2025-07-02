export const commentKeys = {
   all: ['comment'] as const,

   listAll: (id, page) => [...commentKeys.all, 'listAll', id, page] as const,
   detail: (restauranId: string) => [...commentKeys.all, 'detail', restauranId] as const
}