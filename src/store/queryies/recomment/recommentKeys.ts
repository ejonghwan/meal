export const recommentKeys = {
   all: ['comment'] as const,

   listAll: (id, page) => [...recommentKeys.all, 'listAll', id, page] as const,
   // edit: (commentId) => [...recommentKeys.all, 'edit', commentId] as const,
   detail: (restauranId: string) => [...recommentKeys.all, 'detail', restauranId] as const
}