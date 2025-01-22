export const userKeys = {
    all: ['users'] as const,
    load: (token: string) => [...userKeys.all, 'load', token] as const,
    list: () => [...userKeys.all, 'list'] as const,
    detail: (id: string) => [...userKeys.all, 'detail', id] as const
}