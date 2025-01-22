export const userKeys = {
    all: ['users'] as const,
    load: () => [...userKeys.all, 'load'] as const,
    list: () => [...userKeys.all, 'list'] as const,
    detail: (id: string) => [...userKeys.all, 'detail', id] as const
}